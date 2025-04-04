import React from "react";

const VideoPlayer: React.FC = () => {
  return (
    <div className="video-container my-6">
      <video controls className="w-full rounded-lg shadow-lg">
        <source src="/videos/sample.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>
    </div>
  );
};

export default VideoPlayer;
