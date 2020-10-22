from db import engine, Pageloads 
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import sys

def insert(date, page, company):
    Session = sessionmaker(bind=engine)
    session = Session()

    entry = Pageloads(timestamp = date, page_name = page, company = company)
    session.add(entry)

    try:
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()

# run from command line, ie "python addrow.py 'page3' 'Google'"
if __name__ == '__main__':
    page_name = None
    company = None
    try:
        page_name = sys.argv[1]
    except:
        print('[!] No page given')
    try:
        company = sys.argv[2]
    except:
        print('[!] No company given')

    # maybe grab date from page information instead?
    date = str(datetime.today().strftime('%Y-%m-%d-%H:%M:%S'))

    insert(date, page_name, company)
