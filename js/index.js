/* global trans */
var center = [40.730610, -73.935242];
var zoom = 11;

var map = L.map('mobilityMap', {
  attributionControl: false,
  inertia: false,
  minZoom: 12
}).setView(center, zoom)

var equityMap = L.map('equityMap', {
  inertia: false,
  minZoom: 12
}).setView(center, zoom)

const mapboxAccessToken = 'pk.eyJ1IjoibmVidWxhYml1IiwiYSI6ImNsMHIycWhucTJnbXozaW41YzJheTIzNXYifQ.HZkgl4qBDFO6MHqLxF5q6A';

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`, {
  id: 'mapbox/light-v9',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(equityMap);

var circle = L.circle([40.730610, -73.935242], 2000, {
  color: 'red',
  fillColor: 'red',
  fillOpacity: 0.5
}).addTo(map);

var circle = L.circle([40.730610, -73.935242], 2000, {
  color: 'blue',
  fillColor: 'blue',
  fillOpacity: 0.5
}).addTo(equityMap);

$('#map-container').beforeAfter(map, equityMap);

const yearLevelSelect = document.querySelector('#year-level-select');
const indLevelSelect = document.querySelector('#ind-level-select');
let year = yearLevelSelect.value;
let ind = indLevelSelect.value;
year = '2019';
ind = 'Education'

// pop out infomation
const info = L.control();

// legend control
const legend = L.control({ position: 'bottomright' });

info.onAdd = function () {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML = `<h4>Visit Count to Recreation Places</h4>${props
    ? '<b id=\"tract_id\">' + `tract_id: ${props.tract_id}</b><br />` + '<b>' + ` visit count: ${props[String(yearLevelSelect.value)]}<br /></b>`
    : 'Hover over a place'}`;
};

info.addTo(map);

// get color depends on the visit count
function getColor(d) {
  return d > 5000 ? '#800026'
    : d > 1000 ? '#BD0026'
    : d > 500 ? '#E31A1C'
    : d > 100 ? '#FC4E2A'
    : d > 50 ? '#FD8D3C'
    : d > 20 ? '#FEB24C'
    : d > 10 ? '#FED976'
    : '#FFEDA0';
}

function style(features) {
  const year = String(yearLevelSelect.value);
  return {
    fillColor: getColor(features.properties[year]),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  }
};

function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.5,
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

let geojson = L.geoJson(trans, { style, onEachFeature }).addTo(layers);

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'info legend');
  const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
  // loop through our density intervals and generate a label with a colored square for each interval
  for (let i = 0; i < grades.length; i++) {
    div.innerHTML
      += `<i style="background:${getColor(grades[i] + 1)}"></i> ${grades[i]}${grades[i + 1] ? `&ndash;${grades[i + 1]}<br>` : '+'}`;
  }
  return div;
};

legend.addTo(map);

// update content
const sum = () => {
  const year = String(yearLevelSelect.value);
  let s = 0;
  for (let i = 0; i < trans.features.length; i++) {
    s += trans.features[i].properties[year];
  }
  return s;
};

const mostPopular = () => {
  const year = String(yearLevelSelect.value);
  let max = -Infinity;
  let index = 0;
  for (let i = 0; i < trans.features.length; i++) {
    if (trans.features[i].properties[year] > max) {
      max = trans.features[i].properties[year];
      index = i;
    }
  }
  return trans.features[index].properties.tract_id;
};

function contentUpdate() {
  document.getElementsByClassName('visit')[0].innerHTML = sum().toLocaleString();
  document.getElementsByClassName('dwell')[0].innerHTML = `tract id: ${mostPopular()}`;
};

// char initialization
Chart.defaults.color = 'white';
const variable = document.getElementById('myChartBar');
const myChartBar = new Chart(variable, {
  type: 'bar',
  data: {
    labels: ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Dislands'],
    datasets: [{
      color: 'white',
      data: [111111, 222222, 333333, 444444, 555555],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: false,
      title: {
        display: true,
        text: 'Total visit counts to different boroughs'
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  }
});

// selector
const handleSelectChange = () => {
  layers.clearLayers();
  geojson = L.geoJson(trans, { style, onEachFeature }).addTo(layers);
  info.update();
  contentUpdate();
  plotUpdate();
};

yearLevelSelect.addEventListener('change', handleSelectChange);
indLevelSelect.addEventListener('change', handleSelectChange);

function plotUpdate() {
  const year = String(yearLevelSelect.value);
  const ind = String(indLevelSelect.value);
  myChartBar.data.labels = ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Dislands'];

  if (year === '2019' && ind === 'Education') {
    myChartBar.data.datasets[0].data = [111111, 222222, 333333, 444444, 555555];
  }
  else if (year === '2019' && ind === 'Transportation') {
    myChartBar.data.datasets[0].data = [999999, 888888, 777777, 666666, 555555];
  }
  else if (year === '2020') {
    myChartBar.data.datasets[0].data = [453864, 463319, 2787947, 257180, 147434];
  }
  else if (year === '2021') {
    myChartBar.data.datasets[0].data = [333818, 401740, 4174982, 560424, 147521];
  }
  else if (year === 'All') {
    myChartBar.data.labels = ['Education', 'Transportation', 'Food', 'Wholesale & Retail', 'Health Care'];
    myChartBar.data.datasets[0].data = [333333, 444444, 555555, 666666, 777777];
  }
  else if (ind === 'All') {
    myChartBar.data.labels = ['2019', '2020', '2021'];
    myChartBar.data.datasets[0].data = [666, 999, 333];
  }


  myChartBar.update();

}
