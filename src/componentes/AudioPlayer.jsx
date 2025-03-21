import { useEffect } from "react";

function AudioPlayer({ src }) {
  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();

    return () => audio.pause();
  }, [src]);

  return null;
}

export default AudioPlayer;