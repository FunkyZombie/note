import { gql, useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';

export default function isAuth() {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn;
}
