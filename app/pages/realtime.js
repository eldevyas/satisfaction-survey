import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
import { pushSuccess } from '../services/alert';
let socket;

const Home = () => {
    const [online, setOnlineCount] = useState(0);

    useEffect(() => {
        socketInitializer();
    }, []);


    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()

        socket.on('connect', () => {
            console.log('connected')

            socket.on('online', (onlineUsers) => {
                console.log('online: ', onlineUsers)
                setOnlineCount(onlineUsers)
            })

            socket.on('disconnected', function() {
                setOnlineCount(online - 1);
            })
        })
    }

    return(
        <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'} }>
            <div style={{padding: 10, margin: 10, backgroundColor: '#000', color: 'white', marginBottom: 40}}>
                { online }
            </div>
        </div>
    );
}

export default Home;