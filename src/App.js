import React from "react";
import './App.css';
import Homepage from "./Components/Homepage";
import PanView from "./Components/PanView";
import MapView from "./Components/MapView";
import Page from "./Components/Page";
import UploadView from './Components/UploadView';

import { getMemories } from './db/retrieveorsomething';

import inlineLogo from "./logo-inline.png";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: "home",
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
    console.log(newView)
  }

  fetchMemories = async () => {
    let memories = await getMemories();
    memories.sort((a, b) => b.coordinates.latitude - a.coordinates.latitude);
    this.setState({
      memories: memories
    });
  }

  componentDidMount() {   
    this.fetchMemories();
  }

  render() {
    let { memories, selectedLocation, view } = this.state;
    return (
      <div className="app-wrapper">
        <Page style={{ marginTop: view === "panorama" ? "-100vh" : 0 }}>
          {
            view !== "home" &&
            <div className="nav">
              <img src={inlineLogo} style={{ height: 54, imageRendering: "pixelated", padding: "0 16px" }} alt="logo" />
              <div style={{ flexGrow: 1}} />
              <div className="button-wrapper">
                <button onClick={() => this.setView("map")}>Map</button>
                <button onClick={() => this.setView("upload")}>Upload</button>
                <button>Gallery</button>
                <button onClick={() => this.setView("home")}>Sign Out</button>
              </div>
            </div>
          }
          {
            view === "home" &&
            <Homepage setView={this.setView} />
          }
          {
            (view === "map" || view === "panorama") &&
            <MapView memories={memories} setView={this.setView} setSelectedLocation={this.setSelectedLocation} />
          }
          {
            view === "upload" &&
            <UploadView setView={this.setView} fetchMemories={this.fetchMemories} />
          }
        </Page>
        <Page>
          <PanView memory={selectedLocation === undefined ? null : memories[selectedLocation]} setView={this.setView} />
        </Page>
      </div>
    );
  }
}

export default App;
