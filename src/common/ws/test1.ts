import WebSocket from "ws";

const javaWsUrl =
  "wss://wsspush.fastbull.com/tick?langId=1&t=8100_NZDUSD|8500_XAUUSD|8100_GBPUSD|8600_WTI|8100_USDJPY|8100_EURUSD|8100_USDCAD|8500_XAGUSD|8100_USDCNH|8400_USDX|8700_USNDAQ100|8100_AUDUSD|8100_USDCHF|8600_BRENT|8500_XAUEUR|8500_XAGEUR|8500_XPDUSD|8500_XPTUSD|7200_AAPL|7200_MSFT|7200_GOOG|7200_AMZN|7200_TSLA|7200_META|7300_WMT|7200_NFLX|8700_US30|8700_USSPX500|8700_Euro50|8700_UK100|8700_HongKong50|8700_Japan225|8700_AUS200|6100_BTC-USDT|6100_ETH-USDT|6100_OKB-USDT|6100_OKT-USDT|6100_LTC-USDT|6100_DOT-USDT|6100_DOGE-USDT|6100_ADA-USDT|4200_GC2405|4200_SI2405|4200_HG2405|4100_ZS2407|4100_ZC2407|4800_LE2406|4100_ZF2406|4100_ZN2406"; // Java WS服务器的URL
const javaWsClient = new WebSocket(javaWsUrl);

javaWsClient.on("open", () => {
  console.log("Connected to Java WebSocket server.");
});

javaWsClient.on("message", async (data: any) => {
  // console.log("Received data from Java WebSocket server:", data);
  const str: string = data.toString();

  // console.log(data instanceof Blob);
  console.log("Received data from Java WebSocket server:", str);
});
