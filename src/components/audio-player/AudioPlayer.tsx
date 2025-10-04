import { useRef } from 'react';

const AudioPlayer = () => {
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const handlePlay = () => {
    audioElement.current?.play();
  }
  const handlePause = () => {
    audioElement?.current?.pause();
  }
  return (
    <>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <audio ref={audioElement} src="/spongebob-stinky.mp3" />
    </>
  )
}

export default AudioPlayer;