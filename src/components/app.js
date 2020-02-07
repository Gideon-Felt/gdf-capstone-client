import React, { Component, useState, useEffect} from "react";
import { GoogleMap, withScriptjs, withGoogleMap, LatLng, Marker, InfoWindow, Circle } from "react-google-maps"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel"
import axios from 'axios'

import mapaGrisaStyle from '../mapStyles/mapaGris'
import meAndAllStyle from '../mapStyles/meAndAll'
import assassinsCreedStyle from '../mapStyles/assassinsCreed'
import lostInTheDesertStyle from '../mapStyles/lostInTheDesert'
import modestStyle from '../mapStyles/modest'



const Map = withScriptjs(withGoogleMap((props) => {
    const [ currentPoints, setCurrentPoints ] = useState([])
    const [ slectedProperty, setSelectedProperty ] = useState(null)
    

    const fetchData = () => {
        axios
            .get(props.dbSource)
            .then(response => {
                setCurrentPoints(response.data.results)
            })
            .catch(error => {
                console.log("error in getPortfolioItems", error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [props.dbSource])




    const heatMapData = () => {


        let filteredStateData = () => {
            return Object.keys(props.activeStates).filter(USstate => {
                
                if (props.activeStates[USstate] === true) {
                    return USstate
                }
            })
        }

        const passedStates = filteredStateData()


        const filteredStates = currentPoints.filter(USstate => {
            if (passedStates.includes(USstate.state)) {
                return USstate
            }
        })
        
        return filteredStates.map(rdp => {return {location: new window.google.maps.LatLng(rdp.latitude, rdp.longitude), weight: 1}})

    }


    const markerPointLayerData = () => {
        let filteredStateData = () => {
            return Object.keys(props.activeStates).filter(USstate => {
                if (props.activeStates[USstate] === true) {
                    return USstate
                }
            })
        }
        const passedStates = filteredStateData()
        const filteredStates = currentPoints.filter(USstate => {
            if (passedStates.includes(USstate.state)) {
                return USstate
            }
        })
        let count = 0
        return filteredStates.map(dataSet => (
            <InfoWindow
            key={`${dataSet.street} ${dataSet.city} ${dataSet.state}${count += 1}`}
            position={{lat: dataSet.latitude, lng: dataSet.longitude}}
            // labelAnchor={new google.maps.Point(0, 0)}
            // icon="./transparent.png"
            // labelStyle={{backgroundColor: "transparent"}}
            onClick={()=>{
                setSelectedProperty(dataSet)
                console.log(dataSet.street)
            }}
            onCloseClick={() => {setSelectedProperty(null)}}
            />
            // >
            // <p>{dataSet.street}</p>
          // </MarkerWithLabel>
        ))
    }




    const googleMapRenderer = () => {
        return (
            <div>
                <GoogleMap
                defaultZoom={4.5}
                defaultCenter={{lat: 39.8097343, lng: -98.5556199}}
                options={{
                    styles: props.mapStyle,
                }}
                >
                <HeatmapLayer
                data={heatMapData()}
                />
                {/* {heatMapData()} */}
                {/* {markerPointLayerData()} */}
                
            </GoogleMap>
        </div>
            
        )
    }
    return googleMapRenderer()
    
}))

// const WrappedMap = withScriptjs(withGoogleMap(Map))



export default function(props) {
    const [ currentStyle, setCurrentStyle ] = useState(mapaGrisaStyle)

    const handleMapStyles = () => {
        console.log("map style: ", props.mapStyle)
        if (props.mapStyle === "meAndAllStyle") {
            setCurrentStyle(meAndAllStyle)
        } else if (props.mapStyle === "assassinsCreedStyle") {
            setCurrentStyle(assassinsCreedStyle)
        } else if (props.mapStyle === "lostInTheDesertStyle") {
            setCurrentStyle(lostInTheDesertStyle)
        } else if (props.mapStyle === "modestStyle") {
            setCurrentStyle(modestStyle)
        } else {
            setCurrentStyle(mapaGrisaStyle)
        }
    }

    useEffect(() => {
        handleMapStyles()
    })

    return (
        <div className="map-container">
            <Map
            googleMapURL={process.env.REACT_APP_GOOGLE_KEY}
            loadingElement={<div style={{ height: "100% "}} />}
            containerElement={<div style={{ height: "100% "}} />}
            mapElement={<div style={{ height: "100% "}} />}
            mapStyle ={currentStyle}
            activeStates={props.activeStates}
            dbSource={props.dbSource}
            />

        </div>
    )
}