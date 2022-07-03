import Image from 'next/image';
import Button from '@mui/material/button';
import Link from 'next/link';

export default function Bienvenue() {
    return(
        <div className="Bienvenue">
            <div className="Text">
                <div className="Bienvenue-image">
                    <Image  src={"/image/ChartIcon.png"} alt="chartIcon" layout='fill' objectFit='cover'/>
                </div>
                <h1>Bienvenue au sondage!</h1>
                <p>Vous pouvez commencer, ça coute rien que 2 minutes de votre temps.</p>
            </div>

            <div className="Buttons">
                <Link href="/">
                    <Button variant="text" className='btnText'>Accueil</Button>
                </Link>
                <Button variant="primary" className='btnPrimary'>Commencer</Button>
            </div>
        </div>
    )
}