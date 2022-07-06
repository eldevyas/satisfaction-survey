import Image from 'next/image';
import Button from '@mui/material/Button';
import Router from 'next/router';



const DefaultHomeHeader = () => {
    // Function to handle the clicked Menu Button
    const handleMenuButtonClick = (e) => {
        let Btn = e.currentTarget;

        // Toggle the class of the button
        Btn.classList.toggle("Open");

        // Close the menu
        let Menu = document.getElementById("Menu");
        Menu.classList.toggle("OpenMenu");
    }

    return(
        <div className="MobileHeader">
            <div className="Logo">
                <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50} onClick={function() { Router.push('/') }}/>
            </div>

            <div className="MenuIcon">
                <div className="HamburgerMenu OpenMenu" id='MenuBtn' onClick={handleMenuButtonClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="Menu" id='Menu'>
                <div className="MenuContent">
                    <Button
                    variant="text"
                    className="LinkButton"
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
        </div>
    )
}

const DefaultLoginHeader = () => {
    // Function to handle the clicked Menu Button
    const handleMenuButtonClick = (e) => {
        let Btn = e.currentTarget;

        // Toggle the class of the button
        Btn.classList.toggle("Open");

        // Close the menu
        let Menu = document.getElementById("Menu");
        Menu.classList.toggle("OpenMenu");
    }

    return(
        <div className="MobileHeader">
            <div className="Logo">
                <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50} onClick={function() { Router.push('/') }}/>
            </div>

            <div className="MenuIcon">
                <div className="HamburgerMenu OpenMenu" id='MenuBtn' onClick={handleMenuButtonClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="Menu" id='Menu'>
                <div className="MenuContent">
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
    )
}


export default function MobileHeader(props)  {
    switch (props.type) {
        case 'home':
            return <DefaultHomeHeader/>;
        case 'login':
            return <DefaultLoginHeader/>;
        default:
            return <DefaultHomeHeader/>;
    }
}