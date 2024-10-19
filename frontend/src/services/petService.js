// // Pet service to fetch pet data
// export const getPets = async () => {
//     const response = await fetch('http://localhost:5000/pets');
//     if (!response.ok) {
//       throw new Error('Failed to fetch pets');
//     }
//     return await response.json();
//   };
  
//   export const getPetTypes = async () => {
//     const response = await fetch('http://localhost:5000/pet-types');
//     if (!response.ok) {
//       throw new Error('Failed to fetch pet types');
//     }
//     return await response.json();
//   };
  
//   export const getBreedsByPetType = async (petType) => {
//     const response = await fetch("http://localhost:5000/breeds?petType=${petType}");
//     if (!response.ok) {
//       throw new Error('Failed to fetch breeds');
//     }
//     return await response.json();
//   };
