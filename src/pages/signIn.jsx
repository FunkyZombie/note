import { gql, useMutation, useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;


const SignIn = props => {
  useEffect(() => {
    document.title = 'Sign In - Notedly';
  })

  const navigate = useNavigate();
  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
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

  return (
    <>    
      <UserForm action={ signIn } formType="signin" />
      { loading && <p>Loading...</p> }
      { error && <p>Error creating an account!</p> }
    </>
  )
}

export default SignIn;