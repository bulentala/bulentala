import React from "react";

const names = [
  {
    name: "Toto, I've a feeling we're not in Kansas anymore.",
    age: " The Wizard of Oz (1939)",
  },
  {
    name: "May the Force be with you.",
    age: "Star Wars (1977)",
  },
  {
    name: "Houston, we have a problem.",
    age: "Apollo 13 (1995)",
  },
];

function MyComponent() {
  const randomPerson = names[Math.floor(Math.random() * names.length)];

  return (
    <div className='text-sm'>
      <p>{randomPerson.name}</p>
      <p className='text-right text-xs italic'>{randomPerson.age}</p>
    </div>
  );
}

export default MyComponent;
