import app from "./app";
import "./database";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
