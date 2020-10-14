import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import InfoBox from "./Infobox";
import Map from "./Map";
import Table from "./Table";
import { prettyPrintStat, sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  //by default selected country will be worldwide
  const [country, setInputCountry] = useState("worldwide");

  //setting countryInfo data that we got from the api call, we convereted it in object through .json() and then storing data in countryInfo
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
    //run once when app loads

    //async -> send a request , wait for it , do something with the request
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            //returning object items of each  country:-
            name: country.country, // United States country name
            value: country.countryInfo.iso2, //USA country code
          }));

          let sortedData = sortData(data);
          setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData(); //calling the getCountriesData()func , so every time app loads this func will run and gonna fetch the latest covid 19 data
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log(countryCode);
    

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
      

        // All of the data
        // from the country response
        setInputCountry(countryCode);
        setCountryInfo(data);
        (countryCode === "worldwide")? setMapCenter({ lat: 34.80746, lng: -40.4796 }) : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  console.log("country info", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* loop through all the countries and show a dropdwon list of options  */}
              <MenuItem value="worldwide"  >Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox 
           isRed
            active={casesType==='cases'}
            onClick={e=> setCasesType("cases")}
            title="Coroddnavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
           
            active={casesType==='recovered'}
            onClick={e=> setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox 
           isRed
            active={casesType==='deaths'}
            onClick={e=> setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map
          
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        ></Map>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          {/*Graph */}
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

//https://disease.sh/v3/covid-19/all  :- worldwide
//https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
// response :-
// {
//   "updated": 1602654741421,
//   "country": "Afghanistan",
//   "countryInfo": {
//       "_id": 4,
//       "iso2": "AF",
//       "iso3": "AFG",
//       "lat": 33,
//       "long": 65,
//       "flag": "https://disease.sh/assets/img/flags/af.png"
//   },
//   "cases": 39994,
//   "todayCases": 66,
//   "deaths": 1480,
//   "todayDeaths": 0,
//   "recovered": 33354,
//   "todayRecovered": 46,
//   "active": 5160,
//   "critical": 93,
//   "casesPerOneMillion": 1021,
//   "deathsPerOneMillion": 38,
//   "tests": 115720,
//   "testsPerOneMillion": 2954,
//   "population": 39172730,
//   "continent": "Asia",
//   "oneCasePerPeople": 979,
//   "oneDeathPerPeople": 26468,
//   "oneTestPerPeople": 339,
//   "activePerOneMillion": 131.72,
//   "recoveredPerOneMillion": 851.46,
//   "criticalPerOneMillion": 2.37
// }
