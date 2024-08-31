import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Songs = ({ songs }) => {
  // Function to get unique dates from the songs array
  const getUniqueDates = (songs) => {
    const uniqueDates = songs.map((song) => format(song.date, "MMMM dd yyyy"));
    return [...new Set(uniqueDates)];
  };

    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };
    // Filter songs by the selected date
    const filteredSongs = selectedDate
      ? songs.filter(
          (song) => format(song.date, "MMMM dd yyyy") === selectedDate
        )
      : songs;


  return (
    <div>
      <div className="mb-3">
        <label htmlFor="dateFilter" className="form-label">
          Filter by Date:
        </label>
        <select
          id="dateFilter"
          className="form-select"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="">All Dates</option>
          {getUniqueDates(songs).map((date) => (
            <option key={date} value={date}>
              {format(date, "MMMM do yyyy")}
            </option>
          ))}
        </select>
      </div>
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
          {filteredSongs.map((song) => (
            <tr key={song.id}>
              <td>{song.userName}</td>
              <td>{song.songName}</td>
              <td>{song.artistName}</td>
              <td>{formatInTimeZone(song.date, timeZone, "MMMM do yyyy, h:mm a")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Songs;
