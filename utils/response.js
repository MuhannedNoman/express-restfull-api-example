export default function (res, status, data = null, error = null) {
  return res.status(status).json({
    success: !error,
    status,
    data,
    error,
  });
}
