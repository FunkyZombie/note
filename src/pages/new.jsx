import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';

import { GET_NOTES, GET_MY_NOTES } from '../gql/query';
import { NEW_NOTE } from '../gql/mutation';



const NewNote = props => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'New Note - Notedly';
  });

  const [ data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      navigate(`/note/${data.newNote.id}`);
    }
  })

  return (
    <>
      { loading && <p>Loading...</p> }
      { error && <p>Error saving the note!</p> }
      <NoteForm action={data}/>
    </>
  
  )
};

export default NewNote;