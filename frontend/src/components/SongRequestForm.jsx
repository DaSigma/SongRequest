// src/components/SongRequestForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";


const SongRequestForm = ({ onRequestSubmitted }) => {
  const [userName, setUserName] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName,
      songName,
      artistName,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/song-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Song request submitted successfully");
        onRequestSubmitted();
        history.push("/songs"); // Redirect to the songs page
      } else {
        console.error("Failed to submit song request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Clear the form fields
    setUserName("");
    setSongName("");
    setArtistName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Song Name:
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Artist Name:
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default SongRequestForm;
