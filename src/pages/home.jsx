import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";

import { GET_NOTES } from "../gql/query";

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES)

  useEffect(() => {
    document.title = 'Home - Notedly';
  })

  if (loading) return <p>Loading...</p>;
  if (error) { 
    console.log(error)
    return <p>error!</p> };


  return (
    <React.Fragment>
      <NoteFeed notes={ data.noteFeed.notes }/>
      { data.noteFeed.hasNextPage && (
        <Button onClick={() => 
          fetchMore({
            variables: {
              cursor: data.noteFeed.cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
              console.log({
                noteFeed: {
                  cursor: fetchMoreResult.noteFeed.cursor,
                  hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                  notes: Array.prototype.concat(previousResult.noteFeed.notes, fetchMoreResult.noteFeed.notes),
                  _typename: 'noteFeed'
                }
              })
              return {
                noteFeed: {
                  cursor: fetchMoreResult.noteFeed.cursor,
                  hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                  notes: [
                    ...previousResult.noteFeed.notes,
                    ...fetchMoreResult.noteFeed.notes
                  ],
                  _typename: 'noteFeed'
                }
              }
            } 
          })
        }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;