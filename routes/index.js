const fs = require("fs");
const router = require("express").Router();

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ["index"].includes(fileWithOutExt);
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${file}`));
    console.log(`Loading route ${fileWithOutExt} ...`);
  }
});



module.exports = router;
