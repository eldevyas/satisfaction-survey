import React from 'react';
import Image from 'next/image'


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
        }
  
      return (
        <div>
          {isDesktop ? (
            <div className="Header">
                <div className="HeaderContentLeft">
    
                <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50}/>
    
                <div className="NavigationLinks">
                    <div>
                    <a>Accueil</a>
                    <a>Emplois</a>
                    <a>Contact</a>
                    <a>à propos</a>
                    </div>
                </div>
    
                </div>
    
                <div className="HeaderContentRight">
                <div className="HeaderButtonSecondary">
                    Sondage
                </div>
    
                <div className="HeaderButtonPrimary">
                    Administration
                </div>
                </div>
            </div>
          ) : (
            <div className="MobileHeader">
                <div className="Logo">
                    <Image className="Logo" src={"/../public/logo.png"} alt="logo" width={110} height={50}/>
                </div>

                <div className="Menu">
                    <div className="HamburgerMenu OpenMenu" id='MenuBtn' onClick={handleMenuButtonClick}>
                        <span></span>
                        <span></span>
                        <span></span>
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