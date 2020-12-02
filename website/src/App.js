import React, { useState, useEffect } from "react";

import Routes from "./routes";
import { AppContext } from "./libs/context_lib";

import './App.css'

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  // empty array: only run on the first render
  useEffect(() => {
    // check for valid session before website render
    onLoad();
  }, []);

  async function onLoad() {
    await fetch('/check_session')
    .then(response => {
      if (response.status === 200) {
        userHasAuthenticated(true);
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <>
      <div className='App-header'>
        <h1>Portfolio Tracker</h1>
      </div>
      <div className="App container py-3">
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
      </>
    )
  );
}

export default App
