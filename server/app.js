const express = require("express");

app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server side!", app: "Natours" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running @ port ${port}...`);
});
