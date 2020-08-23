export interface IKioskModel {
    kioskId: string;
    theme: string;
    language: string;
    menusData: IMenus[];
    selectedArea: number;
    loading: boolean;
    errorMessage: string;
    selectedMenu: IMenus[];
    templateData: ITemplateData;
    tokenNo: string;
    appointmentsData: IKioskAppointmentDto[],
    mrnNo: string;
    dateTime: string;
}

export interface ITemplateData {
    templateOrg: string;
    templates: string[];
    mrnNo: string;
    tokenNo: string;
}

export interface IAppointments {
    appId: number;
    appName: string;
    appCode: string
}

export interface IMenus {
    menuId: number;
    menuName: string;
    menuCode: string;


}
export enum IkioskManager {
    HOME = 1,
    MENUSELECTION = 2,
    VERIFICATION = 3,
    EMIRADESVERIFICATION = 4,
    MRNVERIFICATION = 5,
    APPOINTMENTSAREA = 6,
    TOKENAREA = 7,
    FEEDBACKAREA = 8,
    ERRORBLOCKAREA = 9,
}

export interface IKioskAppointmentDto {
    appointmentTime: string;
    departmentName: string;
    doctorName: string;
    mrnNo: string;
    patientName: string;
    serviceBookedId: number;
}

export enum IFeedBackEnums {
    HAPPY = "HAPPY",
    NATURAL = "NATURAL",
    SAD = "SAD"
}