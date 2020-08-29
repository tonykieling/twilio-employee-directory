const shell = require("shelljs");
const portNumber = 3210;

const check = shell.exec(`lsof -i :${portNumber} | grep -i *:${portNumber}`).split(" ").join("");

if (check != "") {
  let processNumber = "";
  for (let c = 0; c < 12; c += 1) {
    if (Number(check[c]) || check[c] == "0") {
      processNumber += check[c];
    }
  }
  console.log(` *** KILLING process port ${processNumber}`);
  shell.exec(`kill -9 ${processNumber}`);
} else
  console.log(` *** no process running on port ${portNumber}\n\n`);