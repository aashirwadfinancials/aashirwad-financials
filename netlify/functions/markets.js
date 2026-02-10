export async function handler() {
  try {
    const API_KEY = process.env.ALPHA_VANTAGE_KEY;

    const urls = {
      gold: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=XAUUSD&apikey=${API_KEY}`,
      silver: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=XAGUSD&apikey=${API_KEY}`
    };

    const goldRes = await fetch(urls.gold).then(r => r.json());
    const silverRes = await fetch(urls.silver).then(r => r.json());

    const getLatestClose = (data) => {
      const series = data["Time Series (Daily)"];
      const lastDate = Object.keys(series)[0];
      return parseFloat(series[lastDate]["4. close"]);
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nifty: "Refer NSE official close",
        sensex: "Refer BSE official close",
        banknifty: "Refer NSE official close",
        gold: getLatestClose(goldRes),
        silver: getLatestClose(silverRes)
      })
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Market data unavailable" })
    };
  }
}
