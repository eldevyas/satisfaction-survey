// Required Modules for functionality.
import Image from 'next/image';
import Router from 'next/router';
//
// Third Party Components
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//
// Required Icons
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FunctionsIcon from '@mui/icons-material/Functions';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


function Cards() {
    return (
        <div className="Statistiques-Cards">
            <div className="Statistiques-Card Red">
                <div className="Statistiques-Card-Title">
                    <ThumbUpAltIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Satisfaction</p>
                </div>
                
                <h1>82%</h1>
            </div>

            <div className="Statistiques-Card White">
                <div className="Statistiques-Card-Title">
                    <FunctionsIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Soumissions</p>
                </div>

                <h1>225</h1>
            </div>

            <div className="Statistiques-Card Green">
                <div className="Statistiques-Card-Title">
                    <AccessTimeFilledIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Temps Moyen Passé</p>
                </div>
                
                <h1>82%</h1>
            </div>

            <div className="Statistiques-Card Black">
                <div className="Statistiques-Card-Title">
                    <CalendarTodayIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Dernière Soumission</p>
                </div>

                <h1>12 Jul 2022</h1>
            </div>
        </div>
    )
}



export default function Statistiques() {
    return(
        <>
            <div className="Statistiques-Container Dashboard-Content-Container">
                <Cards/>
            </div>
        </>
    )
}