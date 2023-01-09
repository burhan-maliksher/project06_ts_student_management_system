#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { titleTimer } from "./src/_AppTitle.js";
import { _Student } from "./src/classes/_addstd.js";
// main class
class _stdManagementSystem extends _Student {
    constructor() {
        super();
    }
    // run the app
    async Run() {
        await this.AppTitle();
        await this.MainOperations();
    }
    // autor watermark on app at the begening
    async AppTitle() {
        const title = chalkAnimation.neon(`__________________Welcome to M.B Student Management System__________________`);
        await titleTimer();
        title.stop();
        console.log(chalk.bgRed.italic(`                                                             Autor:"M.B"`));
        // return;
    }
    //operations
    async MainOperations() {
        //getting user choose from main menu and performing operations accordingly
        const operation_choosed = await this.MainMenu();
        switch (operation_choosed) {
            case "Add Student":
                await this.Addstd();
                break;
            case "Enroll":
                await this.Enrollstd();
                break;
            case "Pay Fee":
                await this.PayFee();
                break;
            case "Status":
                await this.Status();
                break;
            case "Exit":
                await this.Exit();
                break;
        }
        // end of main operation method
    }
    //main menu
    async MainMenu() {
        // displaying list of operations in main menu
        const main = await inquirer.prompt([
            {
                type: "list",
                name: "menu",
                choices: ["Add Student", "Enroll", "Pay Fee", "Status", "Exit"],
            },
        ]);
        return main.menu;
        // end of main menu method
    }
    //add student
    async Addstd() {
        let repeat;
        do {
            // calling add student method from _addstd class
            await this._addStd_M();
            const decision = await inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirm",
                    message: "Press y to Add more Students Or Press any key to Main Menu",
                },
            ]);
            repeat = decision.confirm;
        } while (repeat === true);
        this.MainOperations();
        // end of add student method
    }
    //enroll student
    async Enrollstd() {
        // calling enroll student method from _student class
        if (this._stdLsit.length !== 0) {
            await this._enroll_M();
            await this.MainOperations();
        }
        else {
            console.log("No Student Found Please Add Student !");
            await this.MainOperations();
        }
        // end of enrolled method
    }
    //pay fee
    async PayFee() {
        // calling  pay fee method from _student class
        if (this._stdLsit.length !== 0) {
            await this._payFee_M();
            await this.MainOperations();
        }
        else {
            console.log("No Student Found Please Add Student !");
            await this.MainOperations();
        }
        // end of pay fee method
    }
    //student status
    async Status() {
        // calling status method from _student class
        if (this._stdLsit.length !== 0) {
            await this._status_M();
            await this.MainOperations();
        }
        else {
            console.log("No Student Found Please Add Student !");
            await this.MainOperations();
        }
        // end of status method
    }
    //  exiting the program
    async Exit() {
        console.log(chalk.bgCyan("                    Thanks for Using M.B Student Management System                          "));
        return;
    }
}
let run = new _stdManagementSystem();
run.Run();
