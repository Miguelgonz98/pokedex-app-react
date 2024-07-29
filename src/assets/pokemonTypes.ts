export const pokemonTypes = [
  { name: 'bug', value: 7 },
  { name: 'dark', value: 17 },
  { name: 'dragon', value: 16 },
  { name: 'electric', value: 13 },
  { name: 'fairy', value: 18 },
  { name: 'fighting', value: 2 },
  { name: 'fire', value: 10 },
  { name: 'flying', value: 3 },
  { name: 'ghost', value: 8 },
  { name: 'grass', value: 12 },
  { name: 'ground', value: 5 },
  { name: 'ice', value: 15 },
  { name: 'normal', value: 1 },
  { name: 'poison', value: 4 },
  { name: 'psychic', value: 14 },
  { name: 'rock', value: 6 },
  { name: 'steel', value: 9 },
  { name: 'water', value: 11 },
];


export const assignTypeIcon = (type: string) => {
  return `/src/assets/icons/pokemonTypes/${type}.svg`;
}

