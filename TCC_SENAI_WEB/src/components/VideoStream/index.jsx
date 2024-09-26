import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import error from "/error.png"
import io from "socket.io-client";

const socket = io('http://10.196.20.68:5000', {
  rejectUnauthorized: false
});

const VideoStream = ({ crrProcess }) => {
  const [image, setImage] = useState("");
  const [sentData, setSentData] = useState({camera_id: 0, frame: 0 })

  const errorChange = () => {
    setImage(error);
  }

  useEffect(() => {
    socket.on("video_frame", (data) => {
      setSentData(data);
      setImage(`data:image/jpeg;base64,${data.frame}`);
    });

    return () => {
      socket.off("video_frame");
    };
  }, []);

  return <img src={sentData.camera_id == crrProcess ? image : 0} alt="Vídeo" className={styles.cam} onError={errorChange} />;
};

export default VideoStream;