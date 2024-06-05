// import React, { useEffect, useState } from "react";

const Songs = ({ songs }) => {
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/songs")
//       .then((response) => response.json())
//       .then((data) => setSongs(data))
//       .catch((error) => console.error("Error fetching songs:", error));
//   }, []);

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
