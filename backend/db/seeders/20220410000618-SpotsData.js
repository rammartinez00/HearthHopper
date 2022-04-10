"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          name: "The Epic Pad",
          description:
            "The Epic Pad is a beautiful, spacious pad with beautiful southwestern aesthetic. It is a great place to relax and unwind.",
          location: "Albuquerque, NM",
          price: "100",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The Desert Oasis",
          description:
            "The Desert Oasis is a beautiful, spacious pad with beautiful southwestern aesthetic. It is a great place to relax and unwind.",
          location: "Albuquerque, NM",
          price: "68",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The Little Workshop",
          description:
            "The Little Workshop is a beautiful, Tiny house with a modern design. It is a great place to relax and unwind.",
          location: "Albuquerque, NM",
          price: "50",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Baloon Watching Paradise",
          description: "A place to watch the balloons",
          location: "Albuquerque, NM",
          price: "50",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Modern North American",
          description: "Beautiful scenery and a modern design",
          location: "Taos, NM",
          price: "50",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tiny Adobe House",
          description:
            "A tiny Adobe house with a modern design, perfect for a family vacation",
          location: "Taos, NM",
          price: "50",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Snowy Mountain House",
          description:
            "A beautiful house in northern New Mexico, perfect for a ski vacation",
          location: "Taos, NM",
          price: "80",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "High Desert Oasis",
          description:
            "A beautiful house in northern New Mexico, beautiful desert views",
          location: "Taos, NM",
          price: "50",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Adobe Mansion",
          description:
            "Luxury Mansion in the desert, beautiful views, comfortable beds",
          location: "Taos, NM",
          price: "150",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Santa Fe Resort style rental",
          description:
            "A beautiful house in northern New Mexico, perfect for a ski vacation",
          location: "Santa Fe, NM",
          price: "157",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Adobe Mansion",
          description: "Santa Fe Mansion, beautiful views, comfortable beds",
          location: "Santa Fe, NM",
          price: "150",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beautiful Santa Fe House near the city",
          description: "Cozy house in the city, beautiful views",
          location: "Santa Fe, NM",
          price: "150",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kawaii Pad XD",
          description: "A cute pad with cute people",
          location: "Santa Fe, NM",
          price: "150",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The Epicest most rad unrad pad",
          description: "A pad with a rad pad",
          location: "Santa Fe, NM",
          price: "150",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Spots", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
  },
};
