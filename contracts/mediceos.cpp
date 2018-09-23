#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/transaction.hpp>

using namespace eosio;
using std::string;

class mediceos : public eosio::contract {
  public:
    using contract::contract;

    /**
     * This action will store the encrypted (off-chain) personal data link to external store
     * currentkey indicates to the owner, which of its off-chain keys is used for encryption of this data version
    */
    /// @abi action
    void storepers(uint64_t id, account_name user, string data, string currentkey) {
      print( "Storing personal data" );
      stores stored(_self, _self);
      require_auth( user );
      auto existing = stored.find(id);
      
      eosio_assert( data.size() <= 256, "data has more than 256 bytes" );
      eosio_assert( currentkey.size() <= 256, "key has more than 256 bytes" );
      if( existing == stored.end()) {
        stored.emplace( _self, [&]( auto& s ) {
                s.id                      = id;
                s.encryptedpersonal       = data;
                s.currentkey              = currentkey;
        });
        print( "Stored personal data" );
      } else {
        const auto& st = *existing;     
        stored.modify( st, 0, [&]( auto& s ) {
                s.encryptedpersonal       = data;
                s.currentkey              = currentkey;
        });
        print( "Modified personal data" );
      }
    }

    /**
     * This action will store the encrypted (off-chain) medical data link to external store
    */
    /// @abi action
    void storemed(uint64_t id, account_name user, string data, string currentkey) {
      stores stored(_self, _self);
      require_auth( user );
      auto existing = stored.find(id);
      
      eosio_assert( data.size() <= 256, "data has more than 256 bytes" );
      eosio_assert( currentkey.size() <= 256, "key has more than 256 bytes" );
      if( existing == stored.end()) {
        stored.emplace( _self, [&]( auto& s ) {
                s.id                      = id;
                s.encryptedmedical       = data;
                s.currentkey              = currentkey;
        });
        print( "Stored personal data" );
      } else {
        const auto& st = *existing;     
        stored.modify( st, 0, [&]( auto& s ) {
                s.encryptedmedical       = data;
                s.currentkey              = currentkey;
        });
        print( "Modified personal data" );
      }
    }

    /**
     * Platform user requesting owner authorization to access a specific set of data
     * (public) key is provided by requester for the owner to encrypt the data
    */
    /// @abi action
    void reqauth(uint64_t id, account_name requester, string datatype, string key){
      print( "Request authorization" );
      stores stored(_self, _self);
      require_auth( requester );
      auto existing = stored.find(id);
      eosio_assert( existing != stored.end(), "record with that ID does not exist" );
      const auto& st = *existing;
      stored.modify( st, 0, [&]( auto& s ) {
               s.authorized = false;
               s.requester = requester;
               s.requesteddata = datatype;
               s.requesterkey = key;
      });
      print( "Requested authorization" );
    }

    /**
     * Owner authorizing the user to access data and providing encrypted link on the chain for the 
     * specified duration. At the expiration point off-chain data is wiped and authorization is revoked
    */
    /// @abi action
    void authorize(uint64_t id, account_name owner, account_name requester, string requesteddata, uint16_t duration) {
      print( "Authorization start" );
      stores stored(_self, _self);
      require_auth( owner );
      //owner off-chain decodes the encrypted data
      //owner encrypts data with requester's key
      //owner stores data encrypted with requester's key
      auto existing = stored.find(id);
      eosio_assert( existing != stored.end(), "record with that ID does not exist" );
      const auto& st = *existing;
      stored.modify( st, 0, [&]( auto& s ) {
               s.authorized = true;
               s.requester = requester;
               s.requesteddata = requesteddata;
      });      
      //owner raises action to wipe data after period expires
      eosio::transaction t{};
      t.actions.emplace_back(
                 eosio::permission_level(owner, N(active)),
                 owner,
                 N(deferaction),
                 std::make_tuple(id, owner));
      t.delay_sec = duration;
      t.send(N(message), _self);     
      print( "Authorized" );
    }

    /**
     * actual indication of the authorization being revoked
     */
    /// @abi action
    void deferaction(uint64_t id, account_name owner){
      //naive deauthorization
      print( "Deferred start" );
      stores stored(_self, _self);
      require_auth( owner );
      auto existing = stored.find(id);
      eosio_assert( existing != stored.end(), "record with that ID does not exist" );
      const auto& st = *existing;
      stored.modify( st, 0, [&]( auto& s ) {
        s.authorized = false;
      });      
      print( "Deferred action completes" );
    }

  private:
    /// @abi table datastore
    struct store {
      uint64_t        id;
      string  encryptedpersonal; //staff available;staff ratio
      string  encryptedmedical; //devices;distance;private_beds;public_beds
      string  currentkey; //key used by owner to encrypt the current version of the data
      bool    authorized; //authorization flag - for simplicity sake only one partner is authorized at a time
      account_name requester; //parter requesting data
      string requesteddata; //personal or medical
      string requesterkey; //partner's public key to be used to encrypt data
      uint64_t primary_key() const {return id;}
 
      EOSLIB_SERIALIZE(store, (id)(encryptedpersonal)(encryptedmedical)(currentkey)(authorized)(requester)(requesteddata)(requesterkey))
    };

    typedef eosio::multi_index<N(datastore), store> stores;

};

EOSIO_ABI( mediceos, (storepers)(storemed)(reqauth)(authorize)(deferaction))

