import React, { Component } from 'react';
import { Divider, Segment, Progress, Button, Header } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import Eos from 'eosjs';

const notify = () => toast.info("Patient sent successfully");

const chain = {
  main: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906", // main network
  jungle: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca", // jungle testnet
  sys: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f" // local developer
};
/**
    Other httpEndpoint's: https://www.eosdocs.io/resources/apiendpoints
  */
const eos = Eos({
  keyProvider: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3", // private key
  httpEndpoint: "http://10.20.10.92:8999",
  chainId: chain.sys
});

class OtherHospital extends Component {
    click = () => {
        toast.info("Patient sent successfully");
        console.log("test");
        this.handleFormEvent();
    }
  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    eos.contract('eosio').then(eosio => eosio.storepers(1, "eosio", "asdfs", "akey", {'authorization': "eosio@active"}));
    this.getTable();
  }

  // gets table data from the blockchain
  // and saves it into the component state: "noteTable"
  getTable() {
    eos.getTableRows(true,'eosio','eosio','datastore',0,0,1000,1000).then(function (res) {
        console.log(res);
    })
  }

  button = () => <Button onClick={this.click} basic>send patients</Button>;
    render() {
        return (
            <div>
            <div style={{ marginTop: 10 }}/>
            <div style={styles.container}>
                <Header size='large'>Hospitals around Hyde Park</Header>
            </div>

            <Segment>
            <h3>Islington</h3>
            <Progress percent={70} success progress>
                staff patient capacity
             </Progress>
            <Progress percent={30} success progress>
                available beds
             </Progress>
             <div style={styles.container}>
                {this.button()}
             </div>
             <Divider section />

            <h3>Kensington</h3>
            <Progress percent={50} warning progress>
                staff patient capacity
             </Progress>
            <Progress percent={10} warning progress>
                available beds
             </Progress>
             <div style={styles.container}>
                {this.button()}
             </div>
             <Divider section />

            <h3>Westminster</h3>
            <Progress percent={45} warning progress active>
                staff patient capacity
             </Progress>
            <Progress percent={8} warning progress>
                available beds
             </Progress>
             <div style={styles.container}>
                 {this.button()}
             </div>
             <Divider section />

            <h3>Hackney</h3>
            <Progress percent={6} error progress>
                staff patient capacity
             </Progress>
            <Progress percent={5} error progress>
                available beds
             </Progress>
             <div style={styles.container}>
                {this.button()}
             </div>
             <Divider section />

          <h3>Hackney</h3>
          <Progress percent={5} indicating progress>
            staff patient capacity
          </Progress>
          <Progress percent={95} indicating progress>
            available beds
          </Progress>
          <div style={styles.container}>
            <Button onClick={notify} basic>
              send patients
            </Button>
          </div>
          <Divider section />
        </Segment>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
};
export default OtherHospital;
