import inquirer from "inquirer";
import { StdDetailsT, StdCourseT, StdT } from "../types.js";
import {
  inputValidation,
  ageValidation,
  emailValidation,
  phoneValidation,
} from "../_InputValitator.js";
import chalk from "chalk";
import { _Course } from "./_course.js";

export class _Student extends _Course {
  protected _stdLsit: StdT[];
  protected _enrolledStdList: StdDetailsT[];

  constructor() {
    super();
    this._stdLsit = [];
    this._enrolledStdList = [];
  }

  // add student
  async _addStd_M(): Promise<void> {
    let add_std_data: StdT;
    const stdDetails = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Please Enter Student Name",
        validate: inputValidation,
      },
      {
        type: "input",
        name: "age",
        message: "Please Enter age in digits",
        validate: ageValidation,
      },
      {
        type: "input",
        name: "email",
        message: "Please Enter your email address",
        validate: emailValidation,
      },
      {
        type: "input",
        name: "fatherName",
        message: "Please Enter your Father Name",
        validate: inputValidation,
      },
      {
        type: "list",
        name: "edu",
        message: "Please choose your Maximum Education",
        choices: [
          "Middle",
          "Matric",
          "Intermidiate",
          "BS",
          "MS",
          "MPhil",
          "PHD",
        ],
      },
      {
        type: "input",
        name: "phoneNo",
        message: "Please Enter your Phone no",
        validate: phoneValidation,
      },
      {
        type: "input",
        name: "address",
        message: "Please Enter your permenent Address",
        validate: inputValidation,
      },
    ]);
    // unique std ID generating
    let repeatRandomGenerator: boolean = false;
    let reg_no: number;
    do {
      reg_no = Math.floor(Math.random() * 100000);
      if (this._stdLsit.filter((item) => item.std_id === reg_no)) {
        repeatRandomGenerator = false;
      } 
      else {
        repeatRandomGenerator = true;
      }
    } while (repeatRandomGenerator === true);
    // student data at registeration time
    add_std_data = {
      std_id: reg_no,
      std_name: stdDetails.name,
      std_fatherName: stdDetails.fatherName,
      std_age: stdDetails.age,
      std_email: stdDetails.email,
      std_address: stdDetails.address,
      std_phone: stdDetails.phoneNo,
      std_edu: stdDetails.edu,
    };
    console.log(chalk.green(`Congratulations you have Registered Sucessfully And your student Id is: ${reg_no}`));
    //pushing std data to std data list
    this._stdLsit.push(add_std_data);

    // end of add student method
  }

  // enroll student in course
  async _enroll_M(): Promise<void> {
    // getting student id to enroll in a course
    const stdCredentials = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "please enter student ID",
        validate: function (input: string) {
          if (input !== "" && Number(input) && input.length == 5) {
            return true;
          }
          return "Please enter your 5 digits student id";
        },
      },
    ]);
    let std_id: number = parseInt(stdCredentials.id);

    // verifing student ID entered by user is avaliable at student data list
    if (this._stdLsit.find((item) => item.std_id == std_id)) {
      // validating that the student is not enrolled already
      if(this._enrolledStdList.find(item=>item.std_id == std_id)){
        console.log(chalk.blueBright(`Student id:${std_id} already enrolled`));
        
      }
      else{
        // displaying courses list 
        const course = await inquirer.prompt([
          {
            type: "list",
            name: "name",
            choices: this._course_list.map((item) => item.name),
          },
        ]);
        let courseName = course.name;
        // getting details from student data list against student id entered by user 
        let enrollingStdDetails: StdT | undefined = this._stdLsit.find((item) => item.std_id == std_id);
        // getting details from course list against the user choice
        let courseDetail: StdCourseT | undefined = this._course_list.find((item) => item.name == courseName);
        console.log(courseDetail);
        if (typeof courseDetail == "undefined") {
          console.log("course detail is undefiened");
        } 
        else {
          if (typeof enrollingStdDetails == "undefined") {
            console.log("enrolling student detail is undefiened");
          } 
          else {
            // enrolled student details
            let enrolledSTD: StdDetailsT = {
              std_id: std_id,
              std_name: enrollingStdDetails.std_name,
              std_fatherName: enrollingStdDetails.std_fatherName,
              std_age: enrollingStdDetails.std_age,
              std_email: enrollingStdDetails.std_email,
              std_address: enrollingStdDetails.std_address,
              std_phone: enrollingStdDetails.std_phone,
              std_edu: enrollingStdDetails.std_edu,
              std_course_name: courseDetail.name,
              std_course_fee: courseDetail.fee,
              std_course_duration: courseDetail.duration,
              std_balance: courseDetail.fee,
            };
            // pushing enrolled student details
            this._enrolledStdList.push(enrolledSTD);
            console.log(chalk.green("Student Enrolled Sucessfully"));            
          }
        }
      }
    } 
    else {
      // message if student id doesnt found in student data list
      console.log("Wrong Student ID ");
    }

    // end of enroll student method
  }

  // pay fee of enrolled student
  async _payFee_M(): Promise<void> {
    // getting student id enrolled in acourse to pay fee
    const stdCredentials = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "please enter student ID",
        validate: function (input: string) {
          if (input !== "" && Number(input) && input.length == 5) {
            return true;
          }
          return "Please enter your 5 digits student id";
        },
      },
    ]);
    let std_id: number = parseInt(stdCredentials.id);
    // verifing student ID entered by user is avaliable at student data list
    if (this._stdLsit.find((item) => item.std_id == std_id)) {
      // validating that the student is not enrolled already
      if(this._enrolledStdList.find(item=>item.std_id == std_id)){
        // getting index no of enrolled student against the student id entered by user
        const enrolledStdIndex=this._enrolledStdList.findIndex(item=>item.std_id==std_id)
        // displaying fee for student
        const fee=this._enrolledStdList[enrolledStdIndex].std_balance;
        // checking if fee already paid
        if(fee==0){
          console.log("fee already payed!");
        }
        else{
          console.log(`Fee :${fee}`);
          // fee pay confirmation
          const pay = await inquirer.prompt([
            {
              type: "confirm",
              name: "fee",
              message:"Press Y to pay fee or any other key to Back to Main",
            },
          ]);
          let feeStatus:boolean = pay.fee;
          if(feeStatus==true){
            this._enrolledStdList[enrolledStdIndex].std_balance=0;
            console.log(chalk.green('Fee Payed Sucessfully'));          
          }else{
            console.log("fee not payed");
          }
        }
      }else{
        console.log("Please enroll !");
      }  
    }else{
      // message if student id doesnt found in student data list
      console.log("Wrong Student ID ");
    }


    // end of pay fee method
  }

// check status of enrolled student
  async _status_M(): Promise<void> {
    // getting student id to check student status
    const stdCredentials = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "please enter student ID",
        validate: function (input: string) {
          if (input !== "" && Number(input) && input.length == 5) {
            return true;
          }
          return "Please enter your 5 digits student id";
        },
      },
    ]);
    let std_id: number = parseInt(stdCredentials.id);
    // verifing student ID entered by user is avaliable at student data list
    if (this._stdLsit.find((item) => item.std_id == std_id)) {
      // validating that the student is not enrolled already
      if(this._enrolledStdList.find(item=>item.std_id == std_id)){
        // getting index no of enrolled student against the student id entered by user
        const enrolledStdIndex=this._enrolledStdList.findIndex(item=>item.std_id==std_id)
        // displaying id,name,course,balance for student
        const id=this._enrolledStdList[enrolledStdIndex].std_id;
        const name=this._enrolledStdList[enrolledStdIndex].std_name;
        const course=this._enrolledStdList[enrolledStdIndex].std_course_name;
        const balance=this._enrolledStdList[enrolledStdIndex].std_balance;
        
        console.log(chalk.green(`  Status  \nId : ${id} \nName:${name} \nCourse :${course} \nBalance :${balance}`));
      }
      else{
        console.log("Please enroll !");
      }  
    }
    else{
      // message if student id doesnt found in student data list
      console.log("Wrong Student ID ");
    }


    // end of pay fee method
  }


  // end of student class
}
