import { useContext, useEffect, useState } from 'react';
import { Navigate,useLocation} from "react-router-dom"
import Image from 'next/image';
import Head from 'next/head';
import Header from '../../components/header/header';
import { useRouter } from 'next/router';
import Admin from '../../components/admin/admin';
import Button from '@mui/material/Button';
import { push } from '/services/alert'
 
import AuthContext from '../../contexts/authContext';


// Importing components from components folder
import Dashboard from '/components/admin/dashboard';


export default function AdminPage() {
    const Context = useContext(AuthContext);
    const router = useRouter();

    const [ fullName, setFullName ] = useState('');
    const [ firstName, setFirstName ] = useState('');

    // console.log(Context.user.full_name);

    useEffect(() => {
        if (Context.user === null) {
            router.push('/admin/login');
        } else{
            setFullName(Context.user.full_name);
            setFirstName(Context.user.first_name);
        }
    }, []);

    const Disconnect =  () => {
        Context.logout();
    }

    return(
        <>
        <div className="DashboardPage">
            <Head>
                <title>NTIC Rabat - Tableau du bord</title>
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

            <Dashboard />

        </div>
    </>
    )
}