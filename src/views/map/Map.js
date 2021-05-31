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
      },
      markerPosition: {
        lat: parseFloat(localStorage.getItem("searchlat")),
        lng: parseFloat(localStorage.getItem("searchlng")),
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.markerPosition.lat !== this.props.center.lat) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onInfoWindowClose = (event) => {};

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    console.log(newLat);
    console.log(newLng);
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
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>
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
