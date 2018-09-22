import unittest, sys
from eosf import *

Logger.verbosity = [Verbosity.INFO, Verbosity.OUT, Verbosity.DEBUG]
_ = Logger()

CONTRACT_WORKSPACE = sys.path[0] + "/../"

class Test(unittest.TestCase):

    def run(self, result=None):
        super().run(result)


    @classmethod
    def setUpClass(cls):
        reset()
        create_wallet()
        create_master_account("account_master")

        create_account("account_host", account_master)
        contract = Contract(account_host, CONTRACT_WORKSPACE)
        contract.build(force=False)
        contract.deploy()

        create_account("account_alice", account_master)
        create_account("account_carol", account_master)


    def setUp(self):
        pass


    def test_01(self):
        _.COMMENT('''
        Test an action for Alice, including the debug buffer:
        ''')
        account_host.push_action("storepers", {"id": 1, "user": account_alice, "data": "mysecret", "currentkey": "akey"}, account_alice)
        account_host.push_action("authorize", {"id": 1, "owner": account_host, "requester": account_alice, "requesteddata": "personal"}, account_host)


    def tearDown(self):
        pass


    @classmethod
    def tearDownClass(cls):
        stop()


if __name__ == "__main__":
    unittest.main()

