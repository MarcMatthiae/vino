import { useRef, useState } from "react";
import YouTube from "react-youtube";

const YoutubeEmbedReact = ({ embedId }: { embedId: string }) => {
  const [player, setPlayer] = useState<any>(null); // Player instance

  // Options for the YouTube player
  const opts = {
    height: "800",
    width: "1024",
    playerVars: {
      autoplay: 0, // Do not Auto-play the video
    },
  };

  // Called when the YouTube player is ready
  const onReady = (event: any) => {
    setPlayer(event.target); // Set player instance on ready
  };

  // Handle fullscreen request
  const requestFullscreen = () => {
    if (player && player.getIframe()) {
      const iframe = player.getIframe();
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen(); // For Firefox
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen(); // For Safari
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen(); // For IE/Edge
      }
    }
  };

  // Trigger fullscreen when the video starts playing
  const onPlay = (event: any) => {
    requestFullscreen();
  };

  return (
    <div className="flex justify-center">
      <YouTube
        videoId={embedId}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay} // Call fullscreen when the video starts playing
      />
    </div>
  );
};

export default YoutubeEmbedReact;
