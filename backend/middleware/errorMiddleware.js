const notFound = (req, res, next) => {
  const error = new Error(`Not fount  - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandle = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not fount`;
    statusCode =404
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "i" : err.stack,
  });
};

export {notFound,errorHandle}


