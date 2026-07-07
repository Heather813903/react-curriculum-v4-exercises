function SnackList() {
  const snacks = [
    { name: 'Peanuts', rank: 4 },
    { name: 'Popcorn', rank: 3 },
    { name: 'Roll-O', rank: 2 },
    { name: 'Twix', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.rank}>{snack.name}</li>
      ))}
    </ol>
  );
}

export default SnackList;
