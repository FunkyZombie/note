import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import ButtonAsLink from './ButtonAsLink';

import { DELETE_NOTE } from "../gql/mutation";
import { GET_MY_NOTES, GET_NOTES } from "../gql/query";


const DeleteNote = props => {
  const navigation = useNavigate();
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    refetchQueries: [{query: GET_MY_NOTES, GET_NOTES}],
    onCompleted: () => {
      navigation('/mynotes/')
    }
  })

  return <ButtonAsLink onClick={deleteNote}>Delete</ButtonAsLink>
};

export default DeleteNote;