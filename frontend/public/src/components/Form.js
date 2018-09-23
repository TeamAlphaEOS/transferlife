import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Form,
  Checkbox,
  Segment,
  Label,
  Button,
  Header,
  Rating,
  Modal,
  Image,
  Message
} from "semantic-ui-react";
import { Link } from 'react-router-dom';

const questions = [
  {
    text: "User ID",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text: "Are you in pain?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text: "Are you diabetic or suffering from heart, lung or kidney disease?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text:
      "Have you ever been admitted to a hospital for an extended period of time? ",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text: "Has any of your family members passed away before the age of 50?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text: "What type of work have you done in the past?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text: "Have you had any recent infections?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text: "Have you had any significant traumas? (previous / current)",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text: "Are you experiencing any current bladder or bowel problems?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text:
      "Where are you currently experiencing symptoms? What symptoms have you had since your last visit?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text:
      "Is your visit today for the same condition(s) you were seen for last time?",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  },
  {
    text:
      "Have your symptoms changed in any way since your last visit? (better, worse or about the same)",
    component: ({ label, ...other }) => (
      <Form.Field>
        <Label color="teal" ribbon>
          {label}
        </Label>
        <Form.Input {...other} />
      </Form.Field>
    )
  }
];

let ContactForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      {questions.map((q, i) => (
        <Form.Group key={i}>
          <Segment vertical>
            <Field label={q.text} name={q.text} component={q.component} />
          </Segment>
        </Form.Group>
      ))}
      <Form.Field>
        <Label ribbon>Predicted user health status:</Label>
        <Rating size="massive" icon="heart" defaultRating={1} maxRating={5} />
      </Form.Field>
      <Modal
        size="mini"
        trigger={<Button style={{ marginTop: 50 }}>Submit</Button>}
      >
        <Modal.Header>Status of Patient changed</Modal.Header>
        <Modal.Content>
          <Message negative>
            <Message.Header>Status critical</Message.Header>
            <p>You are adviced to take action!</p>
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button>No</Button>
          <Link to="/dashboard">
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Next step"
            />
          </Link>
        </Modal.Actions>
      </Modal>
      {/* <Button color='teal' onClick={handleSubmit} type="submit">Submit</Button> */}
    </Form>
  );
};

ContactForm = reduxForm({
  // a unique name for the form
  form: "Questions"
})(ContactForm);

export default ContactForm;
