export interface WebService {
  app: any;
  usingHttps: boolean;
  httpsDomain?: string;
}

export interface SQLiteQueryParams {
  query: string;
  params?: object;
}

export interface SQLiteSelectParams {
  query: string;
}

export interface JWTProps {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
}

/* USER */

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
}

export interface InsertResponse {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

/* TODOS */

export interface Todo {
  id: number;
  name: string;
  content: string;
  created_at: Date;
}

export interface ItemAdd {
  nom: string;
  content: string;
}
