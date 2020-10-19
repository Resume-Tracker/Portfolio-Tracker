from flask import Flask
app = Flask(__name__)

# TODO: only import `engine` and 1 table
from db import *

# Add URL handling functions here
# API handlers should probably go under /api/
# tracking shout probably go under something else