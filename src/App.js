import "./App.css";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { formatStat, sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        if (countryCode !== "worldwide") {
          setMapCenter({
            lat: data.countryInfo.lat,
            lng: data.countryInfo.long,
          });
          setMapZoom(5);
        } else {
          setMapCenter({ lat: 34.80746, lng: -40.4796 });
          setMapZoom(5);
        }
      });
  };
  //  console.log("Country Info", countryInfo);

  return (
    <div className='app'>
      <div className='app__left'>
        <div className='app__header'>
          <h1>
            <span style={{ color: "#ffa500" }}>COVID</span>
            <span style={{ color: "#7dd71d" }}>-19 </span>
            <span style={{ color: "#CC1034" }}>TRACKER</span>
          </h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='app__stats'>
          <InfoBox
            casesType='cases'
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title='Coronavirus cases'
            cases={formatStat(countryInfo.todayCases)}
            total={formatStat(countryInfo.cases)}
          />
          <InfoBox
            casesType='recovered'
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title='Recovered'
            cases={formatStat(countryInfo.todayRecovered)}
            total={formatStat(countryInfo.recovered)}
          />
          <InfoBox
            casesType='deaths'
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title='Deaths'
            cases={formatStat(countryInfo.todayDeaths)}
            total={formatStat(countryInfo.deaths)}
          />
        </div>

        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className='app__graphTitle'>Worldwide new {casesType}</h3>
          <LineGraph className='app__graph' casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
