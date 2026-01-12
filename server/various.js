const express = require("express");
const {binPackingFFD} = require("./binFunction");


const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10kb" }));

app.post("/api/bin-packing", (req, res) => {
  const { capacity, items } = req.body;

  if (!capacity || !Array.isArray(items)) {
    return res.status(400).json({ error: "輸入資料格式錯誤" });
  }

  const bins = binPackingFFD(items, capacity);
  res.json({ bins, count: bins.length });
});

// 捕捉 payload 過大錯誤
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Payload too large' });
  }
  next(err);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
