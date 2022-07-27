// Required Modules for functionality.
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

function SideBar() {

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
                        startIcon={<AnalyticsOutlinedIcon 
                        className="Nav-icon"/>} 
                        className="Nav-item Selected"
                        onClick={(e) => handleItemClick(e)}
                        >
                            Statistiques
                        </Button>

                        <Button 
                        variant="text" 
                        startIcon={<AppRegistrationRoundedIcon 
                        className="Nav-icon"/>} 
                        className="Nav-item Unselected"
                        onClick={(e) => handleItemClick(e)}
                        >
                            Gérer
                        </Button>

                        <Button 
                        variant="text" 
                        startIcon={<DataSaverOnRoundedIcon 
                        className="Nav-icon"/>} 
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
                        onClick={(e) => handleItemClick(e)}
                        >
                            Se déconnecter
                        </Button>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default SideBar;