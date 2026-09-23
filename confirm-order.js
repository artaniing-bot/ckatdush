// Vercel Serverless Function
// Verifikon te Stripe që pagesa është kryer VËRTET (mos u beso vetëm parametrave të URL-së,
// dikush mund t'i shkruajë vetë), pastaj e shënon porosinë si "Paguar" në Firestore.

const Stripe = require('stripe');
const admin = require('firebase-admin');

function getAdmin() {
  if (!admin.apps.length) {
    if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT mungon në Environment Variables të Vercel.');
    }
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  }
  return admin;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ error: 'STRIPE_SECRET_KEY mungon në Environment Variables të Vercel.' });
    return;
  }

  try {
    const { orderId, sessionId } = req.body;
    if (!orderId || !sessionId) {
      res.status(400).json({ error: 'Mungon orderId ose sessionId.' });
      return;
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid = session.payment_status === 'paid';
    const matches = session.client_reference_id === orderId;

    if (!paid || !matches) {
      res.status(200).json({ confirmed: false });
      return;
    }

    const fbAdmin = getAdmin();
    const db = fbAdmin.firestore();
    await db.collection('orders').doc(orderId).update({
      status: 'Paguar',
      stripeSessionId: sessionId,
      paidAt: fbAdmin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ confirmed: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Gabim gjatë verifikimit të pagesës.' });
  }
};
