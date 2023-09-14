import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import ProjectBox from './components/project-box';

function App() {
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => setImage(data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Navbar />
      <h1>My Portfolio</h1>
      <p>Welcome to my portfolio!</p>
      <h2>Projects</h2>
      <ProjectBox
        image={image}
        name="Project Name"
        description="This is a description of the project."
      />
      <h2>About Me</h2>
      <p>Here's some information about me...</p>
    </div>
  );
}

export default App;