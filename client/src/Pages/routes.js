import React from 'react';
import AuthPage from './AuthPage';
import CreatePage from './CreatePage';
import DetailPage from './DetailPage';
import LinksPage from './LinksPage';

import { Switch, Route, Redirect } from 'react-router-dom';

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage></LinksPage>
        </Route>
        <Route path="/create" exact>
          <CreatePage></CreatePage>
        </Route>
        <Route path="/detail/:id" exact>
          <DetailPage></DetailPage>
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
