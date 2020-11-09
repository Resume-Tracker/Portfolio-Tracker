import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import iphandle

import pytest

import logging

logger = logging.getLogger()

class Request():
    """ Basic mocking of the request object
    """
    def __init__(self, ip):
        self.environ = Environ(ip)
        self.remote_addr = ip

class Environ():
    """ Mocking of the request enviornment
    """
    def __init__(self, ip):
        self._ip = ip
    def get(self, var, alt):
        # HTTP_X_FORWARED_FOR may also work.  But I don't know
        if var == 'HTTP_X_REAL_IP':
            return self._ip
        else:
            logger.warn(f'Header `{var}` not found falling back on passthrough')
            return alt

def test_domain_filter():
    """ Checks if the filter domains call can accept and reject domains
    """
    assert iphandle.filterDomains('255-255-255-255.snttca.lightspeed.sbcglobal.net') is None
    assert iphandle.filterDomains('building5.corp.google.com') == 'building5.corp.google.com'

def test_domain_simplify():
    """ Checks if the simplify domains call can handle valid domains
    """
    assert iphandle.parseDomains(None) is None
    assert iphandle.parseDomains('building5.corp.google.com') == 'google.com'
    # An actually in use example of a GTLD
    # The amount of work required to find an example of this ege case was excessive
    assert iphandle.parseDomains('home.komatsu') == 'home.komatsu'
    # Encoded non-ASCII ccTLD
    assert iphandle.parseDomains('xn--mgbaa2be1idb4afr.xn--lgbbat1ad8j') == 'xn--mgbaa2be1idb4afr.xn--lgbbat1ad8j'

def test_get_domain():
    """ Test that an IP properly gets converted to a domain if a domain is available
    """
    req_ucsc = Request('128.114.119.88')
    assert iphandle.getDomain(req_ucsc).endswith('ucsc.edu')
    # test invalid address
    req_invalid = Request('256.256.256.256')
    assert iphandle.getDomain(req_invalid) is None

def test_full_ip_to_domain():
    """ Test full ip conversion pipeline
    """
    req_ucsc = Request('128.114.119.88')
    assert iphandle.get_company_from_request(req_ucsc) == 'ucsc.edu'
    # test invalid address
    req_invalid = Request('256.256.256.256')
    assert iphandle.get_company_from_request(req_invalid) is None