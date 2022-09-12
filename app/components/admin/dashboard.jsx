// Modules that this component needs
import React, { Component, createContext, useState } from 'react';
import { pushSuccess } from '/services/alert';
//
//
// Importing Inner Components
import SideBar from './imports/sidebar';
import PageContent from './imports/pageContent';


// Create a context for the side bar to share the current page
export const DashboardContext = createContext( {
    currentPage: "Statistiques",
    navigatePages: () => {}
});

const DashboardContextProvider = ( { children } ) => {
    const [currentPage, setCurrentPage] = useState("Statistiques");

    const navigatePages = (Page) => {
        // pushSuccess('Page Changed to ' + Page + '!');
        setCurrentPage(Page);
    }

    const value = {
        currentPage, navigatePages
    }

    return (
        <DashboardContext.Provider value={value}>
            { children }
        </DashboardContext.Provider>
    );
}


function Dashbaord() {
    


    return (
        <DashboardContextProvider>
            <div className="Dashboard">
                <div className="Dashboard-Container">
                    <SideBar/>
                    <PageContent />
                </div>
            </div>
        </DashboardContextProvider>
    );
}


export default Dashbaord;