
// Importing All of the Components from the imports Folder. 
import Header from './../header/header'
import LandingPage from './imports/landingPage';
import Widget from './imports/widget';
import Section from './imports/section';
import Section_2 from './imports/section_2';
import Footer from './imports/footer';

export default function Content() {
    return (
    <>
        <Header/>
        <div className="Home">
            <LandingPage />
            <Widget/>
            <Section/> 
            <Section_2/>
        </div>
        <Footer/>
    </>
    )
}