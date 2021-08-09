export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY2hpcmFnMDAwIiwiYSI6ImNrcmkyeGc2OTBjNDYydnJ2YWh3c3p4cWoifQ.jTk1YwYVgB9svnAYbKw0Kw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chirag000/ckri3opef6ytn17ny7ilups95',
    scrollZoom: false
    // center: [-118.121321, 34.122541],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend the map bound to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
