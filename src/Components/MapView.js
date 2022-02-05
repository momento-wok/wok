import React, { createRef } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapView.css';

import marker from '../marker.png';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class MapView extends React.Component {

  constructor(props) {
    super(props);
    this.mapRef = createRef();
  }

  showPanorama = (index) => {
    this.props.setSelectedLocation(index);
    this.props.setView("panorama");
  }

  componentDidMount() {
    if (this.mapRef.current) {
      // this.mapRef.current.setCenter([8, 30]);
      // this.mapRef.current.setZoom([1.8]);
      this.mapRef.current.on('move', () => {
        // setLng(this.mapRef.current.getCenter().lng.toFixed(4));
        // setLat(this.mapRef.current.getCenter().lat.toFixed(4));
        // setZoom(this.mapRef.current.getZoom().toFixed(2));
      });
    }
  }

  render() {
    return (
      <div className="mapview-wrapper">
        <Map
          ref={this.mapRef}
          style="mapbox://styles/derpcheese69/ckz9ixt5v000016o0azpswslq"
          // zoom={[1.8]}
          // center={[8, 30]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
          {
            this.props.data.map((point, i) => {
              return (
                <Marker
                  key={i}
                  coordinates={[point.location.latitude, point.location.longitude]}
                  onClick={() => this.showPanorama(i)}
                  anchor="bottom"
                >
                  <img className="location-marker" src={marker} alt="marker" />
                </Marker>
              )
            })
          }
        </Map>
      </div>
    )
  }
}

export default MapView;
