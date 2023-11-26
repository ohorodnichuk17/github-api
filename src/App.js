import React, { useState } from 'react';
import './App.css';

function App() {
   const [username, setUsername] = useState('');
   const [userData, setUserData] = useState(null);
   const [error, setError] = useState(null);

   const fetchData = () => {
      fetch(`https://api.github.com/users/${username}`)
         .then(response => response.json())
         .then(data => {
            setUserData(data);
            setError(null);
         })
         .catch(error => {
            setUserData(null);
            setError(error.message);
         });
   };

   return (
      <div className="App">
         <div className="container mt-10">
            <h1>GitHub User Information</h1>
            <div className="form-group">
               <label htmlFor="username">Enter GitHub Username:</label>
               <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter GitHub Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <button className="btn btn-outline-secondary mt-2" onClick={fetchData}>
                  Get User Info
               </button>
            </div>
            {userData && (
               <div className="mt-4 card">
                  <h2>{userData.name}</h2>
                  <img src={userData.avatar_url} alt="Profile Photo" style={{ maxWidth: '200px' }} />
                  <p>Login: {userData.login}</p>
                  <p>Account URL: <a href={userData.html_url} target="_blank" rel="noopener noreferrer">{userData.html_url}</a></p>
                  <p>Blog URL: <a href={userData.blog} target="_blank" rel="noopener noreferrer">{userData.blog}</a></p>
                  <p>Location: {userData.location}</p>
                  <p>Email: {userData.email || 'N/A'}</p>
                  <p>Followers: {userData.followers}</p>
                  <p>Following: {userData.following}</p>
               </div>
            )}
            {error && <p className="mt-4 card">Error: {error}</p>}
         </div>
      </div>
   );
}

export default App;
