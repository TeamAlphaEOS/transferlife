import React from 'react'
import { getFormValues } from 'redux-form'
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react'
import Form from './Form';
import { fakeKeys } from '../App';
import Eos from 'eosjs';

const {ecc} = Eos.modules;

const onSubmit = (values) => {
  const publicKey = ecc.privateToPublic(fakeKeys[1])
  const encrypted = ecc.Aes.encrypt(fakeKeys[0], publicKey, JSON.stringify(values));
  localStorage.setItem('form', JSON.stringify(encrypted))
}

const FormContainer = ({
  values
}) => {
  return <Container style={{
    marginTop: '120px',
    padding: '50px',
  }}>
    <Header style={{ textAlign: 'center' }} as='h1'>Questionnaire</Header>
    <Form handleSubmit={() => onSubmit(values)} />
  </Container>
}

const mapStateToProps = (state) => {
  return {
    values: getFormValues('Questions')(state),
  }
}

export default connect(mapStateToProps)(FormContainer);