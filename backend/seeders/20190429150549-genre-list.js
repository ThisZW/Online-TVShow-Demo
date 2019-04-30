'use strict';

const defaultGenres = [
  "Fantasy",
  "Science Fiction",
  "Westerns",
  "Romance",
  "Thriller",
  "Mystery",
  "Detective story",
  "Dystopia",
  "Memoir",
  "Biography",
  "Play",
  "Musical",
  "Horror",
  "Dictionary",
  "others"
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', defaultGenres.map( genre =>{
      return { genreName: genre }
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
