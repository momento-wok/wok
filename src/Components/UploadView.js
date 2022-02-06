import React from 'react';
import exifr from 'exifr';
import './UploadView.css';
import { DMSToDD, DDToText } from "./../funcs";

class UploadView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadCoordinates: {
        longitude: 0,
        latitude: 0
      }
    };
  }

  handleInputFileChange = async (ev) => {
    let file = ev.target.files[0];
    let exifData = await exifr.parse(file, ['GPSLatitude', 'GPSLatitudeRef', 'GPSLongitude', 'GPSLongitudeRef']);
    let longitude = DMSToDD(exifData.GPSLongitude, exifData.GPSLongitudeRef);
    let latitude = DMSToDD(exifData.GPSLatitude, exifData.GPSLatitudeRef);
    
    this.setState({
      uploadCoordinates: { longitude, latitude }
    });
    console.log(DDToText(longitude, latitude));
    document.querySelector("#file-input-display-text").innerHTML = file.name;
  }

  render() {
    return (
      <div className="uploadview-wrapper">
        <h2>Upload a memory here</h2>
        <div className="form-wrapper">
          <div id="file-input-display">
            <input id="file-input" type="file" accept="image" onChange={this.handleInputFileChange} />
            <div style={{ pointerEvents: "none", top: "50%", left: "50%", transform: "translate(-50%, -50%)", userSelect: "none" }}>
              <div className="material-icons" style={{ fontSize: "160px" }}>
              cloud_upload
              </div>
              <div id="file-input-display-text">Select 360° Panorama Image</div>
            </div>
          </div>
        </div>      
      </div>
    )
  }
}

export default UploadView;
