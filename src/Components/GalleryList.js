import React from 'react';
import './GalleryList.css';

class GalleryList extends React.Component {

  handleGalleryItemClick = (i) => {
    let location = this.props.data[i];
    this.props.moveMapToPoint(location.coordinates.longitude, location.coordinates.latitude, 3.6);
  }

  coordinateDisplayText(longitude, latitude) {

    let displayLon = Math.round(Math.abs(longitude * 1000)) / 1000;
    let displayLat = Math.round(Math.abs(latitude * 1000)) / 1000;
  

    return `${displayLat}°${latitude < 0 ? "S" : "N"}, ${displayLon}°${longitude < 0 ? "W" : "E"}`
    
  }

  render() {
    return (
      <div className="gallery-wrapper">
        <h3>Memories</h3>
        <ul className="gallery-list">
          {
            this.props.data.map((location, i) => {
              return (
                <li className="gallery-item" key={location.imageUrl} onClick={() => this.handleGalleryItemClick(i)}>
                  <img src={location.imageUrl} alt="thumbnail" />
                  <span style={{ fontWeight: "bold" }}>{location.name}</span>
                  <span style={{ float: "right" }}>{this.coordinateDisplayText(location.coordinates.longitude, location.coordinates.latitude)}</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}

export default GalleryList;
