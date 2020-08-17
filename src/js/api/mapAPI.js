import mapboxgl from '../../../node_modules/mapbox-gl';

const API_KEY = 'pk.eyJ1IjoiYW5uYTI3NCIsImEiOiJja2FsNG84dnowcXdiMnNqdW9vOG5ubW1jIn0.IG5bosGNfnOCKu7njroEQw';

mapboxgl.accessToken = API_KEY;

const map = new mapboxgl.Map({
  container: 'map',
  center: [12.550343, 55.665957],
  style: 'mapbox://styles/mapbox/streets-v9',
  zoom: 8,
});

const marker = new mapboxgl.Marker()
  .setLngLat([12.550343, 55.665957])
  .addTo(map);

function updateMapArea(lat, long) {
  map.flyTo({ center: [long, lat] });
  marker.setLngLat([long, lat]);
}

export { updateMapArea };
