import { all, fork, takeLatest, select, put, call, take, cancel } from "redux-saga/effects";
import * as types from './actionTypes';
import { gettranId, serviceConsumer, getApiServiceUrlByComponentAndMethod } from "../../helpers/helpersIndex";
import { IKioskModel, IMenus, IkioskManager, IAppointments, IKioskAppointmentDto } from "../../models/kioskModel";
import * as actions from './actions';
import { IMenuCodes, IAppoinmentCodes } from "models/utilitiesModel";
import kiosk from "pages/kiosk/Container/kiosk";

const KIOSKMODULE = 'QK1';
const kioskComponent = "Kiosk";

function* getThemsAndMenusData(action) {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_getThemsAndMenusData_Start => `, action);
    let kisokId = 'kid';
    let themeName;
    let menusData: IMenus[] | undefined;
    let errorMessage;
    try {
        let regComponentAndMethod = getApiServiceUrlByComponentAndMethod(kioskComponent, 'getThemeByKioskIdentifier');
        regComponentAndMethod.url = regComponentAndMethod.url.replace('{kioskIdentifier}', action.payload.kioskId).replace('{kioskIdentifier}', action.payload.kioskId);
        console.log(`${tranId}_getThemsAndMenusData_Api_Request => `, regComponentAndMethod, action.payload);
        const response = yield call(serviceConsumer, tranId, regComponentAndMethod, null, null);
        console.log(`${tranId}_getThemsAndMenusData_Api_Response => `, response);
        if (response.status) {
            menusData = [{ menuName: 'Registration', menuId: 1, menuCode: 'REGISTRATION' }, { menuName: 'Pharmacy', menuId: 2, menuCode: 'PHARMACY' }, { menuName: 'Laboratory', menuId: 3, menuCode: 'LABORATORY' }, { menuName: 'Appointments', menuId: 5, menuCode: 'APPOINTMENT' }, { menuName: 'Feedback', menuId: 4, menuCode: 'FEEDBACK' }]
            kisokId = action.payload.kioskId;
            themeName = response.themeName;
        }
        else {
            errorMessage = response.message;
        }
    }
    catch (error) {
        console.log(`${tranId}_getThemsAndMenusData_catch => `, error);
        errorMessage = 'EM0';
    }
    console.log(`${tranId}_getThemsAndMenusData_End => `, kisokId, themeName, menusData, action.payload.action, errorMessage);
    yield put(actions.setKioskIdAndGetMenusDataResponse(kisokId, themeName, menusData, action.payload.action, errorMessage));

}
function* getMenusDataAfterLanguageSelection(action) {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_getMenusDataAfterLanguageSelection_Start => `, action);
    let menusData: IMenus[] | undefined;
    let language: string = action.payload;
    try {
        // themeName = 'theme1',
        menusData = [{ menuName: 'Registration', menuId: 1, menuCode: 'REGISTRATION' }, { menuName: 'Pharmacy', menuId: 2, menuCode: 'PHARMACY' }, { menuName: 'Laboratory', menuId: 3, menuCode: 'LABORATORY' }, { menuName: 'Appointments', menuId: 5, menuCode: 'APPOINTMENT' }, { menuName: 'Feedback', menuId: 4, menuCode: 'FEEDBACK' }]
        // navigate to 403
        console.log(`${tranId}_getMenusDataAfterLanguageSelection_End => `, language, menusData);
        yield put(actions.setLanguageResponse(language, menusData));
    }

    catch (error) {
        // navigate to 403
        console.log(`${tranId}_getTokensData_catch => `, error);
        yield put(actions.setLanguageResponse(language, undefined));
    }
}

function* setKioskNameSelectionRequest(action) {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_setKioskNameSelectionRequest_Start => `, action);
    let selectedArea;
    let selectedMenu;
    let errorMessage;

    try {
        // switch (action.payload.menuCode) {
        //     case IMenuCodes.REGISTRATION:
        //         selectedArea = IkioskManager.TOKENAREA;
        //         tokenTemplate = 'template';
        //         break;
        //     case IMenuCodes.APPOINTMENT:
        //         selectedArea = IkioskManager.VERIFICATION;
        //         break;
        //     case IMenuCodes.PHARMACY:
        //         selectedArea = IkioskManager.ERRORBLOCKAREA;
        //         break;
        //     case IMenuCodes.LABARATORY:
        //         selectedArea = IkioskManager.VERIFICATION;
        //         break;
        //     case IMenuCodes.FEEDBACK:
        //         selectedArea = IkioskManager.FEEDBACKAREA;
        //         break;
        //     default:
        //         selectedArea = IkioskManager.MENUSELECTION;
        //         break;
        // }
        selectedArea = IkioskManager.MRNVERIFICATION;
        selectedMenu = action.payload.menuCode;
    }
    catch (error) {
        errorMessage = 'error'
        console.log(`${tranId}_setKioskNameSelectionRequest_catch => `, error);
    }
    console.log(`${tranId}_setKioskNameSelectionRequest_End => `, selectedMenu, selectedArea, errorMessage);

    yield put(actions.menuSelectionResponce(selectedMenu, selectedArea, errorMessage));

}



function* setBackActionRequest() {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_setBackActionRequest_Start => `,);
    let kioskModel = (yield select())['kioskReducer'] as IKioskModel;
    let currentSelectedArea = kioskModel?.selectedArea;
    let previousSelected;
    console.log("currentSelectedArea", currentSelectedArea, kioskModel)

    try {
        if (currentSelectedArea == IkioskManager.MENUSELECTION) {
            previousSelected = IkioskManager.HOME;
        }
        else if ('' + currentSelectedArea == IMenuCodes.REGISTRATION || '' + currentSelectedArea == IMenuCodes.FEEDBACK || '' + currentSelectedArea == IMenuCodes.PHARMACY) {
            previousSelected = IkioskManager.MENUSELECTION;
        }
        else {
            if (currentSelectedArea == IkioskManager.EMIRADESVERIFICATION || currentSelectedArea == IkioskManager.MRNVERIFICATION) {
                previousSelected = IkioskManager.VERIFICATION;
            }
            else if (currentSelectedArea == IkioskManager.APPOINTMENTSAREA) {
                previousSelected = IkioskManager.MRNVERIFICATION;
            }
            else {
                previousSelected = IkioskManager.MENUSELECTION;
            }
        }
    }
    catch (error) {
        console.log(`${tranId}setBackActionRequest_Catch => `, error);
    }
    console.log(`${tranId}_setBackActionRequest_End => `, previousSelected);
    yield put(actions.backActionResponse(previousSelected))
}

function* mrnSubmittingRequest(action) {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_mrnSubmittingRequest_Start => `, action);
    let currentSelectedArea;
    let tokenTemplate;
    let templatesData;
    let token;
    let mrn;
    let errorMessage;
    let appointmentsData: IKioskAppointmentDto[] | undefined;
    let kioskModel = (yield select())['kioskReducer'] as IKioskModel;
    let selectedMenu: any = kioskModel?.selectedMenu;
    console.log(`${tranId}_mrnSubmittingRequest_selectedMenu => `, selectedMenu);
    switch (selectedMenu + '') {
        case IMenuCodes.REGISTRATION:
        case IMenuCodes.PHARMACY:
        case IMenuCodes.LABORATORY:
            const response = yield call(getTokenGenerationOnKiosk, tranId, action.payload, selectedMenu, kioskModel.kioskId);
            console.log(`${tranId}_mrnSubmittingRequest_API_Response => `, response);
            tokenTemplate = response.tokenTemplate;
            templatesData = response.templatesData;
            token = response.tokenNo;
            mrn = response.mrn;
            errorMessage = response.errorMessage;
            if (!errorMessage) {
                if (!tokenTemplate || !token)
                    errorMessage = 'EM0';
                currentSelectedArea = IkioskManager.TOKENAREA;
            }
            yield put(actions.tokenTemplateAreaResponse(tokenTemplate, templatesData, token, mrn, currentSelectedArea, errorMessage));
            break;
        case IMenuCodes.APPOINTMENT:
            const response2 = yield call(getAppointmentsOnKiosk, tranId, action.payload, kioskModel.kioskId);
            console.log(`${tranId}_mrnSubmittingRequest_API_Response => `, response2);
            appointmentsData = response2.appointmentsData;
            errorMessage = response2.errorMessage;
            currentSelectedArea = IkioskManager.APPOINTMENTSAREA;
            yield put(actions.appointmentsAreaResponse(appointmentsData, currentSelectedArea, errorMessage));
            break;
        case IMenuCodes.FEEDBACK:
            currentSelectedArea = IkioskManager.FEEDBACKAREA;
            yield put(actions.selectedKioskMode(currentSelectedArea, action.payload));
            break;
        default:
            yield put(actions.exitAction());
            break;
    }
    console.log(`${tranId}_mrnSubmittingRequest_End => `, currentSelectedArea);
}


function* getTokenGenerationOnKiosk(tranId, mrnNo, selectedMenu, kioskId) {
    console.log(`${tranId}_getTokenGenerationOnKiosk_Start => `, mrnNo, selectedMenu, kioskId);
    let tokenTemplate;
    let templatesData;
    let tokenNo;
    let errorMessage;
    let mrn;
    try {
        let regComponentAndMethod = getApiServiceUrlByComponentAndMethod(kioskComponent, 'generateTokenByMrnNoAndKiosk');
        regComponentAndMethod.url = regComponentAndMethod.url.replace('{mrnNo}', mrnNo).replace('{kioskIdentifier}', kioskId).replace('{servingType}', selectedMenu);
        console.log(`${tranId}_getTokenGenerationOnKiosk_Api_Request => `, regComponentAndMethod, mrnNo, selectedMenu, kioskId);
        const response = yield call(serviceConsumer, tranId, regComponentAndMethod, null, null);
        console.log(`${tranId}_getTokenGenerationOnKiosk_Api_Response => `, response);
        if (response.status) {
            tokenNo = response.tokenNo;
            mrn = response.mrnNo;
            tokenTemplate = response.tokenTemplate;
            templatesData = (response?.tokenTemplate as string)?.split('{barcode}');
        }
        else {
            errorMessage = response.messages;
        }
    }
    catch (error) {
        console.error(`${tranId}_getTokenGenerationOnKiosk_error => `, error);
        console.log(`${tranId}_getTokenGenerationOnKiosk_catch => `, error);
        errorMessage = 'EM0';
    }
    return { tokenNo, mrn, tokenTemplate, templatesData, errorMessage };
}

function* getAppointmentsOnKiosk(tranId, mrnNo, kioskId) {
    console.log(`${tranId}_getAppointmentsOnKiosk_Start => `, mrnNo, kioskId);
    let appointmentsData;
    let token;
    let errorMessage;
    try {
        let appointmentComponentAndMethod = getApiServiceUrlByComponentAndMethod(kioskComponent, 'getAppointmentsByMrnNoandKioskId');
        appointmentComponentAndMethod.url = appointmentComponentAndMethod.url.replace('{mrnNo}', mrnNo).replace('{kioskIdentifier}', kioskId);
        console.log(`${tranId}_getAppointmentsOnKiosk_Api_Request => `, appointmentComponentAndMethod, mrnNo, kioskId);
        const response = yield call(serviceConsumer, tranId, appointmentComponentAndMethod, null, null);
        console.log(`${tranId}_getAppointmentsOnKiosk_Api_Response => `, response);
        if (response.status) {
            if (response?.kioskAppointmentdto?.length > 0)
                appointmentsData = response.kioskAppointmentdto;
            else
                errorMessage = 'EM3';
        }
        else {
            errorMessage = response.message;
        }
    }
    catch (error) {
        console.error(`${tranId}_getAppointmentsOnKiosk_error => `, error);
        console.log(`${tranId}_getAppointmentsOnKiosk_catch => `, error);
        errorMessage = 'EM0';
    }
    return { appointmentsData, errorMessage };
}

function* appointmentsCheckinRequest(action) {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_appointmentsCheckinRequest_Start => `, action);
    let selectedArea;
    let tokenTemplate;
    let templatesData;
    let tokenNo;
    let mrnNo;
    let errorMessage;
    try {
        let checkinComponentAndMethod = getApiServiceUrlByComponentAndMethod(kioskComponent, 'checkIn');
        checkinComponentAndMethod.url = checkinComponentAndMethod.url.replace('{serviceBookedId}', action.payload);
        console.log(`${tranId}_appointmentsCheckinRequest_Api_Request => `, checkinComponentAndMethod, action.payload);
        const response = yield call(serviceConsumer, tranId, checkinComponentAndMethod, null, null);
        console.log(`${tranId}_appointmentsCheckinRequest_Api_Response => `, response);
        if (response.status) {
            tokenNo = response.tokenNo;
            mrnNo = response.mrnNo;
            tokenTemplate = response.tokenTemplate;
            templatesData = (response?.tokenTemplate as string)?.split('{barcode}');
            selectedArea = IkioskManager.TOKENAREA;
        }
        else {
            errorMessage = response.message;
        }
    }
    catch (error) {
        console.error(`${tranId}_appointmentsCheckinRequest_error => `, error);
        console.log(`${tranId}_appointmentsCheckinRequest_catch => `, error);
        errorMessage = 'EM0';
    }
    console.log(`${tranId}_appointmentsCheckinRequest_End => `, selectedArea, tokenNo, mrnNo, tokenTemplate, errorMessage);
    yield put(actions.appointmentsCheckinResponse(selectedArea, tokenNo, mrnNo, tokenTemplate, templatesData, errorMessage));
}

function* getCurrentDateTimeRequest() {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_getCurrentDateTimeRequest => `,);
    let dateTime;
    try {
        let checkinComponentAndMethod = getApiServiceUrlByComponentAndMethod(kioskComponent, 'getCurrentDate');
        console.log(`${tranId}_getCurrentDateTimeRequest_Api_Request => `, checkinComponentAndMethod);
        const response = yield call(serviceConsumer, tranId, checkinComponentAndMethod, null, null);
        console.log(`${tranId}_getCurrentDateTimeRequest_Api_Response => `, response);
        if (response) {
            dateTime = response.dateTime;
            yield put(actions.getCurrentDateTimeResponse(dateTime));
        }
    }
    catch (error) {
        console.error(`${tranId}_getCurrentDateTimeRequest_error => `, error);
        console.log(`${tranId}_getCurrentDateTimeRequest_catch => `, error);
    }
    console.log(`${tranId}_appointmentsCheckinRequest_End => `, dateTime);
}

function* getFeedbackRequest(action) {
    let tranId = gettranId(KIOSKMODULE);
    console.log(`${tranId}_getFeedbackRequest_Start => `, action);
    let errorMessage;
    let kioskModel = (yield select())['kioskReducer'] as IKioskModel;
    console.log(`${tranId}_getFeedbackRequest_kioskModel => `, kioskModel);
    let requestData;
    if (kioskModel) {
        requestData = {
            kioskIdentifier: kioskModel.kioskId,
            mrnNo: kioskModel.mrnNo,
            rating: action.payload
        };
    }
    try {
        let feedbackComponentAndMethod = getApiServiceUrlByComponentAndMethod(kioskComponent, 'createFeedBack');
        console.log(`${tranId}_getFeedbackRequest_Api_Request => `, feedbackComponentAndMethod, requestData);
        const response = yield call(serviceConsumer, tranId, feedbackComponentAndMethod, requestData, null);
        console.log(`${tranId}_getFeedbackRequest_Api_Response => `, response);
        if (!response.status)
            errorMessage = response.messages;
    }
    catch (error) {
        console.error(`${tranId}_getFeedbackRequest_error => `, error);
        console.log(`${tranId}_getFeedbackRequest_catch => `, error);
        errorMessage = 'EM0';
    }
    console.log(`${tranId}_getFeedbackRequest_End => `, errorMessage);
    yield put(actions.getFeedbackResponse(errorMessage));
}

function* kioskWatcher() {
    while (true) {
        const tl1 = yield takeLatest(types.SET_KIOSK_ID_AND_GET_MENUS_DATA_REQUEST, getThemsAndMenusData);
        const tl2 = yield takeLatest(types.SET_LANGUAGE_REQUEST, getMenusDataAfterLanguageSelection);
        const tl3 = yield takeLatest(types.SET_KIOSK_MENU_SELECTION_REQUEST, setKioskNameSelectionRequest);
        const tl4 = yield takeLatest(types.BACK_ACTION_REQUEST, setBackActionRequest);
        const tl5 = yield takeLatest(types.MRN_SUBMIT_REQUEST, mrnSubmittingRequest);
        const tl6 = yield takeLatest(types.APPOINTMENT_CHECKEIN_REQUEST, appointmentsCheckinRequest);
        const tl7 = yield takeLatest(types.GET_CURRENT_DATE_TIME_REQUEST, getCurrentDateTimeRequest);
        const tl8 = yield takeLatest(types.GET_FEEDBACK_REQUEST, getFeedbackRequest);
        yield take(types.EXIT_ACTION);
        yield cancel([tl1, tl2, tl3, tl4, tl5, tl6, tl7, tl8]);
    }
}

function* kioskSaga() {
    yield all([fork(kioskWatcher)]);
}
export default kioskSaga;