import React, { useState, useEffect } from 'react';
import './App.css';
import ContactComponent from './component/ContactComponent/ContactComponent';

export default class MyComponent extends React.Component {
  render() {
    return (
      <div className='app'>
        <ContactComponent />
      </div>
    );
  }
}
