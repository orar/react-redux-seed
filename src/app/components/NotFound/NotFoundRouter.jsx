// @flow
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import NotFound from './NotFound';

// ============================
// Renders a NotFound on not-found-location
// using a redirect while maintaining the the location pathname.
// ============================

/**
 * Triggers a redirect to NotFound component
 */
export const RedirectToNotFound = () => <Redirect to={{ state: { notFound: true } }} />;

/**
 * Renders a NotFound or children base on location state
 * @param children
 * @param location
 * @returns {*}
 * @constructor
 */
const NotFoundRouter = ({ children, location = {} }) => {
  console.log(location)
  if (location.state && location.state.notFound) return <NotFound />;
  return children;
};

export default withRouter(NotFoundRouter);
