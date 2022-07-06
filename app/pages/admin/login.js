import Image from 'next/image';
import Head from 'next/head';
import LoginComponent from '../../components/admin/login'; 
import Header from '../../components/header/header';

export default function Login() {
    return(
        <div className="Login">
            <Head>
                <title>NTIC Rabat - Connection Admin</title>
            </Head>

            <div className="Background">
                <div className="BackgroundImage">
                    <Image
                        src={"/image/background.png"}
                        alt="Background image"
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
            </div>

            <div className="LoginContainer">
                <div className="wrapper">
                    <LoginComponent />
                </div>
            </div>

            <Header type='login'/>
        </div>
    )
} 