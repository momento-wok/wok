import React from 'react';
import { getMemories } from '../db/retrieveorsomething';
import { uploadMemory } from '../db/uploadorsomething';
import './GalleryList.css';

class GalleryList extends React.Component {

  handleGalleryItemClick = (i) => {
    let location = this.props.memories[i];
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
        <ul className="gallery-list">
          {
            this.props.memories.map((location, i) => {
              return (
                <li className="gallery-item" key={location.thumbnailUrl} onClick={() => this.handleGalleryItemClick(i)}>
                  <img src={location.thumbnailUrl} alt="thumbnail" />
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
