exports.handler = async () => {
  try {
    // Last trading day closing prices (example values)
    // Update once daily (manual or cron later)
    const data = {
      nifty: 22123.45,
      sensex: 73123.88,
      banknifty: 46890.10,
      gold: 62150,
      silver: 73420
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Market data unavailable" })
    };
  }
};
