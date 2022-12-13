import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  useEffect(() => {
    document.title = 'My Favorites - Notedly';
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  return (
    <>
      { data?.me.favorites.length !== 0 ? (<NoteFeed notes={data.me.favorites} />) 
        : <p>No favorites yet</p> }
    </>
  )
};

export default Favorites;