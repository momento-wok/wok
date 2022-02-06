import React, { createRef } from 'react';
import LoadingBar from './LoadingBar';
import exifr from 'exifr';
import './UploadView.css';
import { DMSToDD } from "./../funcs";
import { uploadMemory } from "./../db/uploadorsomething";

class UploadView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      uploadStepsComplete: 0
    }
    this.inputRef = createRef();
  }

  setFileUploadDisplayText = (text) => {
    document.querySelector("#file-input-display-text").innerHTML = text;
  }

  incrementStepsComplete = () => {
    this.setState((prevState) => ({
      uploadStepsComplete: prevState.uploadStepsComplete + 1
    }));
  }

  handleInputFileChange = () => {
    this.setState({
      uploading: true
    }, async () => {

      let file = this.inputRef.current.files[0];
      let exifData = await exifr.parse(file, ['GPSLatitude', 'GPSLatitudeRef', 'GPSLongitude', 'GPSLongitudeRef']);
      let longitude = DMSToDD(exifData.GPSLongitude, exifData.GPSLongitudeRef);
      let latitude = DMSToDD(exifData.GPSLatitude, exifData.GPSLatitudeRef);
      this.setFileUploadDisplayText(file.name);

      await uploadMemory(file, { longitude, latitude }, this.incrementStepsComplete);

      this.setFileUploadDisplayText("Select 360° Panorama Image");
      this.setState({
        uploading: false
      });
      this.props.fetchMemories();
    });
  }

  render() {
    return (
      <div className="uploadview-wrapper">
        <h2>Upload a memory here</h2>
        <div className="form-wrapper">
          <div id="file-input-display" className={this.state.uploading ? "disabled" : null}>
            <input
              ref={this.inputRef}
              id="file-input"
              type="file"
              accept="image/jpeg"
              onChange={this.handleInputFileChange}
              disabled={this.state.uploading}
            />
            <div style={{ pointerEvents: "none", top: "50%", left: "50%", transform: "translate(-50%, -50%)", userSelect: "none" }}>
              <div className="material-icons" style={{ fontSize: "160px" }}>
              cloud_upload
              </div>
              <div id="file-input-display-text">Select 360° Panorama Image</div>
            </div>
          </div>
        </div>
        <LoadingBar
          style={{
            marginTop: 32,
            display: this.state.uploading ? "inline-block" : "none"
          }}
          progress={this.state.uploadStepsComplete}
          max={8}
        />
      </div>
    )
  }
}

export default UploadView;
