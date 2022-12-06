import React from "react";

const names = [
  { name: "Ali", age: 25 },
  { name: "Ayşe", age: 22 },
  { name: "Mehmet", age: 30 },
];

function MyComponent() {
  // names dizisinden rastgele bir eleman seçin
  const randomPerson = names[Math.floor(Math.random() * names.length)];

  return (
    <div>
      {/* randomPerson objesini gösterin */}
      <p>
        <b>Name:</b> {randomPerson.name} <b>Age:</b> {randomPerson.age}
      </p>
    </div>
  );
}

export default MyComponent;
