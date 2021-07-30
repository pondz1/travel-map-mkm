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
        console.log(markers)

    }

    render() {
        // const {lng, lat, zoom} = this.state;
        return (
            <div style={{backgroundColor: 'whitesmoke'}}>
                {/*<div className="sidebar">*/}
                {/*    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}*/}
                {/*</div>*/}
                <div ref={this.mapContainer} className="map-container"/>
                <div className="p-pb-4 p-pt-4 p-text-center">
                    <a rel="noreferrer" target="_blank" href="https://www.google.com/maps/d/edit?mid=1d2xngPxXMZ_uR_YarVgA-mHQa5gyEVi1&usp=sharing"
                    >Google
                        Map</a>
                </div>
                <div style={{marginTop: 8, paddingBottom: 80}}>
                    <div className="p-pl-md-6 p-pr-md-6 p-pl-3 p-pr-3" style={{width: '100%'}}>
                        {locations.map((item, index) => {
                            return (
                                <div style={{marginBottom: 16}} key={index}>
                                    <Card >
                                        <div className="p-grid p-jc-start">
                                            <div className="p-col-fixed" style={{
                                                // height: 80,
                                                // width: 80,
                                                // backgroundColor: item.color,
                                                borderColor: item.color,
                                                borderWidth: 6,
                                                borderStyle: 'solid',
                                                marginLeft: 16,
                                                marginRight: 16,
                                            }}>
                                                <img width={220} height={220} src={item.img}  alt={item.name} style={{objectFit: 'contain'}} />
                                            </div>
                                            <div className="p-col" >
                                                <div className="p-justify-start">
                                                    <p><b>{item.name}</b></p>
                                                    <p>{item.detail}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
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