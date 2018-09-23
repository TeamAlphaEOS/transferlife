import unittest, sys
from eosf import *

Logger.verbosity = [Verbosity.INFO, Verbosity.OUT, Verbosity.DEBUG]
_ = Logger()

CONTRACT_WORKSPACE = sys.path[0] + "/../"

INITIAL_RAM_KBYTES = 120
INITIAL_STAKE_NET = 100
INITIAL_STAKE_CPU = 100

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

        create_account("account_alice", account_master, buy_ram_kbytes=INITIAL_RAM_KBYTES, stake_net=INITIAL_STAKE_NET, stake_cpu=INITIAL_STAKE_CPU)
        create_account("account_carol", account_master)


    def setUp(self):
        pass


    def test_01(self):
        _.COMMENT('''
        Test data modification scenario
        ''')
        account_host.push_action("storepers", {"id": 1, "user": account_alice, "data": "mysecret", "currentkey": "akey"}, account_alice)
        account_host.push_action("storepers", {"id": 1, "user": account_alice, "data": "mysecret2", "currentkey": "akey"}, account_alice)
        table_stores = account_host.table("datastore", account_host)
        assert(table_stores.json["rows"][0]["encryptedpersonal"] == "mysecret2")
        account_host.push_action("reqauth", {"id": 1, "requester": account_alice, "datatype": "personal", "key" : "encKey"}, account_alice)
        table_stores = account_host.table("datastore", account_host)
        assert(table_stores.json["rows"][0]["authorized"] == 0 )
        account_host.push_action("authorize", {"id": 1, "owner": account_host, "requester": account_alice, "requesteddata": "encrypted", "duration": 10}, account_host)
        table_stores = account_host.table("datastore", account_host)
        assert(table_stores.json["rows"][0]["authorized"] == 1 )


    def tearDown(self):
        pass


    @classmethod
    def tearDownClass(cls):
        stop()


if __name__ == "__main__":
    unittest.main()

