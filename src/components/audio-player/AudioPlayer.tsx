import React, { useRef, useState, useEffect } from "react";
import "/src/App.css";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const songs = [
    {
      title: "⏸ TITLE - This is my song name",
      src: "the-second-sancturay.mp3",
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, []);

  return (
    <div className="player-container">
      <h2>DASC UABCS - MP3 Player</h2>
      <ul className="playlist">
        {songs.map((song, index) => (
          <li
            key={index}
            className={index === currentSongIndex ? "active" : ""}
          >
            {song.title}
          </li>
        ))}
      </ul>

      {/* Barra de controles horizontal */}
      <div className="player-bar">
        <div className="controls">
          <button
            aria-label="Anterior"
            onClick={() =>
              setCurrentSongIndex((prev) =>
                prev === 0 ? songs.length - 1 : prev - 1
              )
            }
            title="Anterior"
          >
            {/* Previous (double-triangle left) */}
            <svg className="icon" viewBox="0 0 24 24" aria-hidden>
              <path d="M11.5 12L18 17.5V6.5L11.5 12zM5 17.5V6.5L11.5 12 5 17.5z" />
            </svg>
          </button>
          <button aria-label={isPlaying ? "Pausar" : "Reproducir"} onClick={togglePlay} title={isPlaying ? "Pausar" : "Reproducir"}>
            {isPlaying ? (
              <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            ) : (
              <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            aria-label="Siguiente"
            onClick={() =>
              setCurrentSongIndex((prev) =>
                prev === songs.length - 1 ? 0 : prev + 1
              )
            }
            title="Siguiente"
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden>
              <path d="M12.5 12L6 17.5V6.5L12.5 12zM18 17.5V6.5L12.5 12 18 17.5z" />
            </svg>
          </button>
        </div>

        <div className="progress-wrapper">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration ? duration.toString() : "0"}
            value={currentTime}
            onChange={handleSeek}
            step="0.1"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="volume">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden>
            <path d="M3 10v4h4l5 5V5L7 10H3z" />
            <path d="M16.5 8.5a4.5 4.5 0 010 7" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M19 6a7 7 0 010 12" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
          />
        </div>
      </div>

      <audio ref={audioRef} src={songs[currentSongIndex].src}></audio>
    </div>
  );
};

export default AudioPlayer;