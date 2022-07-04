import Button from '@mui/material/Button';
import React from 'react';

export default class Reacts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: this.props.question,
            currentAnswer: 0,
            choices: this.props.choices,
        };
    }

    handleClick = (event) => {
        event.preventDefault();

        const divs = document.querySelectorAll('.Choose .Answers .Answer');

        // Remove selected class from all divs
        divs.forEach(div => {
            if (div.classList.contains('Selected') && /* is not the clicked div */ div !== event.target) {
                div.classList.remove('Selected');
            }
        });
        
        // Add Selected class to clicked div
        const clicked = event.target;
        clicked.classList.toggle('Selected');
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
            this.props.callNextQuestion();
        } else {
            alert('Veuillez sélectionner une réponse.');
        }
    }

    handlePrevious = () => {
        this.props.callPreviousQuestion();
    }

    render() {

        return (
            <div className="Choose">
    
                <div className="Question">
                    <p className="Question-index">Question 2</p>
    
                    <p className="Question-description">Sélectionnez l'une des affirmations qui répondent correctement à la question</p>
    
                    <h2 className="Question-title">
                        {this.props.question}
                    </h2>
    
                </div>
    
                <div className="Answers">
                    {
                        this.props.choices.map((answer, index) => {
                            return (
                                <div className="Answer" key={index} onClick={this.handleClick}>
                                    {answer}
                                </div>
                            )
                        })
                    }
                </div>
    
                <div className="Buttons">
                    <Button variant="text" className='btnText' onClick={this.handlePrevious}>Précédent</Button>
                    <Button variant="primary" className='btnPrimary' onClick={this.handleNext}>Suivant</Button>
                </div>
    
            </div>
        )
    }
}