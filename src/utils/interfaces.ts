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
