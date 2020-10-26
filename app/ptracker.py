from flask import Flask, request, jsonify, Response
app = Flask(__name__)

from db import engine, Pageloads
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta

# Add URL handling functions here
# API handlers should probably go under /api/
# tracking shout probably go under something else

# TODO: Input company name
@app.route('/addrow', methods=['POST', 'GET', 'HEAD'])
def insert():
    Session = sessionmaker(bind=engine)
    session = Session()

    page = 'NOT_DEFINED'
    if request.referrer:
        page = request.referrer

    entry = Pageloads(timestamp = datetime.utcnow(), page_name = page)
    session.add(entry)

    try:
        session.commit()
    except Exception as e:
        session.rollback()
        print(e)
    finally:
        session.close()

    return '', 204


# query db and return list of pageloads
# can provide 2 optional arguments, start_date and end_date to specify date range
# if arguments are not provided:
#            end_date is set to current time
#            start_date is set to current time - 10 days
@app.route('/pageloads')
def get_pageloads_with_date():
    Session = sessionmaker(bind=engine)
    session = Session()

    # handle parsing datetime objects if present
    if 'start_date' and 'end_date' in request.args:

        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        try:
            start_date_datetime = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
            end_date_datetime = datetime.strptime(end_date, '%Y-%m-%d %H:%M:%S')

        except Exception as e:
            return Response(status=400, response='Issue parsing timestamp arguments. Please double check formatting')
        finally:
            session.close()

    # if datetime parameters are not present, default range is 10 days
    else:
        start_date_datetime = datetime.utcnow() - timedelta(days=10)
        end_date_datetime = datetime.utcnow()

    records = session.query(Pageloads).filter(Pageloads.timestamp >= start_date_datetime,
                                              Pageloads.timestamp <= end_date_datetime).all()

    response_body = []

    # build response body
    for record in records:
        pageload_object = {}
        pageload_object['timestamp'] = record.timestamp
        pageload_object['page_name'] = record.page_name
        pageload_object['company'] = record.company
        response_body.append(pageload_object)

    session.close()
    return jsonify(response_body)


if __name__ == '__main__':
    app.run(debug=True)
