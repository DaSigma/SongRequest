// import React, { useEffect, useState } from "react";

const Songs = ({ songs }) => {

  return (
    <div>
      <h2>Songs</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.userName} requested "{song.songName}" by {song.artistName} on{" "}
            {new Date(song.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Songs;
