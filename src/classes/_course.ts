import { StdCourseT } from "../types.js";
export class _Course {
    protected _course_list:StdCourseT[];

    constructor(){
        this._course_list=[
            {                
                name:"AI",
                fee:1500,
                duration:"1 year",
            },
            {                
                name:"IOT",
                fee:1500,
                duration:"1 year",
            },
            {                
                name:"CNC",
                fee:1500,
                duration:"1 year",
            },
            {                
                name:"Metaverse And Web3",
                fee:3000,
                duration:"1 year",
            }
        ];
    }

}
