import React from 'react';
import ImageList from './ImageList';
import ImageDetails from './ImageDetails';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <ImageDetails />
        <ImageList />
      </div>
    );
  }
}

export default App;