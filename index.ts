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
  pin: 123,
  balance: 10000,
};

const resp = await inquirer.prompt([
  {
    message: "please enter pin",
    name: "pin",
    type: "password",
  },
]);

if (Number(resp.pin) !== user.pin) {
  console.log("password invalid");
} else {
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
  } else {
    user.balance = user.balance - resp.amount;

    console.log(`your new balance is:${user.balance}`);
  }
}
