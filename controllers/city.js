const City = require("../models/city");

exports.getCities = (req, res, next) => {
  console.log("ee");
  City.find()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err + "errr"));
};
