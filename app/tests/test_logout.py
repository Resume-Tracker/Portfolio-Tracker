import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ptracker import app as flask_app
from db import engine, Pageloads, Sessions

import pytest

from datetime import datetime, timedelta
from sqlalchemy.orm import sessionmaker
 
@pytest.fixture
def app():
    """Define flask a a prerequisite for pytest functions taking app as an arg"""
    yield flask_app


@pytest.fixture
def client(app):
    """Define the flask test harness as a prerequisite for pytest functions taking client as an arg"""
    return app.test_client()

def test_logout(app, client):
    """ Test that the logout method removes client's session entry in the sessions
        table and session cookie
    """
    db_session = sessionmaker(bind=engine)()

    # Clear data before running
    # Errors are not checked here if there is a database error I want to know about it
    # Ignoring a failure to delete the DB may break this test
    db_session.query(Pageloads).delete()
    db_session.query(Sessions).delete()

    # Add a session entry into the sessions table
    session_id = '9c0e2d63a7ed4a7fbfbfdaa2637fe2f4'
    session = Sessions(
            id=session_id,
            username='testuser',
            session_expire=datetime.utcnow()+timedelta(hours=1)
        )
    db_session.add(session)
    db_session.commit()
    db_session.close()

    # Set the session cookie for the client
    client.set_cookie('localhost', 'session', session_id)

    # Send a GET request to the logout endpoint
    res = client.get('/logout')

    # Check if the logout endpoint returns 200 OK
    assert res.status_code == 200

    # Check if the session entry is deleted
    db_session = sessionmaker(bind=engine)()
    session = db_session.query(Sessions).get(session_id)
    db_session.close()
    # query should return None
    assert session == None

    # Check if the session cookie for the client is removed
    # Get all cookies set in the last request
    cookie_setters = [header[1] for header in res.headers if header[0] == 'Set-Cookie']
    # Get all session cookies set
    session_ids = [cookie for cookie in cookie_setters if cookie.startswith('session=')]
    # sessions_ids should only have 1 session
    assert len(session_ids) == 1
    session_id = session_ids[0]
    # remove the cookie name
    session_id = session_id.replace('session=','')
    # remove the cookie path
    session_id = session_id.split(';')[0]
    # session_id should be an empty string
    assert session_id == ''
