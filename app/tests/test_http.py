# Add the parent path to the import path
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ptracker import app as flask_app
from db import engine, Pageloads

import pytest

# Needed to test events are being correctly inputted
from datetime import datetime, timedelta
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


def test_addrow_js(app, client):
    """Test that addrow returns a PNG"""
    res = client.get('/addrow')
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # Web browsers need to be told the content type
    # Check that we are providing it
    assert res.headers['Content-Type'] == 'text/javascript'

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

def test_addrow_page_db(app, client):
    """Test that addrow adds a DB row"""
    # This is the wrong way to invoke SQL alchemy
    # TODO: move sessionmaker into db.py
    session = sessionmaker(bind=engine)()
    start = datetime.utcnow()
    res = client.get('/addrow', headers={
            'Referer': 'https://www.example.com/resume.html'
        })
    stop = datetime.utcnow()
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # In this case `one()` acts as an assertion
    # The one call can only return one entry or an error
    # It cannot return 0 or 2
    assert session.query(Pageloads).filter(
            Pageloads.timestamp.between(start, stop)
        ).one().page_name == 'https://www.example.com/resume.html'

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
    """Test that pageloads returns JSON with the correct pageload object
    """
    # Clear data before running
    session = sessionmaker(bind=engine)()
    # Errors are not checked here if there is a database error I want to know about it
    # Ignoring a failure to delete the DB may break this test
    session.query(Pageloads).delete()
    session.commit()

    start = datetime.utcnow()
    res = client.get('/addrow', headers={
            'X-Real-IP':'128.114.119.88',
            'Referer': 'https://www.example.com/resume.html'
        })
    stop = datetime.utcnow()
    assert res.status_code == 200
    res = client.get('/pageloads')
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # Check that we are providing content type
    # There are two valid MIME types for JSON
    assert res.headers['Content-Type'] in ['application/json', 'text/json']
    # Parse the data to see if it is compliant
    found_req = 0
    for req in json.loads(res.get_data(as_text=True)):
        timestamp = datetime.strptime(req['timestamp'], '%a, %d %b %Y %H:%M:%S %Z')
        match = (
                req['company'] == 'ucsc.edu' and
                req['page_name'] == 'https://www.example.com/resume.html'
            )
        if match:
            found_req += 1
    assert found_req == 1

def test_pageloads_bounded_json(app, client):
    """Test that pageloads with time bounds returns JSON with the correct pageload object
    """
    # Clear data before running
    session = sessionmaker(bind=engine)()
    # Errors are not checked here if there is a database error I want to know about it
    # Ignoring a failure to delete the DB may break this test
    session.query(Pageloads).delete()
    session.commit()

    start = datetime.utcnow()
    res = client.get('/addrow', headers={
            'X-Real-IP':'128.114.119.88',
            'Referer': 'https://www.example.com/resume.html'
        })
    stop = datetime.utcnow()
    assert res.status_code == 200

    # convert timings to bounds
    f_start = start.strftime('%Y-%m-%d%%20%H:%M:%S')
    f_stop = (
            # offset by 1 second to prevent instantaneous window
            stop+timedelta(seconds=1)
        ).strftime('%Y-%m-%d%%20%H:%M:%S')

    res = client.get(f'/pageloads?start_date={f_start}&end_date={f_stop}')
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # Check that we are providing content type
    # There are two valid MIME types for JSON
    assert res.headers['Content-Type'] in ['application/json', 'text/json']
    # Parse the data to see if it is compliant
    found_req = 0
    for req in json.loads(res.get_data(as_text=True)):
        timestamp = datetime.strptime(req['timestamp'], '%a, %d %b %Y %H:%M:%S %Z')
        match = (
                req['company'] == 'ucsc.edu' and
                req['page_name'] == 'https://www.example.com/resume.html'
            )
        if match:
            found_req += 1
    assert found_req == 1

def test_pageloads_per_company_bounded_json(app, client):
    """Test that pageloads_per_company with time bounds returns JSON with the correct pageload object
    """
    # Clear data before running
    session = sessionmaker(bind=engine)()
    # Errors are not checked here if there is a database error I want to know about it
    # Ignoring a failure to delete the DB may break this test
    session.query(Pageloads).delete()
    session.commit()

    start = datetime.utcnow()
    res = client.get('/addrow', headers={
            'X-Real-IP':'128.114.119.88',
            'Referer': 'https://www.example.com/resume.html'
        })
    stop = datetime.utcnow()
    assert res.status_code == 200

    # convert timings to bounds
    f_start = start.strftime('%Y-%m-%d%%20%H:%M:%S')
    f_stop = (
            # offset by 1 second to prevent instantaneous window
            stop+timedelta(seconds=1)
        ).strftime('%Y-%m-%d%%20%H:%M:%S')

    res = client.get(f'/pageloads_per_company?start_date={f_start}&end_date={f_stop}')
    # If the return code is not 200 something else may be wrong
    assert res.status_code == 200
    # Check that we are providing content type
    # There are two valid MIME types for JSON
    assert res.headers['Content-Type'] in ['application/json', 'text/json']
    # Parse the data to see if it is compliant
    found_req = 0
    data = json.loads(res.get_data(as_text=True))
    assert 'ucsc.edu' in data
    assert data['ucsc.edu'] == [1,0]
