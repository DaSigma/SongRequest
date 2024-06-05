from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

DATABASE_URL = "sqlite:///initial-db.sqlite"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)
    userName = Column(String, index=True)
    songName = Column(String, index=True)
    artistName = Column(String, index=True)
    date=datetime.datetime.utcnow()  # Set the current date


# Create the database tables
Base.metadata.create_all(bind=engine)
