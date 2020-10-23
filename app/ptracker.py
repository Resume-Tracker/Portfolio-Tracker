from flask import Flask, request
app = Flask(__name__)

from db import engine, Pageloads
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Add URL handling functions here
# API handlers should probably go under /api/
# tracking shout probably go under something else

# TODO: Input company name
@app.route('/addrow', methods=['POST', 'GET', 'HEAD'])
def insert():
    Session = sessionmaker(bind=engine)
    session = Session()

    # not too how to test if this works
    page = request.referrer
    entry = Pageloads(timestamp = datetime.today(), page_name = page)
    session.add(entry)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(e)
    finally:
        session.close()

    return '', 204

if __name__ == '__main__':
    app.run(debug=True)