from flask import request
import socket

# takes in request object and returns domain as a string
def getDomain(request):
    try:
        ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
        domain = socket.gethostbyaddr(ip)[0]
    except Exception as e:
        print(e)
        domain = None

    return domain