import ProgressBar from './imports/progressBar';
import Bienvenue from './imports/welcome';
import React from 'react';
import Reacts from './imports/types/react';
import Choose from './imports/types/choose';
import Merci from './imports/merci';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
//Axios
import axios from 'axios';

import { pushFailure , pushSuccess, pushWarning} from './../../functions/alert';


class Wrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null,
            currentQuestion: null,
            answers: [],
            loading: true
        };
    }

    getQuestions = () => {
        this.setState({
            loading: true
        });

        axios.get('https://api.jsonbin.io/v3/b/62c97a915d53821c30966f4a/latest')
            .then(response => {
                console.log(response.data.record);
                setTimeout(() => {
                    this.setState({
                        questions: response.data.record,
                        currentQuestion: null,
                        loading: false
                    });
                } , 500);
            })
            .catch(error => {
                pushFailure(error.message);

                setTimeout(() => {
                    this.setState({
                        loading: false,
                        questions: null
                    });
                } , 2000);
            }
        );
    }

    componentDidMount() {
        this.getQuestions();
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

        this.props.sendProgress(data);
    }

    // Increment the current question by 1
    nextQuestion = () => {
        const current = this.state.currentQuestion;
        const length = this.state.questions.length;

        var isLastOne = (current + 1) === length;
        if (!isLastOne && this.state.questions.length !== 0) {
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

            this.props.sendProgress(data);
        } else {
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

            this.props.sendProgress(data);
            this.props.sendSurvey(this.state.answers);
        }
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
            current: this.state.currentQuestion - 1,
            color: '#26C485'
        };

        this.props.sendProgress(data);
    }

    // Add the answer of the current question to the Answers Array.
    addAnswer = (answer) => {
        

        if (this.state.answers.length === 0) {
            this.state.answers.push(answer);
        } else {
            this.state.answers[this.state.currentQuestion] = answer;
        }
    }


    render() {
        const  renderQuestion = (question, current, length) => {
            // Check if the welcome component is already present
            if (current === null) {
                return <Bienvenue initializeQuestion={this.initializeCurrentQuestion}/>;
            } else {
                if (!(current === null) && !(current === length)) {
                    switch (question.type) {
                        case "react":
                            return <Reacts question={question.question} id={question.id} index={question.index} callNextQuestion={this.nextQuestion} callPreviousQuestion={this.previousQuestion} lastQuestion={isLastOne} addAnswer={this.addAnswer}/>;
                        case "choose":
                            return <Choose question={question.question} id={question.id} index={question.index}  choices={question.choices} callNextQuestion={this.nextQuestion} callPreviousQuestion={this.previousQuestion} lastQuestion={isLastOne} addAnswer={this.addAnswer}/>;
                        default:
                            return (
                                <div className="loadingContainer">
                                    <div className="planet">                    
                                    </div>
                                    
                                    <p className="title">Erreur lors du chargement!</p>

                                    <p>Il semble que le type des données reçus de l'API est incorrect. Vous pouvez réintialiser la requète en clickant la button çi-dessous. </p>

                                    <Button variant="outlined" onClick={() => {this.getQuestions();}} className="buttonRefresh" endIcon={<RefreshIcon/>} >Réessayer</Button>
                                </div>
                            )
                    }
                } else {
                    return <Merci/>
                }
            }
        }

        if (this.state.loading || this.state.questions === null) {
            return (
                <div className="loadingContainer">
                    <div className="planet">                    
                    </div>
                    
                    <p className="title">Chargement des questions...</p>

                    <p>Le chargement est-il trop long ? Vérifiez l'état de votre connexion ou essayez d'actualiser en utilisant le bouton ci-dessous.</p>

                    <Button variant="outlined" onClick={() => {this.getQuestions()}} className="buttonRefresh" endIcon={<RefreshIcon/>} >Rafraîchir</Button>
                </div>
            )
        } else {
            const current = this.state.currentQuestion;
            const question = this.state.questions[current];
            const length = this.state.questions.length;

            // Check if the current question is the last one in the list
            var isLastOne = (current + 1) === length;

            const DisplayQuestion = () => {
                return renderQuestion(question, current, length);
            }

            return(
                <div className="container">
                    <DisplayQuestion/>
                </div>
            )
        }
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

    handleSurvey = (answers) => {
        console.log(answers);
    }

    render() {
        return(
            <div className='SurveyWrapper'>
                <div className="SurveyContainer">
                    <ProgressBar current={this.state.current} length={this.state.length} color={this.state.color}/>
                    <Wrapper sendProgress={this.loadProgress} sendSurvey={this.handleSurvey}/>
                </div>
            </div>
        )
    }
}

