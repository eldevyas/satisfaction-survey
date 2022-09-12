import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Merci(props) {

    return(
        <div className="Merci">
            <div className="Text">
                <div className="Bienvenue-image">
                    <Image  src={"/image/MailIcon.png"} alt="chartIcon" layout='fill' objectFit='cover'/>
                </div>
                <h1>Merci!</h1>
                <p>Nous avons reçu vos commentaires, vous avez contribué à faire de l'institut un meilleur environnement d'apprentissage.</p>
            </div>

            <div className="Buttons">
                <Link scroll={false} href="/">
                    <Button variant="text" className='btnText'>évaluer</Button>
                </Link>

                <Link scroll={false} href="/">
                    <Button variant="primary" className='btnPrimary'>Accueil</Button>
                </Link>
            </div>
        </div>
    )
}   