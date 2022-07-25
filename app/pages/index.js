import Head from 'next/head'
import Image from 'next/image'
import Content from './../components/home/home';
import { useContext } from 'react';
import AuthContext from '../contexts/authContext';

export default function Home() {
    const Value  = useContext(AuthContext);
    console.log(Value);

    return (
        <div className="Container">
            <Head>
                <title>NTIC Rabat - Satisfaction</title>
            </Head>

            <div className="Background">
                <Image className="BackgroundImage" src={"/image/background.png"} alt="background" layout='fill' objectFit='cover'/>
            </div>
            
            <Content />
        </div>
    )
}
