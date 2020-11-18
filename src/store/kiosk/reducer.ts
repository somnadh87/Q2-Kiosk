
import * as _ from 'lodash';
import { IKioskModel, IkioskManager } from '../../models/kioskModel';
import * as types from './actionTypes';

const initialState = {} as IKioskModel;

const kioskReducer = (state = initialState, action) => {
    let undefinedData;
    switch (action.loadingType) {
        case types.SET_LOADING:
            state = {
                ...state,
                loading: action.loadPayload
            }
            break;
        default:
            break;
    }

    switch (action.type) {
        case types.SET_KIOSK_ID_AND_GET_MENUS_DATA_RESPONSE:
            const { kioskId, themeName, menusData, errorMessag } = action.payload;
            state = {
                ...state,
                kioskId: kioskId
            }
            if (!errorMessag) {
                state = {
                    ...state,
                    theme: themeName,
                    menusData: menusData
                }
            }
            else
                state = {
                    ...state,
                    errorMessage: errorMessag
                }
            break;

        case types.SET_LANGUAGE_RESPONSE:
            const { language, menuData } = action.payload;
            state = {
                ...state,
                menusData: menuData,
                language: language,
                selectedArea: IkioskManager.MENUSELECTION
            }
            break;
        case types.SET_KIOSK_MENU_SELECTION_RESPONCE:
            const { selectedMenu, selectedArea, errorMessage } = action.payload
            if (selectedArea) {
                state = {
                    ...state,
                    selectedArea: selectedArea,
                    selectedMenu: selectedMenu,
                    errorMessage: errorMessage,
                }
            }
            else {
                state = {
                    ...state,
                    selectedMenu: undefinedData,
                    templateData: undefinedData,
                    errorMessage: undefinedData,
                    selectedArea: IkioskManager.HOME
                }
            }
            break;
        case types.SUSPEND_ERROR_METHOD:
            state = {
                ...state,
                errorMessage: undefinedData,
                selectedArea: IkioskManager.HOME
            }
            break;
        case types.BACK_ACTION_RESPONSE:
            state = {
                ...state,
                selectedArea: action.payload
            }
            break;
        case types.EXIT_ACTION:
            state = {
                ...state,
                language: undefinedData,
                selectedArea: IkioskManager.HOME,
                mrnNo: undefinedData,
                selectedMenu: undefinedData,
                appointmentsData: undefinedData,
                errorMessage: undefinedData,
                tokenNo: undefinedData,
                templateData: undefinedData
            }
            break;
        case types.TOKEN_TEMPLATE_AREA_RESPONSE:
            const { tokenTemplate, templatesData, token, mrn, currentSelectedArea, errorMsg } = action.payload;
            if (!errorMsg)
                state = {
                    ...state,
                    templateData: {
                        templateOrg: tokenTemplate,
                        templates: templatesData,
                        mrnNo: mrn,
                        tokenNo: token
                    },
                    tokenNo: token,
                    selectedArea: currentSelectedArea,
                    errorMessage: errorMsg
                }
            else
                state = {
                    ...state,
                    errorMessage: errorMsg
                }
            break;
        case types.APPOINTMENTS_AREA_RESPONSE:
            state = {
                ...state,
                appointmentsData: action.payload.appointmentsData,
                selectedArea: action.payload.currentSelectedArea,
                errorMessage: action.payload.errorMsg
            }
            break;
        case types.SELECTED_KIOSK_MODE:
            state = {
                ...state,
                selectedArea: action.payload.mode,
                mrnNo: action.payload.mrnNo
            }
            break;
        case types.APPOINTMENT_CHECKEIN_RESPONSE:
            if (!action.payload.errorMsge)
                state = {
                    ...state,
                    selectedArea: action.payload.selectedArea,
                    tokenNo: action.payload.tokenNo,
                    templateData: {
                        templateOrg: action.payload.tokenTemplate,
                        templates: action.payload.templatesData,
                        mrnNo: action.payload.mrnNo,
                        tokenNo: action.payload.tokenNo
                    },
                }
            else
                state = {
                    ...state,
                    errorMessage: action.payload.errorMsge
                }
            break;
        case types.GET_CURRENT_DATE_TIME_RESPONSE:
            state = {
                ...state,
                dateTime: action.payload
            }
            break;
        case types.GET_FEEDBACK_RESPONSE:
            state = {
                ...state,
                errorMessage: action.payload
            }
            break;
        case types.GET_EMIRATES_ID_RESPONSE:
            if (action.payload.errorMessage)
                state = {
                    ...state,
                    emiratesData: undefinedData,
                    mrnNo: undefinedData,
                    errorMessage: action.payload.errorMessage
                }
            else
                state = {
                    ...state,
                    emiratesData: action.payload.data,
                    mrnNo: action.payload.mrnNo,
                    errorMessage: ''
                }
            break;
        default:
            state = { ...state };
            break;
    }
    // console.log("kioskReducer =>:::", state);
    return state;
}
export default kioskReducer;