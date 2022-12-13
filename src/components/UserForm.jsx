import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const UserForm = props => {
  const [values, setValues] = useState();

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      { props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2> }
        <Form  onSubmit={ e => {
            e.preventDefault();
            props.action({
              variables: {
                ...values
              }
            });
          }}
        >
        { props.formType === 'signup' && (
          <>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={ onChange }
            />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={ onChange }
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={ onChange }
        />
        <Button type="submit" style={{ width: "100%" }}>Submit</Button>
      </Form>
    </Wrapper>
  )
}

export default UserForm;