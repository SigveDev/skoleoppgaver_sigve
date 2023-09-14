import React from 'react';

function ProjectBox(props) {
  return (
    <div className="project-box">
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.description}</p>
    </div>
  );
}

export default ProjectBox;