import ProgressBar from './imports/progressBar';
import Bienvenue from './imports/welcome';
import React from 'react';
import Reacts from './imports/types/react';
import Choose from './imports/types/choose';
import Merci from './imports/merci';

const Questions = [
    {
        id: 1,
        question: "Mes professeurs expliquent les choses d'une manière que je comprends",
        type: "react"
    },
    {
        id: 2,
        question: "Est-ce que l'un des éléments suivants vous empêche de faire de votre mieux à l'école ?",
        type: "choose",
        choices: [
            "Ma vie à la maison",
            "Responsabilités familiales",
            "Se faire cueillir",
            "Responsabilités parascolaires",
            "Aucune des choses ci-dessus"
        ]
    },
    {
        id: 3,
        question: "Votre professeur vous traite-t-il avec respect ?",
        type: "choose",
        choices: [
            "Non presque jamais",
            "Non",
            "Oui",
            "Oui très souvent",
            "Je ne sais pas"
        ]
    }
];



class Wrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: Questions,
            currentQuestion: null,
            answers: [],
            loading: false
        };
    }

    // Initialize the current question
    initializeCurrentQuestion = () => {
        // Change Current Question to the first one in the array
        this.setState({
            currentQuestion: 0,
        });

        const data = {
            length: this.state.questions.length,
            current: 0,
            color: '#26C485', 
        };

        console.log(data);
        this.props.sendProgress(data);
    }

    // Increment the current question by 1
    nextQuestion = () => {
        if (this.state.currentQuestion < this.state.questions.length - 1) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            });
        } else if (this.state.currentQuestion === this.state.questions.length - 1) {
            this.setState({
                currentQuestion: this.state.questions.length
            });
        }

        const data = {
            length: this.state.questions.length,
            current: this.state.currentQuestion + 1,
            color: '#26C485', 
        };

        console.log(data);
        this.props.sendProgress(data);
    }

    // Decrement the current question by 1
    previousQuestion = () => {
        if (this.state.currentQuestion > 0) {
            this.setState({
                currentQuestion: this.state.currentQuestion - 1
            });
        } else {
            this.setState({
                currentQuestion: null
            });
        }

        const data = {
            length: this.state.questions.length,
            current: 0,
            color: '#26C485'
        };

        console.log(data);
        this.props.sendProgress(data);
    }

    // Add the current answer to the answers array
    addResponse = ( id, question, answer ) => {
        const answers = this.state.answers;

        if (answers.length === 0) {
            answers.push({
                id: id,
                question: question,
                answer: answer
            });
        } else {
            let found = false;

            answers.forEach(prevAnswer => {
                if (prevAnswer.id === id) {
                    prevAnswer.answer = answer;
                    found = true;
                }
            });

            if (!found) {
                answers.push({
                    id: id,
                    question: question,
                    answer: answer
                });
            }
        }
        
        this.setState({
            answers: answers
        });
    }

    render() {
        const current = this.state.currentQuestion;
        const question = this.state.questions[current];
        const length = this.state.questions.length;

        // Check if the current question is the last one in the list
        var isLastOne = (current + 1) === length;

        const  renderQuestion = (question) => {
            // Check if the welcome component is already present
            if (current === null) {
                return <Bienvenue initializeQuestion={this.initializeCurrentQuestion}/>;
            } else {
                if (!(current === null) && !(current === length)) {
                    switch (question.type) {
                        case "react":
                            return <Reacts question={question.question} id={question.id} callNextQuestion={this.nextQuestion} callPreviousQuestion={this.previousQuestion} result={this.addResponse}/>;
                        case "choose":
                            return <Choose question={question.question} choices={question.choices} callNextQuestion={this.nextQuestion} callPreviousQuestion={this.previousQuestion} lastQuestion={isLastOne}/>;
                        default:
                            return <div>Une erreur c'est servenue lors du chargement des questions.</div>;
                    }
                } else {
                    return <Merci/>
                }
            }
        }

        const DisplayQuestion = renderQuestion(question);

        return(
            <div className="container">
                {DisplayQuestion}
            </div>
        )
    }
}

export default class Sondage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            length: 0,
            color: '#26C485'
        }
    }

    // Get length from the wrapper component
    loadProgress = (data) => {
        this.setState({
            length: data.length,
            current: data.current,
            color: data.color
        });

        if (data.current === data.length) {
            this.setState({
                color: '#06BEE1',
                current: data.current,
                length: data.length
            });
        } else {
            this.setState({
                color: '#26C485',
                current: data.current,
                length: data.length
            });
        }
    }

    render() {
        return(
            <div className='SurveyWrapper'>
                <div className="SurveyContainer">
                    <ProgressBar current={this.state.current} length={this.state.length} color={this.state.color}/>
                    <Wrapper sendProgress={this.loadProgress}/>
                </div>
            </div>
        )
    }
}

