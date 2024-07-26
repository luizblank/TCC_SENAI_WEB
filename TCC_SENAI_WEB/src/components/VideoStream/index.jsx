import styles from './styles.module.scss';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://10.196.20.68:5000');

const VideoStream = () => {
  const [image, setImage] = useState('');

  useEffect(() => {
    socket.on('video_feed', (frameBase64) => {
      setImage(`data:image/jpeg;base64,${frameBase64}`);
    });

    return () => {
      socket.off('video_feed');
    };
  }, []);

  return (
    <img src={image} alt="Video Feed" className={styles.cam} />
  );
};

export default VideoStream;
