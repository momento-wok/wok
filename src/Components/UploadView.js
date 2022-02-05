import React from 'react';
import './UploadView.css';

class UploadView extends React.Component {
  render() {
    return (
      <div className="uploadview-wrapper">
        <div className="temp">
          <input id="file-input" type="file" />
          <input id="name-input" type="text" />
        </div>
        <button style={{ position: "absolute", top: 8, left: 8 }} onClick={() => this.props.setView("map")}>MAP</button>
      </div>
    )
  }
}

export default UploadView;
