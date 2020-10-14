import React, { useState ,useEffect } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from './Infobox';


function App() {
  const [countries, setCountries] = useState([]);
  //by default selected country will be worldwide  
  const [country, setCountry] =useState('Worldwide');
  
  useEffect(() => {
    //run once when app loads 
    
    //async -> send a request , wait for it , do something with the request 
    const getCountriesData = async() =>{
      await fetch('https://disease.sh/v3/covid-19/countries').then((response)=>response.json()).then((data)=>{
        const countries = data.map((country)=>({
          //returning object items of each  country:-
          name : country.country, // United States country name 
          value: country.countryInfo.iso2 //USA country code 
        }));
        setCountries(countries);

      });
    };
   
    getCountriesData(); //calling the getCountriesData()func , so every time app loads this func will run and gonna fetch the latest covid 19 data 
      
    
  }, []);


  const onCountryChange = (event) =>{
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            {/* loop through all the countries and show a dropdwon list of options  */}
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>
      <div className ="app__stats">
        <InfoBox title="Coronavirus Cases" cases={12121} total={3000}/>
        <InfoBox title="Recovered" cases={12121} total={200}/>
        <InfoBox title="Deaths" cases={12121} total={20000}/>

      {/* info boxs title="corona virus cases "*/}
      {/* info boxs title ="coronavirus recoveries"*/}
      {/* info boxs */}
      </div>

      {/* Header */}
      {/* Title + select input drpodown field */}
     
      {/* TABLE */}
      {/* graph  */}
      {/* map */}
    </div>
  );
}

export default App;



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