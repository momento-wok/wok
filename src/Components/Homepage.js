import React from 'react';
import './Homepage.css';

import logo from "../logo-black.png";

class Homepage extends React.Component {
  render() {
    return (
      <div className="home-wrapper">
        <img src={logo} alt="logo" style={{ userSelect: "none", width: 464, marginBottom: 60, padding: 32, paddingLeft: 24, paddingRight: 44, border: "10px double #000000" }} />
        <button onClick={() => this.props.setView("map")}>Log in</button>
        <button onClick={() => this.props.setView("map")}>Sign up</button>
      </div>
    );
  }
}

export default Homepage;
