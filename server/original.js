const express = require("express");
const {binPackingFFD} = require("./binFunction");

const app = express();
const PORT = 3000;


app.use(express.json());

app.post("/api/bin-packing", (req, res) => {
  const { capacity, items } = req.body;

  if (!capacity || !Array.isArray(items)) {
    return res.status(400).json({ error: "輸入資料格式錯誤" });
  }

  const bins = binPackingFFD(items, capacity);
  res.json({ bins, count: bins.length });
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
