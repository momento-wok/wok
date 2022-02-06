import React from 'react';
import './UploadView.css';

class UploadView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formdata_name: "New Memor"
    };
  }

  updateTextInput = (ev) => {
    this.setState({
      formdata_name: ev.target.value
    })
  }

  render() {
    return (
      <div className="uploadview-wrapper">
        <h2>Upload a memory here</h2>
        <div className="form-wrapper">
          <div className='form-item'>
            <label>360 Image</label>
            <input id="file-input" type="file"/>
          </div>
          <div className='form-item'>
            <label>Memory Name</label>
            <input id="name-input" type="text" value={this.state.formdata_name} onChange={this.updateTextInput}/>  
          </div>
        </div>      
      </div>
    )
  }
}

export default UploadView;
