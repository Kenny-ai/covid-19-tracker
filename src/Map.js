import React from "react";
import "./Map.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, zoom, center }) {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className='map'>
      <LoadScript googleMapsApiKey='AIzaSyDPrXZpBnkDm-WwXBe2lnKU5lo4NyKqO_I'>
        <GoogleMap zoom={zoom} mapContainerStyle={mapStyles} center={center}>
          {showDataOnMap(countries, casesType)}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
