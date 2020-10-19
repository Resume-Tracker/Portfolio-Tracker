from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, DateTime
# TODO: Add path to table
engine = create_engine('sqlite://<path_to_DB>', echo = True)
meta = MetaData()

# TODO: Add tables here in PT-5

meta.create_all(engine)