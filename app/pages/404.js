import Image from "next/image";
import Head from "next/head";
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'


export default function Custom404() {

    const router = useRouter()

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     router.push(href)
    // }

    const Return = () => router.back();

    const Accueil = () => router.push('/');


    return (
        <div className="P404">

            <Head>
                <title>404 - Page Non Trouvée</title>
            </Head>

            <div className="Background">
                <Image className="BackgroundImage" src={"/../public/image/background.png"} alt="background" layout='fill' objectFit='cover'/>
            </div>

            <div className="T404">
                <h1 className="Code">404</h1>
                <p className="Title">Page Non Trouvée</p>

                <p className="Description">
                    Oups, il semble que le développeur dormait quand il a dû créer cette page, ou peut-être qu'elle n'existe pas. Mais pas de soucis, vous pouvez toujours aller sur la page d'accueil.
                </p>

                <div className="Buttons">
                    <Button className="TextButton" variant="text" onClick={Return}>Revenir</Button>
                    <Button className="PrimaryButton" variant="primary" onClick={Accueil}>Accueil</Button>
                </div>
            </div>
        </div>
    )
  }