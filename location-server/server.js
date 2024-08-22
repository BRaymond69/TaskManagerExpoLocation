const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

function formatDateNow() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}H ${minutes}Min ${seconds}Secs`;
}

app.post("/location", (req, res) => {
  console.log(
    "Received location data:",
    req.body.locations[0].coords,
    formatDateNow()
  );
  res.status(200).send("Location data received");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://192.168.2.9:${PORT}`);
});
