import React from 'react';
import Button from '@mui/material/Button';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';


export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false
        };

        // Hide & show password icon
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    
    render() {
        return(
            <div className="Form">
                <form className="Form-group">
                    <div className="Input Username">
                        <div className="Input-icon">
                            <AccountCircleIcon />
                        </div>
                        <input type="username" className="form-control" placeholder="Nom d'utilisateur" required></input>
                    </div>
                    <div className="Input Password">
                        <div className="Input-icon">
                            <LockIcon />
                        </div>
                        <input type={this.state.showPassword ? 'text' : 'password'} className="form-control" placeholder="Mot de passe" required></input>
                        <div className="Visibility" onClick={this.handleClickShowPassword}>
                            {this.state.showPassword ? <VisibilityOff title='Cacher'/> : <VisibilityOn title='Montrer'/>}
                        </div>
                    </div>

                </form>

                <div className="RememberMe">
                    <label className="cont">
                        <input type="checkbox"/>
                        <span></span>
                    </label>

                    Se souvenir de moi
                </div>

                <Button
                    variant="primary"
                    className= "btnPrimary"
                >
                    Se Connecter
                </Button>
            </div>
        )
    }
}