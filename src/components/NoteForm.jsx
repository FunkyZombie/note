import React, { useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;

const NoteForm = props => {
  const [ values, setValues ] = useState({ content: props.content || '' });

  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Wrapper>
      <Form onSubmit={e => {
        e.preventDefault();
        props.action({
          variables: {
            ...values
            }
          });
        }}
      >
      <TextArea 
        required
        typeof="text"
        name="content"
        placeholder="Note content"
        value={ values.content }
        onChange={ onChange }
      />
      ,<Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

export default NoteForm;