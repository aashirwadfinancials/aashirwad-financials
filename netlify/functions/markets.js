exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nifty: "22,450.35",
      sensex: "74,210.12",
      banknifty: "48,325.80",
      gold: "72,180",
      silver: "82,450",
      updated: new Date().toLocaleTimeString()
    })
  };
};
