export async function handler() {
  try {
    const response = await fetch(
      "https://query1.finance.yahoo.com/v7/finance/quote?symbols=%5ENSEI,^BSESN,^NSEBANK,GC=F,SI=F"
    );

    const data = await response.json();
    const r = data.quoteResponse.result;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        nifty: r[0]?.regularMarketPrice,
        sensex: r[1]?.regularMarketPrice,
        banknifty: r[2]?.regularMarketPrice,
        gold: r[3]?.regularMarketPrice,
        silver: r[4]?.regularMarketPrice
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Market fetch failed" })
    };
  }
}
