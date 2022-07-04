import Button from '@mui/material/Button';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import React from 'react';


export default class Reacts extends React.Component {
    // Get question from props
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            response: {
                    id: this.props.id,
                    question: this.props.question,
                    answer: null,
                }
            ,
            currentAnswer: 0,
            loading: false
        };
    }

    handleClick = (event) => {
        event.preventDefault();

        const divs = document.querySelectorAll('.React .Answers .Answer');

        // Remove selected class from all divs
        divs.forEach(div => {
            if (div.classList.contains('Selected') && /* is not the clicked div */ div !== event.target) {
                div.classList.remove('Selected');
            }
        });
        
        // Add Selected class to clicked div
        const clicked = event.target;
        clicked.classList.toggle('Selected');

        // Update state with new answer.
        this.setState({
            question: this.props.question,
            response: {
                id: this.props.id,
                question: this.props.question,
                answer: clicked.dataset.value,
            }
        });
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
            this.props.callNextQuestion();
            this.props.result(this.state.answers);
        } else {
            alert('Veuillez sélectionner une réponse.');
        }
    }

    handlePrevious = () => {
        this.props.callPreviousQuestion();
    }
        
    
    render() {

        return (
            <div className="React">
        
                <div className="Question">
                    <p className="Question-index">Question 1</p>
        
                    <p className="Question-description">Dans quelle mesure êtes-vous d'accord ou en désaccord avec l’énoncé suivant?</p>
        
                    <h2 className="Question-title">
                        {this.props.question}
                    </h2>
        
                    <p className="Question-description">Tout à gauche signifie fortement en désaccord et tout à droite signifie fortement d'accord.</p>
                </div>
        
                <div className="Answers">
                    <div className="Answer Big" onClick={this.handleClick}>
                        <SentimentVeryDissatisfiedIcon/>
                    </div>
        
                    <div className="Answer Medium" onClick={this.handleClick}>
                        <SentimentDissatisfiedIcon/>
                    </div>
        
                    <div className="Answer Small" onClick={this.handleClick}>
                        <SentimentNeutralIcon/>
                    </div>
        
                    <div className="Answer Medium" onClick={this.handleClick}>
                        <SentimentSatisfiedAltIcon/>
                    </div>
        
                    <div className="Answer Big" onClick={this.handleClick}>
                        <SentimentVerySatisfiedIcon/>
                    </div>
                </div>
        
                <div className="Buttons">
                    <Button variant="text" className='btnText' onClick={this.handlePrevious}>Précédent</Button>
                    <Button variant="primary" className='btnPrimary' onClick={this.handleNext}>Suivant</Button>
                </div>
        
            </div>
        )
    }
}
