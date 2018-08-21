
// console.log("Hello, world!");
// console.log(d3.version);

///////////////////////////////////////////////
// const pokedex = ["Bulbasaur", "Ivysaur", "Venasaur", "Charmander",
//                  "Charmeleon", "Charizard", "Squirtle",
//                  "Wartortle", "Blastoise", "Caterpie"];
// console.log(pokedex);

///////////////////////////////////////////////
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
// console.log(pokedex);
// console.log(listedPokedex);

// ///////////////////////////////////////////////
// const unevolvedPokedex = pokedex.filter((_,index) => index % 3 === 0 );
// console.log(unevolvedPokedex);


// const promise1 = new Promise((resolve, reject) => {
//     // Indicamos que luego de 2 segundos, la función resolve retorne 'foo'.
//     setTimeout(resolve, 2000, 'foo');
// }).then(d => {
//     // Tomamos lo retornado por resolve (d) y lo imprimimos en consola
//     console.log(d);
// }).catch(d => {
//     // En caso de fallar la promesa, capturamos (catch)
//     // lo retornado por reject (d) y lo imprimimos en consola
//     console.log(d);
// });
// console.log(promise1);

// async function waitAndLog(time, message) {
//     // Con await le decimos a la función que espere a que termine la promesa
//     // antes de continuar con la siguiente línea (console.log('done'))
//     await new Promise((resolve, reject) => { // Prueba removiendo await y viendo los cambios
//         setTimeout(resolve, time, message);
//     }).then(d => {
//         console.log(d);
//     });
//     console.log('done!');
// }
// waitAndLog(3000, 'foo');
// console.log('running promise');
