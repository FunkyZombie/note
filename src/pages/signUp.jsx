import React, { useEffect, useState } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = props => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery({ 
        query: gql`
          query isAuth {
            isLoggedIn
          }`,
        data: { 
          isLoggedIn: true
        } 
      });
      navigate('/');
    }
  })

  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  return  ( 
    <>    
      <UserForm action={ signUp } formType="signup" />
      { loading && <p>Loading...</p> }
      { error && <p>Error creating an account!</p> }
    </>
  );
};

export default SignUp;