// input validation in inquirer prompt
export function inputValidation(input: string) {
  if (input !== "" && isNaN(parseInt(input))) {
    return true;
  }
  return "Field Required";
}

export function ageValidation(input: string) {
  if (input !=="" && Number(parseInt(input)) && parseInt(input) < 99) {
    return true;
  }
  return "Field Required age limit is 99";
}

export function emailValidation(email: string): boolean | string {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let valid = emailRegex.test(email);
  if (valid) {
    return true;
  } else {
    return "Please Enter valid Email";
  }
}

export function phoneValidation(input: string) {
    if (input !== "" && Number(parseInt(input)) && input.length===11 ) {
        return true;
    }
    return "Field Required 11 digits";
  }
  