import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import GalleryList from './GalleryList';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapView.css';

import marker from '../marker.png';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZGVycGNoZWVzZTY5IiwiYSI6ImNrejloa3I4ZDF1NnIydnIxcGVvbnpkY2UifQ.i5YMIdUOAk40CEHg5eieQw'
  // accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class MapView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapViewport: {
        longitude: 8,
        latitude: 30,
        zoom: 1.8,
      }
    }
  }

  showPanorama = (index) => {
    this.props.setSelectedLocation(index);
    this.props.setView("panorama");
  }

  handleMapMove = (map) => {
    this.moveMapToPoint(map.getCenter().lng, map.getCenter().lat, map.getZoom());
  };

  moveMapToPoint = (longitude, latitude, zoom) => {
    this.setState({
      mapViewport: {
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
      }
    });
  }

  render() {
    return (
      <div className="mapview-wrapper">
        <div className="map-wrapper">
          <Map
            // eslint-disable-next-line
            style="mapbox://styles/derpcheese69/ckz9ixt5v000016o0azpswslq"
            center={[this.state.mapViewport.longitude, this.state.mapViewport.latitude]}
            zoom={[this.state.mapViewport.zoom]}
            onMoveEnd={this.handleMapMove}
            onZoomEnd={this.handleMapMove}
            onPitchEnd={this.handleMapMove}
            containerStyle={{
              height: '100%',
              width: '100%'
            }}
          >
            {
              this.props.data.map((location, i) => {
                return (
                  <Marker
                    key={i}
                    coordinates={[location.coordinates.longitude, location.coordinates.latitude]}
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
        <GalleryList data={this.props.data} moveMapToPoint={this.moveMapToPoint} />
      </div>
    )
  }
}

export default MapView;
