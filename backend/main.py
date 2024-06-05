from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import uvicorn
import datetime
from typing import List

from database import SessionLocal, engine, Base, Song as DBSong

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:8080",  # React frontend URL
    "http://127.0.0.1:8080",  # React frontend URL
    "http://dsmoove1.com:8080",
    # Add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Pydantic model to parse the request body
class SongRequest(BaseModel):
    userName: str
    songName: str
    artistName: str


class SongResponse(BaseModel):
    id: int
    userName: str
    songName: str
    artistName: str
    date: datetime.datetime

    class Config:
        orm_mode = True


@app.post("/song-request")
async def create_song_request(song_request: SongRequest, db: Session = Depends(get_db)):
    db_song = DBSong(
        userName=song_request.userName,
        songName=song_request.songName,
        artistName=song_request.artistName,
        date=datetime.datetime.utcnow(),  # Set the current date
    )
    db.add(db_song)
    db.commit()
    db.refresh(db_song)
    return {"message": "Song request submitted successfully", "data": db_song}


@app.get("/songs", response_model=List[SongResponse])
async def get_songs(db: Session = Depends(get_db)):
    songs = db.query(DBSong).all()
    return songs


# Example endpoint to check if the server is running
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Song Request API"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
