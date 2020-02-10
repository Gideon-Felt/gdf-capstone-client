import React, { useState} from "react";
import ReactDOM from "react-dom";
import {  useRoutes, A  } from "hookrouter"
import { FortAwesomeIcon, FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collapsible from 'react-collapsible';


import App from "./components/app";
import Icons from "./helpers/icons"
import StateSelector from "./components/state-select"
import stateList from "./components/state-list"
import ChooseSource from "./components/choose-source"

import "./style/main.scss";


function Main() { 
  console.log(process.env)
  Icons()
  const [ cachedData, setCachedData ] = useState([])
  // potentialy just combine both sources using fetch to a single state array here.
  const [ rdpData, setRdpData ] = useState([])
  const [ rdpAppraisalData, setAppraisalData ] = useState([])
  const [ activeStates, setActiveStates ] = useState(stateList)
  const [ currentStyle, setCurrentStlye ] = useState("mapaGrisaStyle")
  const [ sideBarStyle, setSideBarStyle] = useState({width: "0", marginLeft: "0"})
  const [ mapSpaceStyle, setMapSpaceStyle] = useState({width: "100vw", marginLeft: "0"})
  const [ dbSource, setDbSource ] = useState(process.env.REACT_APP_MY_API_RDPS)

  const routes = {
    "/": () => <App
    mapStyle={currentStyle}
    activeStates={activeStates}
    dbSource={dbSource}
    handleDataCache={handleDataCache}
    cachedData={cachedData}
    rdpData={rdpData}
    rdpAppraisalData={rdpAppraisalData}
    handleRdpSourceLoad={handleRdpSourceLoad}
    handleApprSourceLoad={handleApprSourceLoad}
    handleDbSourceChange={handleDbSourceChange}
    />
  }

  const handleMapStyleChange = event => {
    setCurrentStlye(event.target.name)
  }

  const handleStateToggle = (key, boolVal) => {
    let changedStateList = Object.assign({}, activeStates)
    changedStateList[key] = !boolVal
    setActiveStates(changedStateList)
  }

  const handleDbSourceChange = url => {
    setDbSource(url)
  }

  const handleDataCache = data => {
    setCachedData(data)
  }

  const handleRdpSourceLoad = data => {
    setRdpData(data)
  }

  const handleApprSourceLoad = data => {
    setAppraisalData(data)
  }






  function openNav() {
    if (window.innerWidth > 600) {
      setSideBarStyle({width: "21vw", marginRight: "21vw"})
      setMapSpaceStyle({width: "79vw", marginLeft: "21vw"})
    } else if (window.innerWidth < 600) {
      setSideBarStyle({width: "100vw", marginRight: "100vw"})
      setMapSpaceStyle({width: "0", marginLeft: "0"})
    }
    
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    setSideBarStyle({width: "0", margimarginRightnLeft: "0"})
    setMapSpaceStyle({width: "100vw", marginLeft: "0"})
  }

  return (
    <div className="app">
      <div className="nav-bar-wrapper">

        <div className="logo">
          Data Mapper - ESI
          <button className="openbtn" onClick={() => openNav()}><FontAwesomeIcon icon="bars" className="side-bar-bars"/><span className="side-bar-button-text">Open Sidebar</span></button>
        </div>

        <div className="nav-links-wrapper">
          <div className="nav-link-wrapper">
            <A className="nav-link-btn" href="/"><span className="nav-link-text">Home</span></A>
          </div>
          <div className="nav-link-wrapper">
            <a className="nav-link-btn" ><span className="nav-link-text">future Link</span></a>
            {/* <A className="nav-link-btn" href="/form">Form</A> */}
          </div>
        </div>

        <div className="login">
          Gideon
        </div>

      </div>

      <div className="spacer"></div>

      <div>
        <div id="mySidebar" className="sidebar" style={sideBarStyle}>
          <a href="#" className="closebtn" onClick={() => closeNav()}>&times;</a>

          <Collapsible trigger="Map Styles">
            <a className="map-style" name="mapaGrisaStyle" onClick={handleMapStyleChange}>mapa gripa</a>
            <a className="map-style" name="meAndAllStyle" onClick={handleMapStyleChange}>me and all</a>
            <a className="map-style" name="assassinsCreedStyle" onClick={handleMapStyleChange}>assassins creed</a>
            <a className="map-style" name="lostInTheDesertStyle" onClick={handleMapStyleChange}>lost in the desert</a>
            <a className="map-style" name="modestStyle" onClick={handleMapStyleChange}>modeststyle</a>
          </Collapsible>
          <Collapsible trigger="Filter by State">
            <div className="state-toggle-wrapper">
              {
                Object.keys(activeStates).map(state => {
                  return <StateSelector key={state} state={state} boolVal={activeStates[state]} handleStateToggle={handleStateToggle}/>
                })
              }
            </div>
          </Collapsible>
          <Collapsible trigger="Choose source">
              <ChooseSource dbSource={dbSource} handleDbSourceChange={handleDbSourceChange} />
          </Collapsible>

          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div>


        <div id="main">
          <div className="map-space" style={mapSpaceStyle}>
            {useRoutes(routes)}
          </div>
        </div>
      </div>
      
  </div>
    
  )

}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));
