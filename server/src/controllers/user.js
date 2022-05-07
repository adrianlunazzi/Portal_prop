const user = {
  main: function (req, res) {
    return res.status(200).json({
      message: "Main Page",
    });
    console.log("main page");
  },
};

module.exports = user;
