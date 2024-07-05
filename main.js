import { authors } from "./js/model/authors.js";
import { movis } from "./js/model/movis.js";

// let objmovis = new movis();
let objauthors = new authors();

// console.log(await objmovis.getCountDvd());

// console.log(await objmovis.getAllGenre());//CONSULTA 6
// console.log(await objauthors.getAllAuthorsAwards());//CONSULTA 2
// console.log(await objauthors.getAllAuthorsAwardsCu());//CONSULTA 3
// console.log(await objauthors.getAllAuthor1980());//CONSULTA 4
console.log(await objauthors.getAuthorsMostAwards());//CONSULTA 5
// console.log(await objmovis.getAllGenre());//CONSULTA 6
// console.log(await objmovis.getAllGenre());//CONSULTA 6
// console.log(await objmovis.getAllGenre());//CONSULTA 6
