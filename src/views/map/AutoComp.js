import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { GoogleMapsAPI } from './client-config';
Geocode.setApiKey( GoogleMapsAPI );
Geocode.enableDebug();
class AutoComp extends Component {
    constructor(props) {
        super(props);
        this.state = { lat :18.5204,
        lng: 73.8567 }
    }
    onPlaceSelected = ( place ) => {
		console.log( place.geometry.location.lat() );
		console.log( place.geometry.location.lng() );
		let latValue = place.geometry.location.lat();
		let lngValue = place.geometry.location.lng();
        localStorage.setItem('searchlat', JSON.stringify(latValue));
        localStorage.setItem('searchlng', JSON.stringify(lngValue));
		this.setState({
            lat: latValue,
            lng: lngValue
		})
	};
    render() { 
        
        return ( 

            <Autocomplete
							style={{
								width: '50%',
								height: '40px',
								paddingLeft: '16px',
								margin: '10px',
								
							}}
							onPlaceSelected={ this.onPlaceSelected }
							types={['(regions)']}
						/>
         );
    }
}
 
export default AutoComp;