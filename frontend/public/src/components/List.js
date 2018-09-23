import React from 'react';
import { Container, Card, Icon } from 'semantic-ui-react';
import Eos from 'eosjs';
import { fakeKeys } from '../App';

const {ecc} = Eos.modules;

export default class List extends React.Component {
  componentDidMount() {
    const a = localStorage.getItem('form');
    const publicKey = ecc.privateToPublic(fakeKeys[0])

    if (!a) {
      console.log('NO DATA')
      return;
    }

    const data = JSON.parse(a);

    console.log('@@@', data)


    const message = ecc.Aes.decrypt(fakeKeys[1], publicKey, data.nonce, data.message, data.checksum)
    console.log('DONE', message)
  }

  render() {
    return <Container style={{ marginTop: 120 }}>
    <Card>
      <Card.Content header='About Amy' />
      <Card.Content description="Test" />
      <Card.Content extra>
        <Icon name='user' />
        4 Friends
      </Card.Content>
    </Card>
  </Container>
  }
}