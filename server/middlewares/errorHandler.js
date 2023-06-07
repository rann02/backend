const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (
    err.name == "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({
      message: err.errors[0].message,
    });
  } else if (err.name === "NotFound") {
    res.status(404).json({
      messsage: err.message,
    });
  } else if (err.name == "EmailorPasswordRequired") {
    res.status(400).json({
      message: "email or password required",
    });
  } else if (err.name == "InvalidCredential") {
    res.status(401).json({
      message: "email or password incorrrect",
    });
  } else {
    res.status(500).json({
      messsage: "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
