nodeos -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --delete-all-blocks --http-server-address=0.0.0.0:8999
(also add the following to config.ini - access-control-allow-origin = *)


cleos set contract eosio build mediceos.wasm mediceos.abi -p eosio@active
Reading WASM from build/mediceos.wasm...
Publishing contract...
executed transaction: f77d850835692f8e05dd5813b7949fd605154e03cc1e84c41ecaca8f2d477246  6104 bytes  1323 us
#         eosio <= eosio::setcode               "0000000000ea30550000df710061736d010000000181011460057f7e7e7e7f0060067f7e7e7f7f7f0060057f7e7e7f7f006...
#         eosio <= eosio::setabi                "0000000000ea3055a8040e656f73696f3a3a6162692f312e3000050573746f726500080269640675696e74363411656e637...
warning: transaction executed locally, but may not be confirmed by the network yet    ]

cleos get table eosio eosio datastore
{
  "rows": [],
  "more": false
}

cleos push action eosio storepers '{"id": 1, "user": "eosio", "data": "mysecret", "currentkey": "akey"}' -p eosio@active
executed transaction: 1b6eb5082112b3aa374d4f04100f70a4f69aa5ebac3be3f81dd5e9c8abccfa3c  128 bytes  602 us
#         eosio <= eosio::storepers             {"id":1,"user":"eosio","data":"mysecret","currentkey":"akey"}
warning: transaction executed locally, but may not be confirmed by the network yet    ]

cleos get table eosio eosio datastore
{
  "rows": [{
      "id": 1,
      "encryptedpersonal": "mysecret",
      "encryptedmedical": "",
      "currentkey": "akey",
      "authorized": 0,
      "requester": "",
      "requesteddata": "",
      "requesterkey": ""
    }
  ],
  "more": false
}


cleos push action eosio authorize '{"id": 1, "owner": "eosio", "requester": "eosio", "requesteddata": "personal", "duration": 10}' -p eosio@active
cleos get table eosio eosio datastore
(after 10 seconds the authorization flag will be reset to false)
cleos get table eosio eosio datastore