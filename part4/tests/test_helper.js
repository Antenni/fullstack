const User = require("../models/user");

const initialUsers = [
    {
      username: "hellas",
      name: "Arto Hellas",
      id: "627bd77f33e418039572306d",
    },
    {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "627bd7b233e4180395723071",
    },
  ];
  const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
  };
  
  module.exports = { initialUsers, usersInDb };