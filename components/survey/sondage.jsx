
import ProgressBar from './imports/progressBar';
import Bienvenue from './imports/welcome';

import Choose from './imports/types/choose';
import Reacts from './imports/types/react';
import Affirm from './imports/types/affirm';


function Wrapper() {
    return (
        <div className="container">
            <Reacts/>
        </div>
    )
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