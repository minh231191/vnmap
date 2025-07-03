const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([105.854444, 21.028511]), // Hanoi
      zoom: 10
    })
  });

const esriLayer = new ol.layer.Tile({
source: new ol.source.XYZ({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
})
});
map.addLayer(esriLayer);