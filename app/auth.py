from db import engine, Sessions

from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
from sqlalchemy import func


def check_valid_session(request):
    """ Return session to user
    
    Takes a request object and looks up id in sessions table
    If there is a valid session that has not expired, return the user
    If there is no valid session, return None
    """
    try:
        # Get the session id from request 
        id = request.cookies.get('session')
        if id is not None:
            DBSession = sessionmaker(bind=engine)
            db_session = DBSession()

            # query searching for id
            session = db_session.query(Sessions).get(id)
            if session is not None:
                # check if session has not expired yet
                if datetime.utcnow() < session.session_expire:
                    db_session.close()
                    return session.username

            db_session.close()

    except Exception as e:
        print(e)

    return None
