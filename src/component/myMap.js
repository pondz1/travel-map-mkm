import React from 'react';
import location from "../data/location";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoicG9uZGpzIiwiYSI6ImNrcm9rcWpxdzJyN2ozMHA2ZnJnZDZ4YjEifQ.d2QtBRizaShlq089-1VLaQ';

class MyMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lng: 103.250214,
            lat: 16.245471,
            zoom: 15
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const {lng, lat, zoom} = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        map.on('move', () => {
            console.log(map.getCenter())
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        map.on('load', () => {
            map.addSource('my-data', {
                "type": "geojson",
                "data": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [location[0].lng, location[0].lat]
                    },
                    "properties": {
                        "title": location[0].name,
                        "marker-symbol": "monument"
                    }
                }
            });
        })

    }

    render() {
        const {lng, lat, zoom} = this.state;
        return (
            <div>
                <div className="sidebar">
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                </div>
                <div ref={this.mapContainer} className="map-container"/>
                <div style={{marginTop: 100}}>
                    <div>
                        { location.map((item,index) => {
                            return(
                                <div style={{height: 70}}>
                                    <p>{item.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MyMap