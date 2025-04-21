import React from 'react';
import Navbar from '../Navbar';
import ChatBox from '../ChatBox';
import './index.css';

const Home = () => {
  return (
    <div className='homePageContainer'>
      <Navbar /> 
      <div className='homePageBodyContainer'>
        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
