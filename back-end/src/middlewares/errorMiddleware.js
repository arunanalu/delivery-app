module.exports = (err, req, res, _next) => {
  if (err.status) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }
  console.log(err);
  res.status(500).json({ message: 'Internal error' });
};
