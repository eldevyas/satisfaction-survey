// Required Modules for functionality.
import React from 'react';
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
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//
// Required Serivces and Functions
import { pushSuccess } from '/services/alert';



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


function QuestionReact() {
    const [Expanded, setExpanded] = React.useState(false);

    const handleExpand = () => {
        if (Expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    return (
        Expanded ? 
        <>  
            <div className="Question-Stats React">
                <div className='Left-Side'>
                    <div className="Question-Stats-Index">
                        1
                    </div>

                    <div className="Question-Stats-Title">
                        Mes professeurs expliquent les choses d'une manière que je comprends.
                    </div>
                </div>

                <div className="Question-Stats-Actions">
                    <div className="Question-Stats-Actions-Most">
                        <div className="Question-Stats-Actions-Most-Percentage"></div>
                        <div className="Question-Stats-Actions-Most-Text">
                            <InsertEmoticonIcon/>
                            46%
                        </div>
                    </div>

                    <div className="Question-Stats-Actions-Expand" onClick={handleExpand}>
                        <ExpandMoreIcon/>
                    </div>
               </div> 
            </div>
        </>
        : 
        <> 
            <div className="Question-Stats React Open">
                <div className='Left-Side'>
                    <div className="Question-Stats-Index">
                        1
                    </div>

                    <div className="Question-Stats-Title">
                        Mes professeurs expliquent les choses d'une manière que je comprends.
                    </div>
                </div>

                <div className="Question-Stats-Actions">
                    <div className="Question-Stats-Actions-Most">
                        <div className="Question-Stats-Actions-Most-Percentage"></div>
                        <div className="Question-Stats-Actions-Most-Text">
                            <InsertEmoticonIcon/>
                            46%
                        </div>
                    </div>

                    <div className="Question-Stats-Actions-Expand" onClick={handleExpand}>
                        <ExpandMoreIcon/>
                    </div>
               </div> 
            </div>
        </>


    );
}



function QuestionsStats() {
    return (
        <>  
            <div className="Statistiques-Questions">
                <QuestionReact/>
            </div>
        </>
    );
}




export default function Statistiques() {
    return(
        <>
            <div className="Statistiques-Container Dashboard-Content-Container">
                <Cards/>
                <QuestionsStats/>
            </div>
        </>
    )
}