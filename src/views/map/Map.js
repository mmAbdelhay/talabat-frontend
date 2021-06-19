import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import { GoogleMapsAPI } from "./client-config";
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPosition: {
        lat: parseFloat(localStorage.getItem("searchlat")),
        lng: parseFloat(localStorage.getItem("searchlng")),
        // lat : props.nuLat ,
        // lng : props.nuLng
        
      },
      markerPosition: {
        lat: parseFloat(localStorage.getItem("searchlat")),
        lng: parseFloat(localStorage.getItem("searchlng")),
        // lat : props.nuLat ,
        // lng : props.nuLng
      },
    };
  }
 componentDidMount(){
   this.setState({
    mapPosition: {
      lat: parseFloat(localStorage.getItem("searchlat")),
      lng: parseFloat(localStorage.getItem("searchlng")),
      
    },
    markerPosition: {
      lat: parseFloat(localStorage.getItem("searchlat")),
      lng: parseFloat(localStorage.getItem("searchlng")),
     
    },

   })
   console.log(this.state);
 }


  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onInfoWindowClose = (event) => {};

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
  
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        this.setState({
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
        //console.log(this.state.lat);
        this.props.onLatChange(this.state.markerPosition.lat);
        this.props.onLngChange(this.state.markerPosition.lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* InfoWindow on top of marker */}
          {/* <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat ,
              lng: this.state.markerPosition.lng,
            }}
          >
            
          </InfoWindow> */}
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <AsyncMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: this.props.height }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
export default Map;
