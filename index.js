const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
// creating time stamp for file
const currentDateTimeStamp = `Date-${format(
  new Date(),
  "dd-MMM-yyyy"
)}\t Time-${format(new Date(), "HH:mm:ss")}`;
console.log(currentDateTimeStamp);
//creating variable file to store text file
let textFile = [];

// creating function for loading folder & files
const logEvents = async (currentDateTimeStamp) => {
  const dateTime = `${format(new Date(), "dd-MMM-yyyy")}_T_${format(
    new Date(),
    "HH-mm-ss"
  )}`;
  //creating folder
  try {
    if (!fs.existsSync(path.join(__dirname, "histroy"))) {
      await fsPromises.mkdir(path.join(__dirname, "histroy"));
    }
    await fsPromises.writeFile(
      path.join(__dirname, "histroy", `${dateTime}.txt`),
      currentDateTimeStamp
    );
    fs.readdir(path.join(__dirname, "histroy"), (err, files) => {
      if (err) {
        console.error(err);
      }
      files.forEach((file) => {
        if (path.extname(file, path.basename(file)) == ".txt") {
          textFile.push(file);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};


logEvents(currentDateTimeStamp);

//creating endpoint
app.get("/", function (req, res) {
  res.send(textFile);
});

//creating local server for listening on port 3000
app.listen(3000);