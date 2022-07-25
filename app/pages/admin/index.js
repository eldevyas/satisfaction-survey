import { Component } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Header from '../../components/header/header';
import { useRouter } from 'next/router';
import Admin from '../../components/admin/admin';

export default class AdminPage extends Component {
    
    render() {
        return (
            <>
                <div className="AdminPage">
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
                </div>
            </>
        )
    }

}