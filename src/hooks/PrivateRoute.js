import React, { Navigate } from "react-router-dom";
import isAuth from './isAuth';

export default function PriveteRoute({ Component, link, ...rest }) {
  return isAuth() ? ( <Component /> ) : ( <Navigate to={ link } /> );
}