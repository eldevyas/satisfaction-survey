// Required Modules for functionality.
import React, { useState, useEffect, useContext, createContext } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import axios from 'axios';
import { motion } from "framer-motion"
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Sentiment Icons
import MoodBadIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import InsertEmoticonIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
//
// Required Serivces and Functions
import { pushSuccess } from '/services/alert';

/*!	
* FitText.js 1.0 jQuery free version
*
* Copyright 2011, Dave Rupert http://daverupert.com 
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
*
* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
*/


// Madrtt walo

function Cards(props) {
    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.25
          }
        }
    }


    let Satisfaction = props.satisfaction + '%';
    let Soumissions = props.soumissions;
    let TempsMoyen = props.duration;
    let Dernier = props.dernier;





    // Convert Secondes to Minutes:Secondes
    let TempsMoyenMinutes = Math.floor(TempsMoyen / 60);
    let TempsMoyenSecondes = TempsMoyen - (TempsMoyenMinutes * 60);

    TempsMoyenSecondes.toString().includes('.') ? TempsMoyenSecondes = TempsMoyenSecondes.toString().split('.')[0] : TempsMoyenSecondes = TempsMoyenSecondes.toString();
    
    // Convert to only two digits
    TempsMoyenMinutes = TempsMoyenMinutes.toString().length === 1 ? '0' + TempsMoyenMinutes : TempsMoyenMinutes;
    TempsMoyenSecondes = TempsMoyenSecondes.toString().length === 1 ? '0' + TempsMoyenSecondes : TempsMoyenSecondes;
    

    TempsMoyen = TempsMoyenMinutes + ':' + TempsMoyenSecondes;





    // Convert Date (YYYY-MM-DD HH:MM:SS) to Date (DD MM YYYY).
    // Convert MM to Month
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    var today  = new Date(Dernier);



    Dernier = today.toLocaleDateString("fr-MA", options);

      
    const item = {
        hidden: { opacity: 0, x: 100, scale: 0.975 },
        show: { opacity: 1, x: 0, scale: [0.975, 1.025, 0.975, 1] }
    }

    return (
        <motion.div className="Statistiques-Cards" variants={container} initial="hidden" animate="show">
            <motion.div className="Statistiques-Card Red" variants={item}>
                <div className="Statistiques-Card-Title">
                    <ThumbUpAltIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Satisfaction</p>
                </div>
                
                <h1>{Satisfaction}</h1>
            </motion.div>

            <motion.div className="Statistiques-Card White" variants={item}>
                <div className="Statistiques-Card-Title">
                    <FunctionsIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Soumissions</p>
                </div>

                <h1>{ Soumissions }</h1>
            </motion.div>

            <motion.div className="Statistiques-Card Green" variants={item}>
                <div className="Statistiques-Card-Title">
                    <AccessTimeFilledIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Temps Moyen Passé</p>
                </div>
                
                <h1>{TempsMoyen}</h1>
            </motion.div>

            <motion.div className="Statistiques-Card Black" variants={item}>
                <div className="Statistiques-Card-Title">
                    <CalendarTodayIcon className='Statistiques-Card-Title-Icon'/>
                    <p>Dernière Soumission</p>
                </div>

                <h1 id='statistiques-card-dernier'>{ Dernier }</h1>
            </motion.div>
        </motion.div>
    )
}



function FaceIcons(props) {
    const index = props.index;


    switch (index) {
        case 1:
            return <MoodBadIcon/>;
            break;
        case 2:
            return <SentimentVeryDissatisfiedIcon/>;
            break;
        case 3:
            return <SentimentNeutralIcon/>;
            break;
        case 4:
            return <SentimentSatisfiedAltIcon/>;
            break;
        case 5:
            return <InsertEmoticonIcon/>;
            break;
        default:
            return <InsertEmoticonIcon/>;
            break;
    }
}


function QuestionReact(props) {
    const [Expanded, setExpanded] = React.useState(false);

    const handleExpand = () => {
        if (Expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    const animateExpanded = { opacity: 1, transition: { duration: 0.5, ease: "linear" }, height: 60, y : 0 };
    const animateCollapsed = { opacity: 0, transition: { duration: 0.5, ease: "linear" }, height: 0, y : -70 };





    // Get the biggest percentage of the answers and set it to the biggest percentage of the question
    let biggestPercentage = 0;
    let biggestPercentageIndex = 0;



    props.answers.forEach(answer => {
        if (answer.percentage > biggestPercentage) {
            biggestPercentage = answer.percentage;
            biggestPercentageIndex = answer.index;
        }
    })


    return (
        <div className="Question"> 
            <div className="Question-Stats React">
                <div className='Left-Side'>
                    <div className="Question-Stats-Index">
                        {props.index}
                    </div>

                    <div className="Question-Stats-Title">
                        {props.title}
                    </div>
                </div>

                <div className="Question-Stats-Actions">
                    <div className="Question-Stats-Actions-Most">
                        <div className="Question-Stats-Actions-Most-Percentage" style= { { width: `${biggestPercentage}%` } } ></div>
                        <div className="Question-Stats-Actions-Most-Text">
                            <FaceIcons index={biggestPercentageIndex}/>
                            { biggestPercentage + '%' }
                        </div>
                    </div>

                    <motion.div className="Question-Stats-Actions-Expand" onClick={handleExpand} animate={{rotate: Expanded ? 180 : 0}} transition={{ type: "linear"}}>
                        <ExpandMoreIcon/>
                    </motion.div>
               </div> 
            </div>

            <motion.div className='Question-Stats-React-Open React' initial={false} animate={Expanded ? animateExpanded : animateCollapsed} transition={{ type: "linear"}}>                
                {props.answers.map((answer, index) => {
                    return (
                        <motion.div className='Open-Answer' key={index}>
                            <FaceIcons index={answer.index}/>
                            {answer.percentage}%
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>


    );
}

function QuestionChoose(props) {

    const [Expanded, setExpanded] = React.useState(false);

    const handleExpand = () => {
        if (Expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    const animateExpanded = { opacity: 1, transition: { duration: 0.5 }, height: 60 * 4, y : 0, display: "flex" };
    const animateCollapsed = { opacity: 0, transition: { duration: 0.5 }, height: 0, y : -70, overflow: "hidden"};


    const Alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let biggestPercentage = 0;
    let biggestPercentageIndex = 0;
    let biggestPercentageLetter = "";

    props.answers.forEach(answer => {
        if (answer.percentage > biggestPercentage) {
            biggestPercentage = answer.percentage;
            biggestPercentageIndex = answer.index;
            biggestPercentageLetter = Alphabets[answer.index - 1];
        }
    })

    return (
        <motion.div className="Question" variants= {props.variants}> 
            <div className="Question-Stats Choose">
                <div className='Left-Side'>
                    <div className="Question-Stats-Index">
                        {props.index}
                    </div>

                    <div className="Question-Stats-Title">
                        {props.title}
                    </div>
                </div>

                <div className="Question-Stats-Actions">
                    <div className="Question-Stats-Actions-Most">
                        <div className="Question-Stats-Actions-Most-Percentage" style= { { width: `${biggestPercentage}%` } }></div>
                        <div className="Question-Stats-Actions-Most-Text">
                            <div className="Question-Stats-Actions-Most-Text-Icon">{ biggestPercentageLetter }</div>
                            { biggestPercentage + '%' }
                        </div>
                    </div>

                    <motion.div className="Question-Stats-Actions-Expand" onClick={handleExpand} animate={{rotate: Expanded ? 180 : 0}} transition={{ type: "linear"}}>
                        <ExpandMoreIcon/>
                    </motion.div>
               </div> 
            </div>

            <motion.div className='Question-Stats-Choose-Open' initial={false} animate={Expanded ? animateExpanded : animateCollapsed} transition={{ type: "linear"}}>

                { props.answers.map((answer, index) => {
                    return (
                        <motion.div className='Open-Answer' key={index}>
                            <div className='Left-Side'>
                                <div className="Question-Stats-Order">
                                    {Alphabets[answer.index - 1]}
                                </div>

                                <div className="Question-Stats-Answer">
                                    {answer.text}
                                </div>
                            </div>

                            <div className='Right-Side'>
                                {answer.percentage}%
                            </div>
                        </motion.div>
                    )
                }) }


            </motion.div>
        </motion.div>


    );
}



function QuestionsStats(props) {
    // Get the questions statistics from the API
    const [Stats, setStats] = React.useState([]); 

    React.useEffect(() => {
        setTimeout(() => {
            setStats(props.questions);
        }, 2500);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.25,
            delay: 0,
            when: "beforeChildren",
            duration: 0.5,
            ease: "linear"

          }
        }
    }
    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }

    return (
        Stats && Stats.length > 0 ?
        <>  
            <motion.div className="Statistiques-Questions" variants={container} initial="hidden" animate="show">
                {Stats.map((stat, index) => {
                    if (stat.type === "react") {
                        return <QuestionReact key={index} title={stat.question} index={stat.index} answers={stat.answers} variants={item}/>
                    } else if (stat.type === "choose") {
                        return <QuestionChoose key={index} title={stat.question} index={stat.index} answers={stat.answers} variants={item}/>
                    }
                })}
            </motion.div>
        </>
        : 
        <div className="Statistiques-Questions-Loading">
            <div className="loader">
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
                <div className="loader-square"></div>
            </div>
        </div>
    );
}




export default function Statistiques() {
    
    const [globalStats, setGlobalStats] = React.useState(false);


    React.useEffect(() => {
        setTimeout(() => {
            getGlobalStats();
        }, 500);
    }, []);



    let getGlobalStats = () => {
        let URL = "http://localhost/SatisfactionSurvey/server/public/admin/survey/globalStats";

        axios.get(URL)
        .then(response => {
            console.log(response.data);
            setGlobalStats(response.data);
        })
        .catch(error => {
            console.log(error);
            PushFailure(error.message);
        });

    };

    const item = {
        hidden: { opacity: 0, x: 100, scale: 0.975 },
        show: { opacity: 1, x: 0, scale: [0.975, 1.025, 0.975, 1], transition: { duration: 0.5, ease: "easeInOut", delay: .5} }
    }



    return(

        globalStats ?
        <>
            <div className="Statistiques-Container Dashboard-Content-Container">
                <Cards satisfaction = { globalStats.satisfaction } soumissions = { globalStats.soumissions } duration = { globalStats.duration } dernier = { globalStats.dernier }/>
                <motion.div className='Statistiques-Questions-Container' variants= {item} initial="hidden" animate="show">
                    <QuestionsStats questions={ globalStats.questions }/>
                </motion.div>
            </div>
        </>
        : 
        <>
            <div className="Statistiques-Container-Loading">
                <div className="loader">
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                </div>

                <h1 className='Statistiques-Container-Loading-Text'>Chargement des statistiques</h1>
                <p> Veuillez patienter un peu du temps. </p>
            </div>

        </>
    )
}