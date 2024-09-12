import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://10.196.20.76:5001';

export default function CameraFeed() {
    const [socket, setSocket] = useState(null);
    const videoElementRef = useRef(null);

    useEffect(() => {
        const socketInstance = io(SOCKET_SERVER_URL, {
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });

        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Conectado ao servidor SocketIO');
        });

        socketInstance.on('disconnect', (reason) => {
            console.log('Desconectado do servidor SocketIO:', reason);
        });

        socketInstance.on('new_frame_camera_0', (data) => {
            if (videoElementRef.current) {
                videoElementRef.current.src = 'data:image/jpeg;base64,' + data.frame;
            }
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <img ref={videoElementRef} alt="Feed de vídeo da Câmera 0"/>
    );
}
