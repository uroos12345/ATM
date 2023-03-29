#! /user/bin/env node
import inquirer from "inquirer";

// inquirer
//   .prompt([
//     {
//       message: "please enter pin",
//       name: "pin",
//     },
//   ])
//   .then((responnse) => {
//     console.log(responnse);
//   });

type Usertype = {
  name: string;
  pin: number;
  balance: number;
};
let user: Usertype = {
  name: "maria",
  pin: 1234,
  balance: 10000,
};

const resp = await inquirer.prompt([
  {
    message: "please enter pin",
    name: "pin",
    type: "password",
  },
]);

let continueTransaction: boolean = true;

if (Number(resp.pin) !== user.pin) {
  console.log("password invalid");
} else {
  while (continueTransaction === true) {
    const resp = await inquirer.prompt([
      {
        name: "SelectedType",
        message: "please select option",
        type: "list",
        choices: ["withdraw", "fastcash", "balanceinquiry"],
      },

      {
        name: "amount",
        message: "please select amount",
        type: "list",
        choices: ["1000", "2000", "5000", "10000"],
        when(resp) {
          return resp.SelectedType == "fastcash";
        },
      },
      {
        name: "amount",
        message: "please enter amount",
        when(resp) {
          return resp.SelectedType == "withdraw";
        },
      },
    ]);
    if (resp.SelectedType == "balanceinquiry") {
      console.log(`avaialable balance is: ${user.balance}`);
      const toRepeat = await inquirer.prompt([
        {
          name: "repeat",
          type: "confirm",
          message: "do you want to repeat transaction?",
        },
      ]);
      if (toRepeat.repeat === true) continueTransaction = true;
      else {
        continueTransaction = false;
      }
    } else {
      user.balance = user.balance - resp.amount;

      console.log(`your new balance is:${user.balance}`);
      continueTransaction = false;
    }
  }
}
