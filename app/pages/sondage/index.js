import Image from 'next/image';
import Sondage from '/components/survey/sondage';
import Head from 'next/head';

export default function Enquête() {
    return (
        <div className="Survey">
            <Head>
                <title>NTIC Rabat - Sondage</title>
            </Head>

            <div className="Background">
                <Image priority="false" className="BackgroundImage" src={"/image/background.png"} alt="background" layout='fill' objectFit='cover'/>
            </div>

            <Sondage/>
        </div>
    )
}