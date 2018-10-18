const watch = require("node-watch");
const fs = require("fs");
var flag = 0;
var counterflag = 0;
var counter = 0;

var ImpString;
var alphaChange = {
  ALF: "A",
  BRA: "B",
  CHA: "C",
  DEL: "D",
  ECH: "E",
  FOX: "F",
  GOL: "G",
  HOT: "H",
  IND: "I",
  JUL: "J",
  KIL: "K",
  LIM: "L",
  MIK: "M",
  NOV: "N",
  OSC: "O",
  PAP: "P",
  QUE: "Q",
  ROM: "R",
  SIE: "S",
  TAN: "T",
  UNI: "U",
  VIC: "V",
  WHI: "W",
  "X-R": "X",
  YAN: "Y",
  ZUL: "Z"
};

watch(
  "InFiles",
  {
    //this function will constantly will look for any changes in the Infile folder, if there is a file in the infile folder it will be picked to be processed
    recursive: true // always on option
  },
  function(evt, name) {
    var content;
    var text = fs.readFileSync(name, "utf8"); // will read the file
    if (text === "") {
    } else {
      var arr = text.split(/\r\n|\r|\n/); // splits the file into an array to be sorted out

      arr.map(str => {
        content += Replacing_with_values(str); //loop through the array of the file , and run the process
      });
      var named = Math.floor(Math.random() * 1000000000000000000 + 1); // naming convention
      printingDocuments(content, named, name, alertFinished); //outputing the tranfromed files
    }
  }
);

function Replacing_with_values(str) {
  // the function will run to set the files value
  var content = "";
  if (str === "" || str == " ") {
    counterflag = 0;
  } else if (str.includes("ATIS")) {
    // formula of sorting starts here
    str = str.replace("SX", "");
    ImpString = str.split(" ");
    flag = 1;
    counterflag = 1;
    Addstringflag = 1;
  } else if (flag && counterflag == 0) {
    flag = 0;
    var res = str.split(" ");
    if (alphaChange[res[0]]) {
      ImpString.splice(2, 0, alphaChange[res[0]]);
      content += returningStrng(ImpString) + "\n";
      content += "\n";
    }
    content += str.replace(res[0], "") + "\n";
    content += "\n";
  } else {
    content += str + "\n";
    content += "\n";
  }
  return content;
}

function printingDocuments(content, named, name, callback) {
  // this function will generate the output file
  fs.writeFile("OutFiles/" + named + ".txt", content, function(err) {
    if (err) return console.log(err);
  });

  callback(name);
}

function alertFinished(e) {
  fs.writeFile(e, "", function() {
    // console.log("done");
  });
}
function returningStrng(strngarray) {
  //setting array for a desire able output
  str = "";
  strngarray.forEach(function(val, index) {
    str += val + " ";
  });
  return str;
}

Array.prototype.remove = function() {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
