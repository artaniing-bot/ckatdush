// Të përbashkëta për services.html dhe shto-biznes.html
const PLACE_TYPES = {
  hotel:    {label:'Hotele',     icon:'🛏️', one:'Hotel',      radii:[10,25,50]},
  mechanic: {label:'Mekanik',    icon:'🔧', one:'Mekanik',    radii:[10,25,50]},
  vulc:     {label:'Vulkanizer', icon:'🛞', one:'Vulkanizer', radii:[10,25,50]},
  taxi:     {label:'Taksi',      icon:'🚕', one:'Taksi',      radii:[10,25,50]},
  bus:      {label:'Autobus',    icon:'🚌', one:'Stacion autobusi', radii:[40,100]},
  train:    {label:'Tren',       icon:'🚆', one:'Stacion treni',    radii:[40,100,200]}
};

// [emri, lat, lon]
const GEO = {
  'Kosovë': {center:[42.60,20.90], cities:[['Prishtinë',42.6629,21.1655],['Prizren',42.2139,20.7397],['Pejë',42.6593,20.2887],['Gjakovë',42.3803,20.4308],['Ferizaj',42.3702,21.1553],['Gjilan',42.4635,21.4694],['Mitrovicë',42.8914,20.8660],['Vushtrri',42.8231,20.9675],['Podujevë',42.9111,21.1931]]},
  'Shqipëri': {center:[41.15,20.17], cities:[['Tiranë',41.3275,19.8187],['Durrës',41.3246,19.4565],['Shkodër',42.0693,19.5126],['Vlorë',40.4661,19.4914],['Elbasan',41.1125,20.0822],['Korçë',40.6186,20.7808],['Sarandë',39.8756,20.0053],['Fier',40.7239,19.5561]]},
  'Maqedoni e Veriut': {center:[41.61,21.75], cities:[['Shkup',41.9981,21.4254],['Tetovë',42.0097,20.9715],['Gostivar',41.7958,20.9082],['Ohër',41.1231,20.8016],['Manastir',41.0297,21.3292],['Kumanovë',42.1322,21.7144],['Strugë',41.1778,20.6783]]},
  'Mali i Zi': {center:[42.71,19.37], cities:[['Podgoricë',42.4304,19.2594],['Ulqin',41.9294,19.2056],['Tivar',42.0931,19.1003],['Budva',42.2864,18.8400],['Kotor',42.4247,18.7712],['Nikshiq',42.7731,18.9445],['Herceg Novi',42.4531,18.5375]]}
};

function esc(v){ return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function haversineKm(lat1, lon1, lat2, lon2){
  const R = 6371, rad = x=>x*Math.PI/180;
  const dLat = rad(lat2-lat1), dLon = rad(lon2-lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(rad(lat1))*Math.cos(rad(lat2))*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}
function fmtDist(km){ return km < 1 ? Math.round(km*100)*10 + ' m' : (km < 10 ? km.toFixed(1) : Math.round(km)) + ' km'; }

function emojiIcon(emoji, extra){
  return L.divIcon({html:'<div class="mk '+(extra||'')+'">'+emoji+'</div>', className:'', iconSize:[34,34], iconAnchor:[17,17], popupAnchor:[0,-16]});
}
