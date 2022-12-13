import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

import NoteForm  from "../components/NoteForm";

import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNote = props => {
  const id = useParams().id;
  const navigation = useNavigate();


  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userdata } = useQuery(GET_ME);
  
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      navigation(`/note/${id}`)
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Note not found</p>;
  if (userdata?.me.id !== data.note.author.id) {
    return <Navigate to={'/'}/>;
  }
  return <NoteForm content={ data.note.content } action={editNote} />
};

export default EditNote;