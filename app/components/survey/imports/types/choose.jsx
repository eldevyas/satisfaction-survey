import Button from '@mui/material/Button';
import React from 'react';
import { pushSuccess, pushFailure, pushWarning } from './../../../../services/alert';
// Toast support
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import WarningIcon from '@mui/icons-material/Warning';

export default class Reacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            choices: this.props.choices
        };

        this.responseBack = {
            questionID: this.props.id,
            answerID: null
        }

        this.currentAnswer = null
    }

    handleClick = (event) => {

        // Get clicked target from event
        const clicked = event.target;

        // Remove selected class from all other divs
        const answers = document.querySelectorAll('.Choose .Answers .Answer');
        
        answers.forEach(answer => {
            if (answer.classList.contains('Selected') && answer !== clicked) {
                answer.classList.remove('Selected');
            } 
        });

        // Add selected class to clicked div
        if (!clicked.classList.contains('Selected')) {
            clicked.classList.add('Selected');

            // Get answer from clicked div
            const answer = document.querySelector('.Choose .Answers .Answer.Selected').getAttribute('answer');

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
        const divs = document.querySelectorAll('.Choose .Answers .Answer');
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
            <div className="Choose">
    
                <div className="Question">
                    <p className="Question-index">Question {this.props.index}</p>
    
                    <p className="Question-description">Sélectionnez l'une des affirmations qui répondent correctement à la question</p>
    
                    <h2 className="Question-title">
                        {this.props.question}
                    </h2>
    
                </div>
    
                <div className="Answers">
                    {
                        this.props.choices.map((answer, index) => {
                            return (
                                <div className="Answer" key={index} onClick={this.handleClick} answer={answer.id}>
                                    {answer.text}
                                </div>
                            )
                        })
                    }
                </div>
    
                <div className="Buttons">
                    <Button variant="text" className='btnText' onClick={this.handlePrevious}>Précédent</Button>
                    <Button variant="primary" className='btnPrimary' onClick={this.handleNext}>{this.props.lastQuestion ? 'Soumettre' : 'Suivant'}</Button>
                </div>
    
            </div>
        )
    }
}