# Add the parent path to the import path
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ptracker import app as flask_app
from db import engine, Pageloads

import pytest

# Needed to test events are being correctly inputted
from datetime import datetime
from sqlalchemy.orm import sessionmaker

import json

@pytest.fixture
def app():
    """Define flask a a prerequisite for pytest functions taking app as an arg"""
    yield flask_app


@pytest.fixture
def client(app):
    """Define the flask test harness as a prerequisite for pytest functions taking client as an arg"""
    return app.test_client()


def test_addrow_png(app, client):
    """Test that addrow returns a PNG"""
    res = client.get('/addrow')
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # Web browsers need to be told the content type
    # Check that we are providing it
    assert res.headers['Content-Type'] == 'image/png'
    # Check that the returned data has a valid PNG magic.
    # Checking if the PNG parses is not really worthwile here
    assert res.get_data().startswith(b'\x89PNG\r\n')

def test_addrow_db(app, client):
    """Test that addrow adds a DB row"""
    # This is the wrong way to invoke SQL alchemy
    # TODO: move sessionmaker into db.py
    session = sessionmaker(bind=engine)()
    start = datetime.utcnow()
    res = client.get('/addrow')
    stop = datetime.utcnow()
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # In this case `one()` acts as an assertion
    # The one call can only return one entry or an error
    # It cannot return 0 or 2
    session.query(Pageloads).filter(
            Pageloads.timestamp.between(start, stop)
        ).one()

def test_addrow_org_db(app, client):
    """Test that addrow adds a DB row with the correct organization"""
    # This is the wrong way to invoke SQL alchemy
    # TODO: move sessionmaker into db.py
    session = sessionmaker(bind=engine)()
    start = datetime.utcnow()
    res = client.get('/addrow', headers={'X-Real-IP':'128.114.119.88'})
    stop = datetime.utcnow()
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # In this case `one()` acts as an assertion
    # The one call can only return one entry or an error
    # It cannot return 0 or 2
    assert session.query(Pageloads).filter(
            Pageloads.timestamp.between(start, stop)
        ).one().company == "ucsc.edu"

def test_pageloads_json(app, client):
    """Test that pageloads returns JSON

    Seeing that the format of pageloads is still up in the air I won't test it here
    TODO: Test content and formatting
    """
    res = client.get('/pageloads')
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # Check that we are providing content type
    # There are two valid MIME types for JSON
    assert res.headers['Content-Type'] in ['application/json', 'text/json']
    # Parse the data to see if it is compliant
    json.loads(res.get_data(as_text=True))