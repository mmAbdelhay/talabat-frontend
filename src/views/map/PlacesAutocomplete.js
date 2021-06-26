import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
  import React from "react";

  
  const PlacesAutocomplete = (props) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    });
    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
  
    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };
  
    const handleSelect =
      ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
  
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
          .then((results) => getLatLng(results[0]))
          .then(({ lat, lng }) => {
            console.log(lat);
            console.log(lng);
            localStorage.setItem('searchlat', JSON.stringify(lat));
            localStorage.setItem('searchlng', JSON.stringify(lng));
            console.log(parseFloat(localStorage.getItem("searchlat")));
            console.log(parseFloat(localStorage.getItem("searchlng")));
            
         
            // console.log(" Coordinates: ", { lat, lng });
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <li key={place_id} onClick={handleSelect(suggestion)}>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
  
    return (
      <div style={{display: 'inline-block',color:'gray'
      }} ref={ref}>
        <input style={{borderRadius:'7px',margin:'5px',height:'50px',width:'550px',fontSize:'16px',padding:'5px',borderStyle:'solid',borderColor:'rgb(166, 166, 166)',borderWidth:'1px'}}
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going? search for area,street,landmark......."
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul style={{backgroundColor:'white'}}>{renderSuggestions()}</ul>}
      </div>
    );
  };
  export default PlacesAutocomplete;



  