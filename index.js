#!/user/bin/node env
import inquirer from "inquirer";
inquirer
    .prompt([
    {
        message: "please enter pin",
        name: "pin",
    },
])
    .then((responnse) => {
    console.log(responnse);
});
