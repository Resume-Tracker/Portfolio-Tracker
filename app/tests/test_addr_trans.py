import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import iphandle

import pytest

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
