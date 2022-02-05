import React from 'react';
import './UploadView.css';

class UploadView extends React.Component {
  render() {
    return (
      <div className="uploadview-wrapper">
        <div className="nav">
          <button class= "active">Upload Image</button>
          <button onClick={() => this.props.setView("map")}>Map</button>
          <button>Gallery</button>
          <button>Sign Out</button>
        </div>
        <div className="temp">
          <input id="file-input" type="file" style={{position: "absolute", top: 100, left: 8 }}/>
          <input id="name-input" type="text" style={{position: "absolute", top: 120, left: 8 }}/>
        </div>
        
      </div>
    )
  }
}

export default UploadView;
