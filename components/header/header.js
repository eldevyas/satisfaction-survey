import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';


class ResponsiveHeader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDesktop: false
      };
  
      this.updatePredicate = this.updatePredicate.bind(this);
    }
    componentDidMount() {
      this.updatePredicate();
      window.addEventListener("resize", this.updatePredicate);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
    }
  
    updatePredicate() {
      this.setState({ isDesktop: window.innerWidth > 1000 });
    }
  
    render() {
      const isDesktop = this.state.isDesktop;

      // Function to handle the clicked Menu Button
        const handleMenuButtonClick = (e) => {
            let Btn = e.currentTarget;

            // Toggle the class of the button
            Btn.classList.toggle("Open");

            // Close the menu
            let Menu = document.getElementById("Menu");
            Menu.classList.toggle("OpenMenu");
        }
  
      return (
        <div>
          {isDesktop ? (
            <div className="Header">
                <div className="HeaderContentLeft">
    
                <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50}/>
    
                <div className="NavigationLinks">
                    <div>
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
                    </div>
                </div>
    
                </div>
    
                <div className="HeaderContentRight">
                    <Button 
                    variant="text"
                    className="TextButton"
                    >
                        Sondage
                    </Button>
                    <Button 
                    variant="primary"
                    className="PrimaryButton"
                    >
                        Administration
                    </Button>
                </div>
            </div>
          ) : (
            <div className="MobileHeader">
                <div className="Logo">
                    <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50}/>
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
                        >
                            Sondage
                        </Button>

                        <Button
                        variant="primary"
                        className="PrimaryButton"
                        >
                            Administration
                        </Button>
                    </div>
                </div>
            </div>
          )}
        </div>
      );
    }
}



export default function Header(styles) {
    return(
      <ResponsiveHeader styles={styles}/>
    )
}