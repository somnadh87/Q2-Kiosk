export enum IRoutePath {
    default = '/',
    timeOut = '/440',
    notAuthenticated = '/403',
    isAuthenticated = '1'
}
export interface IApiThrowResponse {
    status: boolean;
    statuscode: number,
    messages: string;
    data?: any;
    error?: any;
}
export interface Settings {
    sessionName;
    sessionTime;
    showMessagecode;
    autoRefresing;
    autoRefreshTime;
    tokenServingInterval;

}

export interface IApiUrls {
    apiUrl: string
    component: string;
    methods: IApiMethod[];
}

export interface IApiMethod {
    name: string;
    type: string;
    url: string;
}


