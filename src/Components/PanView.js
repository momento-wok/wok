import React from 'react';
import './PanView.css';

class PanView extends React.Component {
  handleClick = (ev) => {
    this.props.setView("map");
  }

  render() {
    return (
      <div className="panview-wrapper">
        <button className="arrow-up-button" onClick={this.handleClick}>
          <svg height="48" width="48" style={{ position: "absolute" }}>
            <circle cx="24" cy="24" r="18" stroke="#ffffff" strokeWidth="1" fill="#00000000" />
          </svg>
          <span className="material-icons">
            keyboard_arrow_up
          </span>
        </button>
        <iframe className="panview" title="panorama" src={`https://momento-wok.github.io/pan/?url=${this.props.data.imageUrl}`} />
      </div>
    )
  }
}

export default PanView;