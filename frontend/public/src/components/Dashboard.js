import React, { Component } from "react";
import {
  Divider,
  Segment,
  Progress,
  Button,
  Header,
  Modal,
  Container
} from "semantic-ui-react";
import OtherHospital from "./OtherHospital";

class Dashboard extends Component {
  render() {
    return (
      <Container style={{ marginTop: 120 }}>
        <div style={styles.container}>
          <Header size="large">Current status of EOS Hyde Park Hospital</Header>
        </div>
        <Segment>
          <Progress indicating percent={75} active progress>
            staff patient capacity
          </Progress>
          <div style={styles.container}>
            <Modal closeIcon trigger={<Button basic>request staff</Button>}>
              <Modal.Content image>
                <Modal.Description>
                  <OtherHospital />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
          <Divider section />
          <Progress indicating percent={50} active progress>
            available beds
          </Progress>
          <div style={styles.container}>
            <Modal closeIcon trigger={<Button basic>send patients</Button>}>
              <Modal.Content image>
                <Modal.Description>
                  <OtherHospital />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
          <Divider section />
          <Progress indicating percent={10} progress>
            emergency staff available on demand
          </Progress>
          <div style={styles.container}>
            <Modal closeIcon trigger={<Button basic>request staff</Button>}>
              <Modal.Content image>
                <Modal.Description>
                  <OtherHospital />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
          <Divider section />
          <Progress indicating percent={40} active progress>
            medical devices in use
          </Progress>
          <div style={styles.container}>
            <Modal closeIcon trigger={<Button basic>request devices</Button>}>
              <Modal.Content image>
                <Modal.Description>
                  <OtherHospital />
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </div>
        </Segment>
      </Container>
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
export default Dashboard;
