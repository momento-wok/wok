import React from 'react';
import { DDToText } from "./../funcs";
import './GalleryList.css';

class GalleryList extends React.Component {

  handleGalleryItemClick = (i) => {
    let location = this.props.memories[i];
    this.props.moveMapToPoint(location.coordinates.longitude, location.coordinates.latitude, 5);
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
                  <div style={{ fontWeight: "bold" }}>{location.name}</div>
                  <div>{DDToText(location.coordinates.longitude, location.coordinates.latitude)}</div>
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
