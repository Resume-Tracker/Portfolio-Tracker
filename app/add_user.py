from argon2 import PasswordHasher
import sys
from sqlalchemy.orm import sessionmaker
from db import engine, Users


def main():
    """
    script takes in 2 arguments:
        username: string
        password: string

    script will hash password, store username and hashed password in User's Table
    """

    if len(sys.argv) != 3:
        print("add_user takes in 2 arguments, username and password. No users added")
        exit(1)

    username = sys.argv[1]
    password = sys.argv[2]
    hashed_password = PasswordHasher().hash(password=password)

    Session = sessionmaker(bind=engine)
    session = Session()

    username_exists = session.query(session.query(Users).filter(Users.name == username).exists()).scalar()

    if username_exists:
        print("Username {} already exists. No users added".format(username))
        exit(1)
    else:
        # adds new entry to Users Table

        print("adding user: {} {}".format(username, hashed_password))
        entry = Users(name=username, password=hashed_password)

        session.add(entry)

        try:
            session.commit()
        except Exception as e:
            session.rollback()
            print(e)
        finally:
            session.close()
    print("User {} added successfully.".format(username))
    return


if __name__ == "__main__":
    main()
