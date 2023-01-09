export interface StdT {
  std_id: number;
  std_name: string;
  std_fatherName: string;
  std_age: number;
  std_email: string;
  std_address: string;
  std_phone: string;
  std_edu: string;
}

export interface StdDetailsT {
  std_id: number;
  std_name: string;
  std_fatherName: string;
  std_age: number;
  std_email: string;
  std_address: string;
  std_phone: string;
  std_edu: string;
  std_course_name: string;
  std_course_fee:number;
  std_course_duration:string;
  std_balance:number;

}

export interface StdCourseT{
  name:string;
  fee:number;
  duration:string;
}