import React from 'react';
import Header from './components/Header';
import ImageGif from './components/ImageGif';
import AirqualityUtility from './components/AirqualityUtility';
import BannerMessage from './components/BannerMessage';
import CityDropDownMenu from './components/CityDropdownMenu';
import './App.css';

class App extends React.Component {
  render() {
  return (
    <div className="App">
      <div>
      <Header/>  
      <BannerMessage></BannerMessage>
      <ImageGif></ImageGif>
      <CityDropDownMenu></CityDropDownMenu>
      <AirqualityUtility> </AirqualityUtility>
      <div>
      </div>
      </div>
    </div>
  );
}
}
export default App;