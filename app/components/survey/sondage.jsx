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

import { pushFailure , pushSuccess, pushWarning} from './../../services/alert';





class Wrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null,
            currentQuestion: null,
            answers: [],
            loading: true
        };

        this.timer = null;

        this.timeSpent = 0;
    }

    getQuestions = () => {
        this.setState({
            loading: true
        });


        let URL = "https://api.jsonbin.io/v3/b/62c97a915d53821c30966f4a/latest"; // URL of the API used for exprimental purposes
        URL = "http://localhost/Satisfaction-Survey/server/public/survey/questions"; // Real Server API

        axios.get(URL)
            .then(response => {
                console.log(response.data);
                setTimeout(() => {
                    this.setState({
                        questions: response.data,
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


    startTimer = () => {
        // Start the timer
        this.timer = setInterval(() => {
            this.timeSpent++;
        }, 1000);
        
        // If the window is on blur or closed, stop the timer
        window.addEventListener('blur', () => {
            clearInterval(this.timer);
        }, false);

        window.addEventListener('beforeunload', () => {
            clearInterval(this.timer);
        }, false);
    };

    stopTimer = () => {
        clearInterval(this.timer);
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

        // Start a timer to count down the time  of the survey
        this.startTimer();
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

            // Add Time Spent to the answers array with its own key "Duration"
            
            let surveyAnswers = {};

            surveyAnswers.Duration = this.timeSpent;
            surveyAnswers.Answers = this.state.answers;

            this.props.sendSurvey(surveyAnswers);
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
        // add duration to the answers
        console.log(answers);

        // API URL
        let URL = "http://localhost/Satisfaction-Survey/server/public/survey/add"
        

        // axios POST request
        const options = {
            url: URL,
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
            },
            data: answers
        };

        axios(options)
        .then(response => {
            console.log(response.status);

            if (response.status === 200) {
                console.log("Survey sent!");
                pushSuccess("Votre sondage a bien été envoyé!");
            } else {
                console.log("Error sending survey!");
                pushFailure("Erreur lors de l'envoi du sondage!");
            }


        })
        .catch(error => {
            console.log(error);
            pushFailure(error.message);
        });

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

