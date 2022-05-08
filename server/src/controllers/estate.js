const estate = {
  main: function (req, res) {
    return res.status(200).json({
      message: "Estate page",
    });
  },
};

module.exports = estate;
