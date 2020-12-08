import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ptracker import app as flask_app
from db import engine, Pageloads, Sessions

import pytest

import logging

logger = logging.getLogger()

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

def test_session_expired(app, client):
    """ Test that an expired session returns 401
    """
    # Clear data before running
    db_session = sessionmaker(bind=engine)()
    # Errors are not checked here if there is a database error I want to know about it
    # Ignoring a failure to delete the DB may break this test
    db_session.query(Pageloads).delete()
    db_session.query(Sessions).delete()
    session = Sessions(
            id="9c0e2d63a7ed4a7fbfbfdaa2637fe2f4",
            username="testuser",
            session_expire=datetime.utcnow()+timedelta(seconds=-1)
        )
    db_session.add(session)
    db_session.commit()
    db_session.close()
    
    res = client.get('/check_session')
    assert res.status_code == 401
