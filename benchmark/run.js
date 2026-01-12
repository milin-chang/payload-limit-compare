const request = require("supertest");
const fs = require("fs");
const payloads = require("./payloads");
const generateItems = require("./generateItems");

// 同時載入兩個 app
const apps = [
  {
    name: "original",
    app: require("../server/original")
  },
  {
    name: "various",
    app: require("../server/various")
  }
];

const REPEAT = 10;

async function measure(fn) {
  const times = [];

  for (let i = 0; i < REPEAT; i++) {
    const start = process.hrtime.bigint();
    const res = await fn();
    const end = process.hrtime.bigint();

    times.push({
      timeMs: Number(end - start) / 1_000_000,
      status: res.statusCode
    });
  }

  return {
    avg: (
      times.reduce((a, b) => a + b.timeMs, 0) / times.length
    ).toFixed(2),
    min: Math.min(...times.map(t => t.timeMs)).toFixed(2),
    max: Math.max(...times.map(t => t.timeMs)).toFixed(2),
    status: times[0].status
  };
}

async function benchmarkApp(app, appName) {
  const results = [];

  for (const { label, size } of payloads) {
    const items = generateItems(size);

    const result = await measure(() =>
      request(app)
        .post("/api/bin-packing")
        .send({
          capacity: 10,
          items
        })
    );

    const row = {
      app: appName,
      payload: label,
      size,
      status: result.status,
      avg_ms: result.avg,
      min_ms: result.min,
      max_ms: result.max
    };

    results.push(row);
  }

  return results;
}

(async () => {
  const allResults = [];

  for (const { name, app } of apps) {
    console.log(`\n▶ Benchmarking: ${name}`);
    const results = await benchmarkApp(app, name);
    allResults.push(...results);
  }

  console.log("\n=== Benchmark Results Table ===");
  console.table(allResults);

  // 存成 JSON
  fs.writeFileSync("results.json", JSON.stringify(allResults, null, 2), "utf-8");
  console.log("\n Benchmark Results saved to results.json");
})();
