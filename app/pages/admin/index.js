import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from "react-router-dom"
import Image from 'next/image';
import Head from 'next/head';
import Header from '../../components/header/header';
import { useRouter } from 'next/router';
import Admin from '../../components/admin/admin';
import Button from '@mui/material/Button';
import { push } from '/services/alert'

import AuthContext from '../../contexts/authContext';

export default function AdminPage() {
    const Context = useContext(AuthContext);
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [firstName, setFirstName] = useState('');

    // console.log(Context.user.full_name);

    useEffect(() => {
        if (Context.user === null) {
            router.push('/admin/login');
        } else {
            setFullName(Context.user.full_name);
            setFirstName(Context.user.first_name);
        }
    }, [Context.user, router]);

    const Disconnect = () => {
        Context.logout();
    }

    const Dashboard = () => {
        push('En cours de développement.')
        router.push('/admin/dashboard');
    }

    return (
        <>
            <div className="AdminPage">
                <Head>
                    <title>NTIC Rabat - Espace Administration</title>
                </Head>

                <div className="Background">
                    <div className="BackgroundImage">
                        <Image
                            src={"/image/background.png"}
                            alt="Background image"
                            layout='fill'
                            objectFit='cover'
                            priority={true}
                        />
                    </div>
                </div>

                <div className='Content'>
                    <div className="Container">
                        <div className="row title">
                            <h1>
                                Bienvenue sur l'<span>éspace administration</span> NTIC Rabat,
                            </h1>


                            <p>
                                Content de te revoir, <span>{firstName}</span>.
                            </p>
                        </div>
                        <div className="row">
                            <Button
                                variant="primary"
                                className="btnSecondary"
                                onClick={Disconnect}
                            >
                                Se déconnecter
                            </Button>

                            <Button
                                variant="primary"
                                className="btnPrimary"
                                onClick={Dashboard}
                            >
                                Tableau de bord
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}