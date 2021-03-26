mapboxgl.accessToken = 'pk.eyJ1Ijoic3RyaW1lcjIyIiwiYSI6ImNrbXFhcmdoZDB5NTEyd254NjUxMjBwMTQifQ.2XSo8VzZJUXtbgb3_odTQQ';

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [24.036876, 49.839951]
            },
            'properties': {
                'title': 'Sport-Shop',
                'description': 'Lychakivska St, 1, Lviv'
            }
        }
    ]
};

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [24.036876, 49.839951],
    zoom: 12
});


geojson.features.forEach(function (marker) {

    const el = document.createElement('div');
    el.className = 'marker';


    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({offset: 25})
                .setHTML(
                    '<h3>' +
                    marker.properties.title +
                    '</h3><p>' +
                    marker.properties.description +
                    '</p>'
                )
        )
        .addTo(map);
});