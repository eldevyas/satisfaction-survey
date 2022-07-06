import Image from 'next/image';
import Button from '@mui/material/Button';
import Router from 'next/router';


const DefaultHomeHeader = () => {
    return (
        <>
            <div className="Header">
                <div className="HeaderContentLeft">

                <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50} onClick={function() { Router.push('/') }}/>

                <div className="NavigationLinks">
                    <div>
                    <Button
                    variant="text"
                    className="LinkButton"
                    onClick={function() { Router.push('/') }}
                    >
                        Accueil
                    </Button>

                    <Button
                    variant="text"
                    className="LinkButton"
                    >
                        Emplois
                    </Button>

                    <Button
                    variant="text"
                    className="LinkButton"
                    >
                        Contact
                    </Button>

                    <Button
                    variant="text"
                    className="LinkButton"
                    >
                        à propos
                    </Button>
                    </div>
                </div>

                </div>

                <div className="HeaderContentRight">
                    <Button 
                    variant="text"
                    className="TextButton"
                    onClick={function() { Router.push('/sondage') }}
                    >
                        Enquête
                    </Button>
                    <Button 
                    variant="primary"
                    className="PrimaryButton"
                    onClick={function() { Router.push('/admin/login') }}
                    >
                        Administration
                    </Button>
                </div>
            </div>
        </>
    )
}

const DefaultLoginHeader = () => {
    return (
        <>
            <div className="Header">
                <div className="HeaderContentLeft">
                    <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110 * 0.75} height={50 * 0.75} onClick={function() { Router.push('/') }}/>
                </div>

                <div className="HeaderContentRight">
                    <div className="NavigationLinks">
                        <div>
                        <Button
                        variant="text"
                        className="LinkButton"
                        onClick={function() { Router.push('/') }}
                        >
                            Accueil
                        </Button>

                        <Button
                        variant="text"
                        className="LinkButton"
                        >
                            Emplois
                        </Button>

                        <Button
                        variant="text"
                        className="LinkButton"
                        >
                            Contact
                        </Button>

                        <Button
                        variant="text"
                        className="LinkButton"
                        >
                            à propos
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default function DesktopHeader(props) {
    switch (props.type) {
        case 'home':
            // console.log('DesktopHeader: Home | props: ', props);
            return <DefaultHomeHeader/>;
        case 'login':
            // console.log('DesktopHeader: Login | props: ', props);
            return <DefaultLoginHeader/>;
        default:
            // console.log('DesktopHeader: Default | props: ', props);
            return <DefaultHomeHeader/>;
    }
}