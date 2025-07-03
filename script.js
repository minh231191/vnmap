const osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: true,
  title: 'osm'
});

const satelliteLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  }),
  visible: false,
  title: 'satellite'
});

const geojsonSource = new ol.source.Vector({
  url: 'boundary-simplify.geojson', // relative path to your file
  format: new ol.format.GeoJSON({
    dataProjection: 'EPSG:4326',       // GeoJSON is in lon/lat
    featureProjection: 'EPSG:3857'     // Map uses Web Mercator
  })
});

const geojsonLayer = new ol.layer.Vector({
  source: geojsonSource,
  title: 'geojson-layer',
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })
});

const map = new ol.Map({
  target: 'map',
  layers: [osmLayer, satelliteLayer, geojsonLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([105.854444, 21.028511]), // Hanoi
    zoom: 10
  })
});

$(document).ready(function () {
  $('#layer-select').on('change', function () {
    const selected = $(this).val();
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Tile) {
        layer.setVisible(layer.get('title') === selected);
      }
    });
  });
});

