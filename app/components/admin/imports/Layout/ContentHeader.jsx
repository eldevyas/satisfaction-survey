// Required Modules for functionality.
import Image from 'next/image';
import Router from 'next/router';
//
// Third Party Components
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//
// Required Icons
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
// Required Functions and Services



export default function ContentHeader () {
    return(
        <div className="Content-Header">
            <div className="Content-Header-Label">
                <h4 className="Content-Header-Title">Bienvenue au tableau du bord</h4>
                <p className="Content-Header-Subtitle">Bonjour, Yassine. Content de te revoir!</p> 
            </div>

            <div className="Content-Header-User">
                <div className="Content-Header-User-Actions">
                    <Button aria-label="delete" className='Content-Header-User-Action' variant='primary'  style={{backgroundColor: '#fff', color: '#06BEE1'}}>
                        <LogoutIcon className='Content-Header-User-Action-Icon'/>
                    </Button>

                    <Button aria-label="delete" className='Content-Header-User-Action' variant='primary' style={{backgroundColor: '#fff', color: '#06BEE1'}}>
                        <NotificationsIcon className='Content-Header-User-Action-Icon Content-Header-User-Action-Icon-Notification'/>
                        <div className="Content-Header-User-Action-Notification-Wrapper">
                            <span className='Content-Header-User-Action-Notification-Indicator'></span>
                        </div>
                    </Button>
                </div>

                <div className="Content-Header-User-Avatar">
                    <div className='Content-Header-User-Avatar-Person' style={{backgroundImage: `url('/image/Avatar.png')`}}></div>
                </div>
            </div>
        </div>
    )
}