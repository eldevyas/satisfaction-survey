
// Importing All of the Components from the imports Folder. 
import LandingPage from './imports/landingPage';
import Widget from './imports/widget';
import Header from './../header/header'

export default function Content() {
    return (
    <>
        <Header/>
        <div className="Home">
            <LandingPage />
            <Widget/>
        </div>
    </>
    )
}