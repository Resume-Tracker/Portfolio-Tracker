from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.types import CHAR

# TODO: decide proper place for db
engine = create_engine('sqlite:///database.db', echo=True)
Base = declarative_base()


class Pageloads(Base):
    __tablename__ = 'pageloads'
    id = Column(CHAR(32), primary_key=True)
    timestamp = Column(DateTime, nullable=False)
    page_name = Column(String(50), nullable=False)
    company = Column(String(50), nullable=True)
    page_end = Column(DateTime, nullable=True)


class Users(Base):
    __tablename__ = 'users'
    name = Column(String(), primary_key=True)
    password = Column(String(), nullable=False)

Base.metadata.create_all(engine)

# test