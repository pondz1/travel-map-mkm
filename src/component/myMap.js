import React from 'react';
import locations from "../data/location";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {Card} from "primereact/card";

mapboxgl.accessToken = 'pk.eyJ1IjoicG9uZGpzIiwiYSI6ImNrcm9rcWpxdzJyN2ozMHA2ZnJnZDZ4YjEifQ.d2QtBRizaShlq089-1VLaQ';


class MyMap extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lng: 103.1469,
            lat: 16.0185,
            zoom: 8.70
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
        // var marker1 = new mapboxgl.Marker()
        //     .setLngLat([locations[0].lng, locations[0].lat])
        //     .addTo(map);

        let markers = locations.map(value => {
            return new mapboxgl.Marker({color: value.color})
                .setLngLat([value.lng, value.lat])
                .addTo(map);
        })

    }

    render() {
        // const {lng, lat, zoom} = this.state;
        return (
            <div style={{backgroundColor: 'whitesmoke'}}>
                {/*<div className="sidebar">*/}
                {/*    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}*/}
                {/*</div>*/}
                <div ref={this.mapContainer} className="map-container"/>
                <div style={{marginTop: 80, paddingBottom: 80}}>
                    <div className="p-pl-6 p-pr-6" style={{width: '100%'}}>
                        {locations.map((item, index) => {
                            return (
                                <div style={{marginBottom: 32}}>
                                    <Card>
                                        <div className="p-grid p-jc-center p-ai-center">
                                            <div className="p-col-6" style={{
                                                height: 80,
                                                width: 80,
                                                backgroundColor: item.color,
                                            }}/>
                                            <div className="p-col-6">
                                                <label>{item.name}</label>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <a href="https://www.google.com/maps/d/edit?mid=1d2xngPxXMZ_uR_YarVgA-mHQa5gyEVi1&usp=sharing"
                        >Google
                            Map</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyMap