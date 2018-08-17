
console.log("Hello, world!");
console.log(d3.version);

// ///////////////////////////////////////////////
// const pokedex = ["Bulbasaur", "Ivysaur", "Venasaur", "Charmander",
//                  "Charmeleon", "Charizard", "Squirtle",
//                  "Wartortle", "Blastoise", "Caterpie"];
// console.log(pokedex);

// ///////////////////////////////////////////////
// pokedex.forEach(name => {
//     console.log(name);
// });

// ///////////////////////////////////////////////
// pokedex.forEach((name, index) => {
//     console.log(`${index} - ${name}`);
// });

// ///////////////////////////////////////////////
// const listFrom1 = (name, index) => {
//     const correctIndex = index + 1;
//     console.log(`${correctIndex} - ${name}`);
// }
// listFrom1('Pikachu', 25);

// ///////////////////////////////////////////////
// pokedex.forEach(listFrom1);

// ///////////////////////////////////////////////
// const listedPokedex = pokedex.map((name, index) => `${index} - ${name}`);
// console.log(listedPokedex);

// ///////////////////////////////////////////////
// const unevolvedPokedex = pokedex.filter((_,index) => index % 3 === 0 );
// console.log(unevolvedPokedex);


// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000, 'foo');
// }).then(d => {
//     console.log(d);
// });
// console.log(promise1);

// async function waitAndLog(time, message) {
//     await new Promise((resolve, reject) => {
//         setTimeout(resolve, time, message);
//     }).then(d => {
//         console.log(d);
//     });
//     console.log('done!');
// }
// waitAndLog(3000, 'foo');