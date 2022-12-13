import React from 'react';
import {  Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import isAuth from '../hooks/isAuth';
import PriveteRoute from '../hooks/PrivateRoute';
import EditNote from './edit';

import Favorites from './favorites';
import Home from './home';
import MyNotes from './mynotes';
import NewNote from './new';
import NotePage from './note';
import SignIn from './signIn';
import SignUp from './signUp';



const Pages = () => {
  const is_auth = isAuth();

  return (
    <Layout>
      <Routes>
        <Route exact path='/' element={ <Home /> } />
        <Route path='mynotes' element={ <PriveteRoute Component={ MyNotes } link={ '/signin' }/> } />
        <Route path='favorites' element={ <PriveteRoute Component={ Favorites } link={ '/signin' }/>} />
        <Route path='new' element={ <PriveteRoute Component={ NewNote } link={ '/signin' }/>} />
        <Route path='edit/:id' element={ <PriveteRoute Component={ EditNote } link={ '/signin' }/>} />
        <Route path='note/:id' element={ <NotePage />} />
        <Route path='signup' element={ <SignUp />} />
        <Route path='signin' element={ <SignIn />} />
      </Routes>
    </Layout>
  );
};

export default Pages;
