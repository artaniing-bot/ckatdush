// Fushat e detajeve sipas kategorisë (si te Kleinanzeigen).
// type: 'text' | 'number' | 'select'. Vlerat e 'select' ruhen në shqip; en = përkthimi për shfaqje.
const CAT_ATTRS = {
  'Automjete': [
    {k:'brand', sq:'Marka', en:'Brand', type:'text', ph:'p.sh. Volkswagen'},
    {k:'model', sq:'Modeli', en:'Model', type:'text', ph:'p.sh. Golf 7'},
    {k:'year', sq:'Viti i prodhimit', en:'Year', type:'number', ph:'2016'},
    {k:'km', sq:'Kilometrazhi (km)', en:'Mileage (km)', type:'number', ph:'150000'},
    {k:'fuel', sq:'Karburanti', en:'Fuel', type:'select', opts:[['Benzinë','Petrol'],['Naftë','Diesel'],['Benzinë + Gaz','Petrol + LPG'],['Hibrid','Hybrid'],['Elektrik','Electric']]},
    {k:'gearbox', sq:'Transmisioni', en:'Gearbox', type:'select', opts:[['Manual','Manual'],['Automatik','Automatic']]},
    {k:'power', sq:'Fuqia (kW)', en:'Power (kW)', type:'number', ph:'85'},
    {k:'color', sq:'Ngjyra', en:'Color', type:'text'},
    {k:'doors', sq:'Dyer', en:'Doors', type:'select', opts:[['2/3','2/3'],['4/5','4/5']]},
    {k:'tuv', sq:'Regjistrimi i vlefshëm deri', en:'Registered until', type:'text', ph:'p.sh. 03/2027'},
    {k:'accident', sq:'Pa aksident', en:'Accident-free', type:'select', opts:[['Po','Yes'],['Jo','No']]}
  ],
  'Teknologji': [
    {k:'brand', sq:'Marka', en:'Brand', type:'text'},
    {k:'model', sq:'Modeli', en:'Model', type:'text'},
    {k:'storage', sq:'Memoria / Ruajtja', en:'Storage', type:'text', ph:'p.sh. 128 GB'},
    {k:'warranty', sq:'Garancia', en:'Warranty', type:'select', opts:[['Po','Yes'],['Jo','No']]},
    {k:'box', sq:'Me kuti origjinale', en:'Original box', type:'select', opts:[['Po','Yes'],['Jo','No']]}
  ],
  'Moda': [
    {k:'type', sq:'Lloji', en:'Type', type:'text', ph:'p.sh. Xhaketë'},
    {k:'brand', sq:'Marka', en:'Brand', type:'text'},
    {k:'size', sq:'Madhësia', en:'Size', type:'text', ph:'p.sh. M / 42'},
    {k:'color', sq:'Ngjyra', en:'Color', type:'text'},
    {k:'for', sq:'Për', en:'For', type:'select', opts:[['Femra','Women'],['Meshkuj','Men'],['Unisex','Unisex']]}
  ],
  'Shtëpi': [
    {k:'type', sq:'Lloji', en:'Type', type:'text', ph:'p.sh. Divan'},
    {k:'brand', sq:'Marka', en:'Brand', type:'text'},
    {k:'material', sq:'Materiali', en:'Material', type:'text'},
    {k:'dims', sq:'Dimensionet', en:'Dimensions', type:'text', ph:'p.sh. 200x90x80 cm'},
    {k:'color', sq:'Ngjyra', en:'Color', type:'text'}
  ],
  'Bukuri': [
    {k:'type', sq:'Lloji', en:'Type', type:'text'},
    {k:'brand', sq:'Marka', en:'Brand', type:'text'},
    {k:'sealed', sq:'I pahapur', en:'Unopened', type:'select', opts:[['Po','Yes'],['Jo','No']]}
  ],
  'Fëmijë': [
    {k:'type', sq:'Lloji', en:'Type', type:'text', ph:'p.sh. Karrocë'},
    {k:'brand', sq:'Marka', en:'Brand', type:'text'},
    {k:'age', sq:'Mosha', en:'Age', type:'text', ph:'p.sh. 3-5 vjeç'},
    {k:'size', sq:'Madhësia', en:'Size', type:'text'}
  ],
  'Sport': [
    {k:'type', sq:'Lloji', en:'Type', type:'text', ph:'p.sh. Biçikletë'},
    {k:'brand', sq:'Marka', en:'Brand', type:'text'},
    {k:'size', sq:'Madhësia', en:'Size', type:'text'}
  ],
  'Aksesorë': [
    {k:'type', sq:'Lloji', en:'Type', type:'text', ph:'p.sh. Çantë dore'},
    {k:'brand', sq:'Marka', en:'Brand', type:'text'},
    {k:'material', sq:'Materiali', en:'Material', type:'text'},
    {k:'color', sq:'Ngjyra', en:'Color', type:'text'}
  ]
};
const MAX_PHOTOS = 20;
