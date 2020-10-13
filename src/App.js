import React, { useState } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
function App() {
  const [countries, setCountries] = useState(["UK", "USA", "INDIA"]);
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* loop through all the countries and show a dropdwon list of options  */}
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
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
