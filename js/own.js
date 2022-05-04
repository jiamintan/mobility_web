const indLevelSelect = document.querySelector('#ind-level-select');
let ind = indLevelSelect.value;
ind = 'Education';

info.update = function (props) {
  this._div.innerHTML = `<h4>Visit Count to Recreation Places</h4>${props
    ? '<b id=\"tract_id\">' + `tract_id: ${props.tract_id}</b><br />` + '<b>' + ` visit count: ${props[String(indLevelSelect.value)]}<br /></b>`
    : 'Hover over a place'}`;
};

function style(features) {
  const ind = String(indLevelSelect.value);
  return {
    fillColor: getColor(features.properties[ind]),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  }
};

const sum = () => {
  const ind = String(indLevelSelect.value);
  let s = 0;
  for (let i = 0; i < trans.features.length; i++) {
    s += trans.features[i].properties[ind];
  }
  return s;
};

const mostPopular = () => {
  const ind = String(indLevelSelect.value);
  let max = -Infinity;
  let index = 0;
  for (let i = 0; i < trans.features.length; i++) {
    if (trans.features[i].properties[ind] > max) {
      max = trans.features[i].properties[ind];
      index = i;
    }
  }
  return trans.features[index].properties.tract_id;
};
