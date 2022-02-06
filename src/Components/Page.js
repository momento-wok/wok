import React from "react";
import './Page.css';

class Page extends React.Component {
  render() {
    return (
      <div className="page-wrapper" style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
