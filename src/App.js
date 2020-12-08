import React from 'react';
import './App.css';
import ImageToText from './componets/ImageToText/ImageToText';
import Header from './componets/Header';

function App() {
  return (
    <div className="app">
      <Header message="Image to Text"></Header>
      <ImageToText></ImageToText>
    </div>
  )
}

export default App;