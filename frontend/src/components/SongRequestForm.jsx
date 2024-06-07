// src/components/SongRequestForm.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";




const SongRequestForm = ({ onRequestSubmitted }) => {
  const [userName, setUserName] = useState("");
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName,
      songName,
      artistName,
    };

    try {
      const response = await fetch(
        "https://api.dsmoove1.com/song-request",
        // "http://localhost:8000/song-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Song request submitted successfully");
        setIsSubmitted(true)
        onRequestSubmitted();
        // history.push("/songs"); // Redirect to the songs page
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
    setOpen(true);
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
      <button type="submit" className="btn btn-info">
        Submit Request
      </button>
      {isSubmitted && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            <AlertTitle>Success</AlertTitle>
            Song Request Submitted!.
          </Alert>
        </Snackbar>
      )}
    </form>
  );
};

export default SongRequestForm;
