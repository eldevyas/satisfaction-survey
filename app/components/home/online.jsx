import React, { useEffect, useState } from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import io from 'Socket.IO-client'
let socket;



export default function OnlineUsers() {
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
    return (
        <>
            <div className="Current_users">
                <div className="Current_users_container" title="Current users online.">
                    <SupervisedUserCircleIcon />
                    <h1>{online}</h1>
                </div>
            </div>
        </>
    );
}