// Required Modules for functionality.
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Router from 'next/router';
//
// Third Party Components
import Button from '@mui/material/Button';
//
// Required Icons
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import DataSaverOnRoundedIcon from '@mui/icons-material/DataSaverOnRounded';
import LogoutIcon from '@mui/icons-material/Logout';
// Required Functions and Services
import { pushSuccess } from '/services/alert';
import { DashboardContext } from './../dashboard';

function DesktopNavigation() {
    const handleLeave = () => {
        Router.push('/admin');
    }

    // Get the current page from the context
    const { currentPage, navigatePages } = useContext(DashboardContext);



    const handleItemClick = (event) => {
        if (event.target.classList.contains('Selected')) {
            return false;
        } else {
            event.preventDefault();

            // Remove the previous selected item from the list 
            document.querySelectorAll('.Nav-item').forEach((item) => {
                item.classList.remove('Selected');
                item.classList.add('Unselected');
                item.setAttribute('variant', 'text');
            });

    
            event.target.classList.toggle('Selected');
            event.target.classList.toggle('Unselected');
    
            // Change the clicked button attributes
            if (event.target.classList.contains('Selected')) {
                event.target.setAttribute('variant', 'primary');
            } else {
                event.target.setAttribute('variant', 'text');
            }

            navigatePages(event.target.getAttribute('page'));            
            return true;
        }
    }


    return(
        <>
            <div className="Sidebar">
                <div className="Sidebar-Container">
                    <div className="Sidebar-Header">
                        <span>
                            <img className="Logo" src={"/image/logo.png"} alt="logo" onClick={function() { Router.push('/') }}/>
                        </span>
                        <h1>NTIC RABAT</h1>
                    </div>
                    <div className="Sidebar-Content">
                        <Button 
                        variant="primary" 
                        startIcon={<AnalyticsOutlinedIcon className="Nav-icon"/>} 
                        page="Statistiques"
                        className="Nav-item Selected"
                        onClick={(e) => handleItemClick(e)}
                        >
                            Statistiques
                        </Button>

                        <Button 
                        variant="text" 
                        startIcon={<AppRegistrationRoundedIcon className="Nav-icon"/>} 
                        page ="Gérer"
                        className="Nav-item Unselected"
                        onClick={(e) => handleItemClick(e)}
                        >
                            Gérer
                        </Button>

                        <Button 
                        variant="text" 
                        startIcon={<DataSaverOnRoundedIcon className="Nav-icon"/>} 
                        page ="Ajouter"
                        className="Nav-item Unselected"
                        onClick={(e) => handleItemClick(e)}
                        >
                            Ajouter
                        </Button>

                    </div>

                    <div className="Sidebar-Footer">
                        <Button 
                        variant="text" 
                        startIcon={<LogoutIcon className="Nav-icon"/>} 
                        className="DisconnectBtn"
                        onClick={handleLeave}
                        >
                            Se déconnecter
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}


function MobileNavigation() {
    // Set Selected Item to the current page for the props
    const handleLeave = () => {
        Router.push('/admin');
    }

    const { currentPage, navigatePages } = useContext(DashboardContext);


    const handleItemClick = (event) => {
        if (event.target.classList.contains('Selected')) {
            return false;
        } else {
            event.preventDefault();

            // Remove the previous selected item from the list 
            document.querySelectorAll('.Nav-item').forEach((item) => {
                item.classList.remove('Selected');
                item.classList.add('Unselected');
                item.setAttribute('variant', 'text');
            });


    
            event.target.classList.toggle('Selected');
            event.target.classList.toggle('Unselected');
    
            // Change the clicked button attributes
            if (event.target.classList.contains('Selected')) {
                event.target.setAttribute('variant', 'primary');
            } else {
                event.target.setAttribute('variant', 'text');
            }
    
            navigatePages(event.target.getAttribute('page'));
            return true;
        }

    }


    return(
        <>
            <div className="Mobile-Navigation"> 
                <div className="Sidebar-Content">
                    <Button variant="primary" page="Statistiques" className="Nav-item Selected" onClick={(e) => handleItemClick(e)}>
                        <AnalyticsOutlinedIcon className="Nav-icon"/>
                    </Button>

                    <Button variant="text" page="Gérer"  className="Nav-item Unselected" onClick={(e) => handleItemClick(e)} >
                        <AppRegistrationRoundedIcon className="Nav-icon"/>
                    </Button>

                    <Button variant="text" page="Ajouter" className="Nav-item Unselected" onClick={(e) => handleItemClick(e)}>
                        <DataSaverOnRoundedIcon className="Nav-icon"/>
                    </Button>

                    <Button variant="text" className="Nav-item Logout Unselected" onClick={(e) => { handleLeave()}}>
                        <LogoutIcon className="Nav-icon"/>
                    </Button>
                </div>
            </div>
        </>
    )
}

function getWindowDimensions() {
    if (typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
    } else {
        return {
            width: 0,
            height: 0
        }
    }
}





function SideBar(props) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      // Check if the window is less than or equal to 768px
      if (windowDimensions.width <= 768) {
        // If the window is less than or equal to 768px, then the sidebar is displayed in mobile mode
        // Scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  

    return(
        windowDimensions.width > 768 ? 
        <>
            <DesktopNavigation/>
        </>
        :
        <>
            <MobileNavigation/>
        </>
    )
}

export default SideBar;