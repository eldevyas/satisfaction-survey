// Required modules and components
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';

const image = {
    url: '/image/Image.png',
    alt: 'Stagiaire remplissant des champs de formulaire.',
    width: 649.78,
    height: 622.48
}

export default function LandingPage() {
    return (
      <div className="LandingPage">
        <div className="LandingText">
            <h1>Améliorez l’institut en remplissant une enquête <span>simple</span></h1>

            <p>
                C’est une enquéte de satisfaction pour aider l’administration à améliorer l’expérience éducationnel de votre institut NTIC Rabat, soyez libres d’éssayer.
            </p>

            <Link scroll={false} href='/sondage/'>
                <Button variant="contained" className="Button">
                    Démarrer l'enquête
                </Button>
            </Link>
        </div>

        <div className="LandingImage">
            <div className="Image">
                <Image priority='false' src={image.url} alt={image.alt}  layout="fill" objectFit='contain'/>
            </div>
        </div>
      </div>
    )
}