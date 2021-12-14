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
