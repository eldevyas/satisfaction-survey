import React from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Router from 'next/router';


// Header Instances
import DesktopHeader from './imports/DesktopHeader';
import MobileHeader from './imports/MobileHeader';

class ResponsiveHeader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDesktop: false,
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

        let type = this.props.styles.type;
            
        return (
            <div>
            {isDesktop ? <DesktopHeader type={type}/> : <MobileHeader type={type}/>};
            </div>
        );
    }
}



export default function Header(styles) {
    return(
      <ResponsiveHeader styles={styles}/>
    )
}