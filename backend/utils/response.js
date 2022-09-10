exports.success = (res) => {
  return (result) =>
    res.status(200).json({
      success: true,
      message: "Success",
      result: result ?? [],
    });
};

exports.error = (res) => {
  return (err) =>
    res.status(400).json({
      success: false,
      message: err,
      result: [],
    });
};

exports.notFound = (res) => {
  return (result, message) =>
    res.status(404).json({
      success: false,
      message: message ?? "Unable to get any results",
      result: result ?? [],
    });
};
