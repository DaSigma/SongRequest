// import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const Songs = ({ songs }) => {

  return (
    <div>
      <h2>Songs</h2>
      <table className="table">
        <thead className="thead">
          <tr className="bg-primary">
            <th className="bg-primary">User</th>
            <th className="bg-primary">Song</th>
            <th className="bg-primary">Artist</th>
            <th className="bg-primary">Request Date</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.userName}</td>
              <td>{song.songName}</td>
              <td>{song.artistName}</td>
              <td>{format(song.date, "MMMM do yyyy, h:mm a")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Songs;
