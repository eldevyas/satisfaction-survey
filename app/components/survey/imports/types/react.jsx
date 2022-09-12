import Button from '@mui/material/Button';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import React from 'react';

// Alerts
import { pushSuccess, pushFailure, pushWarning } from './../../../../services/alert';


export default class Reacts extends React.Component {
    // Get question from props
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question
        };

        this.responseBack = {
            id: this.props.id,
            answer: null
        }

        this.currentAnswer = null
    }

    handleClick = (event) => {

        // Get clicked target from event
        const clicked = event.target;

        // Remove selected class from all other divs
        const answers = document.querySelectorAll('.React .Answers .Answer');
        
        answers.forEach(answer => {
            if (answer.classList.contains('Selected') && answer !== clicked) {
                answer.classList.remove('Selected');
            } 
        });

        // Add selected class to clicked div
        if (!clicked.classList.contains('Selected')) {
            clicked.classList.add('Selected');

            // Get answer from clicked div
            const answer = document.querySelector('.React .Answers .Answer.Selected').getAttribute('answerid');

            // Set current answer to answer
            this.currentAnswer = answer;
        } else {
            clicked.classList.remove('Selected');

            // Set current answer to null
            this.setState({
                currentAnswer: null,
            });
        }
    }

    handleNext = () => {
        // Check if an answer is selected
        const divs = document.querySelectorAll('.React .Answers .Answer');
        let selected = false;

        divs.forEach(div => {
            if (div.classList.contains('Selected')) {
                selected = true;
            }
        });

        if (selected) {
            if (this.currentAnswer !== null && this.currentAnswer !== undefined && this.currentAnswer !== 0) {

                this.responseBack = {
                        id: this.props.id,
                        answer: this.currentAnswer
                }
                    
                this.props.addAnswer(this.responseBack);
                this.props.callNextQuestion();
            } else {
                pushFailure('Aucune réponse n\'a été sélectionnée.');
            }
        } else {
            pushWarning('Veuillez sélectionner une réponse.');
        }
    }

    handlePrevious = () => {
        this.props.callPreviousQuestion();
    }
        
    
    render() {

        return (
            <div className="React">
        
                <div className="Question">
                    <p className="Question-index">Question {this.props.index}</p>
        
                    <p className="Question-description">Dans quelle mesure êtes-vous d'accord ou en désaccord avec l’énoncé suivant?</p>
        
                    <h2 className="Question-title">
                        {this.props.question}
                    </h2>
        
                    <p className="Question-description">Tout à gauche signifie fortement en désaccord et tout à droite signifie fortement d'accord.</p>
                </div>
        
                <div className="Answers">
                    <div className="Answer Big BigNegative" onClick={this.handleClick} answer='Très insatisfait' answerid={1}>
                        <SentimentVeryDissatisfiedIcon/>
                    </div>
        
                    <div className="Answer Medium MediumNegative" onClick={this.handleClick} answer='Insatisfait' answerid={2}>
                        <SentimentDissatisfiedIcon/>
                    </div>
        
                    <div className="Answer Small SmallNeutral" onClick={this.handleClick} answer='Neutre' answerid={3}>
                        <SentimentNeutralIcon/>
                    </div>
        
                    <div className="Answer Medium MediumPositive" onClick={this.handleClick} answer='Satisfait' answerid={4}>
                        <SentimentSatisfiedAltIcon/>
                    </div>
        
                    <div className="Answer Big BigPositive" onClick={this.handleClick} answer='Très satisfait' answerid={5}>
                        <SentimentVerySatisfiedIcon/>
                    </div>
                </div>
        
                <div className="Buttons">
                    <Button variant="text" className='btnText' onClick={this.handlePrevious}>Précédent</Button>
                    <Button variant="primary" className='btnPrimary' onClick={this.handleNext}>{this.props.lastQuestion ? 'Soumettre' : 'Suivant'}</Button>
                </div>
        
            </div>
        )
    }
}
