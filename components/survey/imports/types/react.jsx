import Button from '@mui/material/button';



import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


export default function Reacts() {
    return (
        <div className="React">

            <div className="Question">
                <p className="Question-index">Question 1</p>

                <p className="Question-description">Dans quelle mesure êtes-vous d'accord ou en désaccord avec l’énoncé suivant?</p>

                <h2 className="Question-title">
                    Mes professeurs expliquent les choses d'une manière que je comprends
                </h2>

                <p className="Question-description">Tout à gauche signifie fortement en désaccord et tout à droite signifie fortement d'accord.</p>
            </div>

            <div className="Answers">
                <div className="Answer Big">
                    <SentimentVeryDissatisfiedIcon/>
                </div>

                <div className="Answer Medium">
                    <SentimentDissatisfiedIcon/>
                </div>

                <div className="Answer Small">
                    <SentimentNeutralIcon/>
                </div>

                <div className="Answer Medium">
                    <SentimentSatisfiedAltIcon/>
                </div>

                <div className="Answer Big">
                    <SentimentVerySatisfiedIcon/>
                </div>
            </div>

            <div className="Buttons">
                <Button variant="text" className='btnText'>Précédent</Button>
                <Button variant="primary" className='btnPrimary'>Suivant</Button>
            </div>

        </div>
    )
}