import React, { Component } from 'react';
import UsersList from "./components/UsersList";
import {Provider as ReduxProvider} from 'react-redux';

import configureStore from './Redux/configureStore';

const store = configureStore();

function App() {
  return (
    <ReduxProvider store = {store}>
      <div className="container-fluid">
        <UsersList />
      </div>
    </ReduxProvider>
  );
}

export default App;