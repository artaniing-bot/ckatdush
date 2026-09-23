// Vercel Serverless Function
// Krijon një sesion pagese te Stripe (Stripe Checkout) për shportën e blerësit.
// Çelësi sekret (STRIPE_SECRET_KEY) lexohet nga variablat e mjedisit të Vercel — NUK shkruhet këtu.

const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    res.status(500).json({ error: 'STRIPE_SECRET_KEY mungon në Environment Variables të Vercel.' });
    return;
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { orderId, items, customer } = req.body;

    if (!orderId || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: 'Të dhëna të pamjaftueshme për porosinë.' });
      return;
    }

    const line_items = items.map(it => ({
      price_data: {
        currency: 'eur',
        product_data: { name: String(it.name).slice(0, 250) },
        unit_amount: Math.round(Number(it.price) * 100), // Stripe pret çentë
      },
      quantity: Math.max(1, parseInt(it.qty) || 1),
    }));

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      client_reference_id: orderId,
      customer_email: customer?.email || undefined,
      metadata: { orderId, customerName: customer?.name || '', customerPhone: customer?.phone || '' },
      success_url: `${origin}/?paid=1&order=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=1`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Gabim gjatë krijimit të sesionit të pagesës.' });
  }
};
