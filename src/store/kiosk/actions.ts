import * as types from './actionTypes';

export const setkioskIdAndGetTokensDataRequest = (kioskId, action) => {
    if (action)
        return {
            type: types.SET_KIOSK_ID_AND_GET_MENUS_DATA_REQUEST,
            payload: { kioskId, action },
            loadingType: types.SET_LOADING,
            loadPayload: true
        }
    else
        return {
            type: types.SET_KIOSK_ID_AND_GET_MENUS_DATA_REQUEST,
            payload: { kioskId, action }
        }
};
export const setKioskIdAndGetMenusDataResponse = (kioskId, themeName, menusData, action, errorMessag) => {
    if (action)
        return {
            type: types.SET_KIOSK_ID_AND_GET_MENUS_DATA_RESPONSE,
            payload: { kioskId, themeName, menusData, errorMessag },
            loadingType: types.SET_LOADING,
            loadPayload: false
        }
    else
        return {
            type: types.SET_KIOSK_ID_AND_GET_MENUS_DATA_RESPONSE,
            payload: { kioskId, themeName, menusData }
        }
};
export const setLanguageRequest = (lang) => ({
    type: types.SET_LANGUAGE_REQUEST,
    loadingType: types.SET_LOADING,
    loadPayload: true,
    payload: lang
})
export const setLanguageResponse = (language, menuData) => ({
    type: types.SET_LANGUAGE_RESPONSE,
    loadingType: types.SET_LOADING,
    loadPayload: false,
    payload: { language, menuData }
})
export const menuSelectionRequest = (selectedMenu) => ({
    type: types.SET_KIOSK_MENU_SELECTION_REQUEST,
    payload: selectedMenu,
    loadPayload: true,
    loadingType: types.SET_LOADING,
})

export const menuSelectionResponce = (selectedMenu, selectedArea, errorMessage) => ({
    type: types.SET_KIOSK_MENU_SELECTION_RESPONCE,
    payload: { selectedMenu, selectedArea, errorMessage },
    loadPayload: false,
    loadingType: types.SET_LOADING,
})

export const selectedKioskMode = (mode, mrnNo) => ({
    type: types.SELECTED_KIOSK_MODE,
    payload: { mode, mrnNo }
});


export const suspendErrorMethod = () => ({
    type: types.SUSPEND_ERROR_METHOD,
    // payload : errorMessage,
    // loadPayload: false,
    // loadingType: types.SET_LOADING,
})

export const exitAction = () => ({
    type: types.EXIT_ACTION,
    loadPayload: false,
    loadingType: types.SET_LOADING,
})

export const backActionRequest = () => ({
    type: types.BACK_ACTION_REQUEST,
    loadPayload: true,
    loadingType: types.SET_LOADING,
})

export const backActionResponse = (selectedArea) => ({
    type: types.BACK_ACTION_RESPONSE,
    payload: selectedArea,
    loadPayload: false,
    loadingType: types.SET_LOADING,
});

export const mrnSubmitRequest = (mrnNumber) => ({
    type: types.MRN_SUBMIT_REQUEST,
    payload: mrnNumber,
    loadPayload: true,
    loadingType: types.SET_LOADING,
});


export const tokenTemplateAreaResponse = (tokenTemplate, templatesData, token, mrn, currentSelectedArea, errorMsg) => {
    return {
        type: types.TOKEN_TEMPLATE_AREA_RESPONSE,
        payload: { tokenTemplate, templatesData, token, mrn, currentSelectedArea, errorMsg },
        loadPayload: false,
        loadingType: types.SET_LOADING,
    }
}

export const appointmentsAreaResponse = (appointmentsData, currentSelectedArea, errorMsg) => {
    return {
        type: types.APPOINTMENTS_AREA_RESPONSE,
        payload: { appointmentsData, currentSelectedArea, errorMsg },
        loadPayload: false,
        loadingType: types.SET_LOADING,
    }
}
export const appointmentsCheckinRequest = (requestId) => {
    return {
        type: types.APPOINTMENT_CHECKEIN_REQUEST,
        payload: requestId,
        loadPayload: true,
        loadingType: types.SET_LOADING,
    }
}
export const appointmentsCheckinResponse = (selectedArea, tokenNo, mrnNo, tokenTemplate, templatesData, errorMsge) => {
    return {
        type: types.APPOINTMENT_CHECKEIN_RESPONSE,
        payload: { selectedArea, tokenNo, mrnNo, tokenTemplate, templatesData, errorMsge },
        loadPayload: false,
        loadingType: types.SET_LOADING,
    }
}

export const getCurrentDateTimeRequest = () => {
    return {
        type: types.GET_CURRENT_DATE_TIME_REQUEST
    }
}
export const getCurrentDateTimeResponse = (dataTime) => {
    return {
        type: types.GET_CURRENT_DATE_TIME_RESPONSE,
        payload: dataTime
    }
}

export const getFeedbackRequest = (feedback) => {
    return {
        type: types.GET_FEEDBACK_REQUEST,
        payload: feedback,
        loadPayload: true,
        loadingType: types.SET_LOADING,
    }
}
export const getFeedbackResponse = (errorMsg) => {
    return {
        type: types.GET_FEEDBACK_RESPONSE,
        payload: errorMsg,
        loadPayload: false,
        loadingType: types.SET_LOADING,
    }
}




