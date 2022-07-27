// Modules that this component needs
import React, { Component } from 'react';
//
//
// Importing Inner Components
import SideBar from './imports/sidebar';
import PageContent from './imports/pageContent';


function Dashbaord() {
  return (
    <div className="Dashboard">
        <div className="Dashboard-Container">
            <SideBar/>
            <PageContent/>
        </div>
    </div>
  );
}


export default Dashbaord;