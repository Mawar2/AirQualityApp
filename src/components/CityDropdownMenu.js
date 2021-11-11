import React from 'react';
import { Dropdown, Segment } from 'semantic-ui-react';
import axios from 'axios';

const options = [];

class CityDropdownMenu extends React.Component {
  constructor(props){  
    super(props)
    this.state = {
      city: "List of Cities"
    }
    this.onChange = this.onChange.bind(this)
  }
  async componentDidMount(){   
    axios.get('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/cities?limit=10000&page=1&offset=0&sort=asc&country_id=US&order_by=city', { crossdomain: true })     
    .then(response => {
        var bodyData = response.data;
        var len = response.data.results.length
        if (options.length === 0){
        for(let i = 9; i <= len-1; i++){
          options.push({ "key":bodyData.results[i].city, "text": bodyData.results[i].city, "value":bodyData.results[i].city})
        }
        }

    })
  }
  onChange(event, data){
    this.setState({
      city: data.value
    })
    this.onChange = this.onChange.bind(this)

  }
  render() {
      return (
        
  <Segment basic>
      <Dropdown
      button
      className='icon'
      floating
      labeled
      icon='world'
      options={options}
      search
      onChange={this.onChange}
      text={this.state.city}
      value={this.state.city}
      />
  </Segment>
  )
  }
}

export default CityDropdownMenu
