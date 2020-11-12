from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

# TODO: decide proper place for db
engine = create_engine('sqlite:///database.db', echo=True)
Base = declarative_base()


class Pageloads(Base):
    __tablename__ = 'pageloads'
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, nullable=False)
    page_name = Column(String(50), nullable=False)
    company = Column(String(50), nullable=True)


Base.metadata.create_all(engine)

# test