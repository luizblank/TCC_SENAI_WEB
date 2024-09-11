import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import error from "/error.png"
import io from "socket.io-client";

// const socket = io("http://10.196.49.4:5000");

const VideoStream = () => {
    // const [image, setImage] = useState("");

    // const errorChange = () => {
    //     setImage(error);
    // }

    // useEffect(() => {
    // socket.on("video_feed", (frameBase64) => {
    //     setImage(`data:image/jpeg;base64,${frameBase64}`);
    // });

    // return () => {
    //     socket.off("video_feed");
    // };
    // }, []);

    // return <img src={image} alt="Vídeo" className={styles.cam} onError={errorChange}/>;
};

export default VideoStream;
