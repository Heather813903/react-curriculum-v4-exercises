//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  const name = 'Heather';
  const age = 48;
  const hobbies = ['Going to the beach', 'Boxing', 'Traveling'];

  return (
    <div>
      <h1>About Me</h1>

      <p>
        Hi! My name is {name}, and I am {age} years old.
      </p>

      <h2>My Hobbies</h2>

      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
