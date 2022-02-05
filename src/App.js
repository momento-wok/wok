import React from "react";
import './App.css';
import MapView from "./Components/MapView";
import PanView from './Components/PanView';

import pans from "./pans.json";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: "map",
      selectedLocation: 0
    };
  }

  setSelectedLocation = (newLocation) => {
    this.setState({
      selectedLocation: newLocation
    });
  }

  setView = (newView) => {
    this.setState({
      view: newView
    });
  }

  render() {
    return (
      <div className="app-wrapper" style={{ marginTop: this.state.view === "map" ? 0 : "-100vh" }}>
        <MapView data={pans} setView={this.setView} setSelectedLocation={this.setSelectedLocation} />
        <PanView data={pans[this.state.selectedLocation]} setView={this.setView} />
      </div>
    );
  }
}

export default App;
