export async function authenticateKey(req, res, next) {
  const key = req.headers['x-api-key'];
  console.log(key)
  if (key !== process.env.API_KEY) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    next();
  }
}