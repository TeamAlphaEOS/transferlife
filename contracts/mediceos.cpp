#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/transaction.hpp>

#define DEBUG

#include "logger.hpp"

using namespace eosio;
using std::string;

class mediceos : public eosio::contract {
public:
    using contract::contract;

    /// @abi action
    void storepers(uint64_t id, account_name user, string data) {
        stores stored(_self, id);
        require_auth( user );
        auto existing = stored.find(id);
        eosio_assert( existing == stored.end(), "record with that ID already exists" );
        // flip encryption key
        // insert stuff
    }

    /// @abi action
    void storemed(uint64_t id, account_name user, string data) {
        //same as above, different data
    }

    /// @abi action
    void reqauth(account_name requester, string datatype, uint16_t seconds, string key){
        require_auth( requester );
    }

    /// @abi action
    void authorize(account_name owner, account_name requester, string requesterdata) {
        require_auth( owner );
        //owner off-chain decodes the encrypted data
        //owner encrypts data with requester's key
        //owner stores data encrypted with requester's key
    }

private:
    /// @abi table
    struct datastore {
        uint64_t        id;
        string  encryptedpersonal;
        string  encryptedmedical;
        string  currentkey;
        account_name requester;
        string       requesterdata;
        uint64_t primary_key() const {return id;}

        EOSLIB_SERIALIZE(datastore, (id)(encryptedpersonal)(encryptedmedical)(currentkey)(requester)(requesterdata))
    };

    typedef eosio::multi_index<N(datastore), datastore> stores;

};

EOSIO_ABI( mediceos, (storepers)(storemed)(reqauth)(authorize))

