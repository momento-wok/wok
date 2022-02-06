import React from 'react';
import './LoadingBar.css';

class LoadingBar extends React.Component {
  // this.props: progress, max
  toPercentage = (progress, max) => progress / max * 100;
  
  render() {
    return (
      <div className="loading-bar-outer-wrapper" style={this.props.style}>
        <div className="progress-bar" style={{ transform: `translateX(-${100 - this.toPercentage(this.props.progress, this.props.max)}%)` }} />
      </div>
    )
  }
}

export default LoadingBar;
