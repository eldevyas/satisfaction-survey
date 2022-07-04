import ProgressBar from './imports/progressBar';
import Bienvenue from './imports/welcome';
import React from 'react';
import Reacts from './imports/types/react';
import Choose from './imports/types/choose';


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

    componentDidMount = function() {
        console.log(this.state.currentQuestion);
    }





    // Initialize the current question
    initializeCurrentQuestion = () => {
        // Change Current Question to the first one in the array
        this.setState({
            currentQuestion: 0
        });
    }

    // Increment the current question by 1
    nextQuestion = () => {
        if (this.state.currentQuestion < this.state.questions.length - 1) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            });
        }
    }

    // Decrement the current question by 1
    previousQuestion = () => {
        if (this.state.currentQuestion > 0) {
            this.setState({
                currentQuestion: this.state.currentQuestion - 1
            });

        }
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

        console.log(this.state.answers);
    }

    render() {
        const current = this.state.currentQuestion;
        const question = this.state.questions[current];
        const length = this.state.questions.length;

        const  renderQuestion = (question) => {
            // Check if the welcome component is already present
            alert(current);

            if (current === null) {
                return <Bienvenue initializeQuestion={this.initializeCurrentQuestion}/>;
            } else if (current >= 0 && !current === length - 1) {
                switch (question.type) {
                    case "react":
                        return <Reacts question={question.question} id={question.id} callNextQuestion={this.nextQuestion} callPreviousQuestion={this.previousQuestion} result={this.addResponse}/>;
                    case "choose":
                        return <Choose question={question.question} choices={question.choices} callNextQuestion={this.nextQuestion} callPreviousQuestion={this.previousQuestion}/>;
                    default:
                        return <div>Une erreur c'est servenue lors du chargement des questions.</div>;
                }
            } else if (current === length - 1) {
                return <h1>Fin.</h1>
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

export default function Sondage() {
    return(
        <div className='SurveyWrapper'>
            <div className="SurveyContainer">
                <ProgressBar/>
                <Wrapper/>
            </div>
        </div>
    )
}