import React from "react";
import numeral from "numeral";
import { Circle, InfoWindow } from "@react-google-maps/api";

export const casesTypeColors = {
  cases: {
    hex: "#ffa500",
    multiplier: 400,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 600,
  },
  deaths: {
    hex: "#CC1034",
    multiplier: 1000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const formatStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={{
        lat: country.countryInfo.lat,
        lng: country.countryInfo.long,
      }}
      fillOpacity={0.4}
      options={{
        strokeColor: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <InfoWindow
        position={{
          lat: country.countryInfo.lat,
          lng: country.countryInfo.long,
        }}
      >
        <h1>I AM A POPUP</h1>
      </InfoWindow>
    </Circle>
  ));
