import React, { useState ,useEffect } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    //run once when app loads 
    
    //async -> send a request , wait for it , do something with the request 
    const getCountriesData = async() =>{
      await fetch('https://disease.sh/v3/covid-19/countries').then((response)=>response.json()).then((data)=>{
        const countries = data.map((country)=>({
          //returning object items of each  country:-
          name : country.country, // United States
          value: country.countryInfo.iso2 //USA
        }));
        setCountries(countries);

      });
    };
   
    getCountriesData(); //calling the getCountriesData()func , so every time app loads this func will run and gonna fetch the latest covid 19 data 
      
    
  }, [])

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* loop through all the countries and show a dropdwon list of options  */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

            {/* 
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + select input drpodown field */}
      {/* info boxs */}
      {/* info boxs */}
      {/* info boxs */}
      {/* TABLE */}
      {/* graph  */}
      {/* map */}
    </div>
  );
}

export default App;
