import React from "react";
import './App.css';
import MapView from "./Components/MapView";
import PanView from './Components/PanView';
import UploadView from './Components/UploadView';

import { getMemories } from './db/retrieveorsomething';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: "map",
      selectedLocation: undefined,
      memories: [],
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

  async componentDidMount() {   
    let memories = await getMemories();
    memories.sort((a, b) => b.coordinates.latitude - a.coordinates.latitude);
    this.setState({
      memories: memories
    });
  }

  viewPositions = {
    "map": {
      row: "0",
      col: "100vw"
    },
    "panorama": {
      row: "100vh",
      col: "100vw"
    },
    "upload": {
      row: "0",
      col: "0"
    },
  }

  render() {
    let { memories, selectedLocation, view } = this.state;
    return (
      <div className="app-wrapper" style={{ marginTop: "-" + this.viewPositions[view].row, marginLeft: "-" + this.viewPositions[view].col }}>
        <UploadView setView={this.setView} />
        <MapView memories={memories} setView={this.setView} setSelectedLocation={this.setSelectedLocation} />
        <PanView memory={selectedLocation === undefined ? null : memories[selectedLocation]} setView={this.setView} />
      </div>
    );
  }
}

export default App;
