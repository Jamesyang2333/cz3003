import React, { Component } from 'react';
import './App.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
          />
          <Header />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
