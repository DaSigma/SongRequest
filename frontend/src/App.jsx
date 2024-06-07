// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SongRequestForm from "./components/SongRequestForm";
import Songs from "./components/Songs";

function App() {
  const [songs, setSongs] = useState([]);

  const fetchSongs = () => {
    fetch("https://api.dsmoove1.com/songs")
    // fetch("http://localhost:8000/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>D-Smoove</h2>
          <h1>Song Request App</h1>
        </header>
        <Switch>
          <Route exact path="/">
            <SongRequestForm onRequestSubmitted={fetchSongs} />
          </Route>
          <Route path="/songs" element={<Songs />}>
            <Songs songs={songs} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
