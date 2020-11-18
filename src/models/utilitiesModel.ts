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
    sessionReset;
    intervalCall;
    showMessageTime;
    dateTimeInterval;
    readerUrl;
    readerRetriveInterval;
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


export enum IKioskThemes {
    THEME1 = 'theme1',
    THEME2 = 'theme2',
    THEME3 = 'theme3',
    THEME4 = 'theme4',
    THEME5 = 'theme5',
    THEME6 = 'theme6'
}

export enum Ilanguages {
    ENG = '',
    ARB = '-Ar'
}

export enum IMenuCodes {
    REGISTRATION = 'REGISTRATION',
    APPOINTMENT = 'APPOINTMENT',
    PHARMACY = 'PHARMACY',
    LABORATORY = 'LABORATORY',
    FEEDBACK = 'FEEDBACK',
}

export enum IAppoinmentCodes {
    EMIRATESID = 'EMRID',
    MRNID = 'MRNNO',
}
