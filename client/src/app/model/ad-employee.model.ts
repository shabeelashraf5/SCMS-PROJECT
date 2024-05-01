import { OnlineStatus } from "../enums/online-status.enum";
export interface Employee {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  position: string;
  department: string;
  area: string;
  image: string;
  token?: string;
  is_online?: OnlineStatus;
  
  }