import React, { useState } from 'react';
import axios from 'axios';

const options = [];

// Api to populate list of cities available to Open AQ Platform
function api (){  
    axios.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/cities?limit=10000&page=1&offset=0&sort=asc&country_id=US&order_by=city', { crossdomain: true })     
    .then(response => {
        var bodyData = response.data;
        var len = response.data.results.length
        if (options.length === 0){
        for(let i = 9; i <= len-1; i++){
            options.push(bodyData.results[i].city)
        }
    }
    })
    return options
  }

function AirqualityUtility(){
    api()
    const [measurements, setMeasurements] = useState([]);
    const [items, setItems] = useState([]);
    const [city, setCity] = useState("Type each city!");
    
    // Store user text and added utility to help guide users through app.
    const addCityToList = () => {
        if (items.length === 2){
            AQ_call(items[0].name,items[1].name)
        }
        else if (items.length < 2){
                if(options.includes(city) === true){
                    if( items.length === 0){
                    alert("Enter second city in Box!")
                }
                    if( items.length === 1){
                        alert("Click Add City again to see results!")
                    }
                    if(!items.find((item) => item.name === city)){
                        setItems([...items, { id: items.length, name: city}]);
                        }
            else if (items.find((item) => item.name === city)){
                alert("This city has already been selected. Please select an additional city");
                }
            } 
        else {
            alert("Not a valid city, please review list of selectable cities above. Each city is case sensitive")
            }
        
        }
    };
    // Api for getting the Air Quality data for chosen cities
    const AQ_call = (city, cityTwo) => {

        let api = "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?limit=100&page=1&offset=0&sort=asc&radius=1000&country_id=US&country=US&city="+city+"&city="+cityTwo
        axios.get(api, { crossdomain: true })     
        .then(response => {    
        var result = response.data.results
        if (result != null){    
            for(let i = 0; i < result.length; i++){   
                if(!measurements.find((metric) => metric.name === city)){
                    setMeasurements((measurements) => [...measurements, {
                    id: i, 
                    name: result[i].city, 
                    value:result[i].measurements[0].value,
                    unit: result[i].measurements[0].unit, 
                    parameter: result[i].measurements[0].parameter,
                    lastUpdated: result[i].measurements[0].lastUpdated
                    }])
                        }
                    }
                }
    })} 
    
    return (
        <div>
        <h4> Choose Two Cities</h4>
        <div class="ui icon input">
        <button class="ui icon button"><i aria-hidden="true" content class="eye icon"></i></button>
            <input type="text" 
            value={city}
            onChange={(event) => setCity(event.target.value)}
            options={options}
            floating
            labeled
            placeholder="Type in city..."/>
            <i aria-hidden="true" 
            class="angle double right"></i>
        <button class="ui secondary button" onClick={() => addCityToList()}>Add City</button>
        </div>
            <ul class="ba">
            {items.map((item) => ( 
                <li key={item.id}>City Selection:{item.name}</li>
            ))}
            </ul>
            <div class="ui inverted segment"><div class="accordion ui inverted"><div class="active title"><i aria-hidden="true" class="dropdown icon"></i>
            <ul class="ba">
            {measurements.map((metric) => (
            <li key={metric.id}>Your selection: {metric.name} has a value of {metric.value}{metric.unit} and was reported {metric.lastUpdated}!</li>
            ))}
            </ul>
            </div></div></div>
            </div>
    );
}
export default AirqualityUtility;