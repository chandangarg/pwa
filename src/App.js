import React, { useState, useEffect } from 'react';
import './App.css';

let deferredPrompt;  

function App() {
  const [posts, setPosts] = useState([]);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      // e.preventDefault();

      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(response => {
      setPosts(response)
    })
  }, [])

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  };

  return (
    <div className="App">
      <h1>React PWA Boilerplate</h1>
      <p>
        Install this web application when prompted to test PWA installability.
      </p>
      {installable &&
        <>
          <p>You can also install it by clicking on button below.</p>
          <div
            className="addButton"
            color="danger"
            type="button"
            onClick={handleInstallClick}
          >
            Add to home screen
          </div>
        </>
      }
      
      {
        posts.map(item =>
          <div className="post" key={item.id}>
            <p>{item.title}</p>
          </div>
        )
        
      }
    </div>
  );
}

export default App;
