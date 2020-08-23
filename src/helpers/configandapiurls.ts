
import * as _ from 'lodash';
import { IApiUrls, Settings, IApiMethod } from '../models/utilitiesModel';

let apiurlsData: IApiUrls[] = [];
let appsetting: Settings;
const getApiServiceUrlByComponentAndMethod = (compName, methodName) => {
    let iapiMethods = _.pick(_.filter(apiurlsData, { component: compName })[0], ['methods']);
    let iapiMethod1 = (_.filter(iapiMethods['methods'], { name: methodName })[0]) as IApiMethod;
    let iapiMethod = { name: iapiMethod1.name, type: iapiMethod1.type, url: iapiMethod1.url } as IApiMethod
    console.log("_iapiMethod=>", iapiMethod);
    return iapiMethod;
}
const setApiUrlsData = (data) => {
    apiurlsData = data;
}
const setAppsetting = (data: Settings) => {
    appsetting = data;
}
const getAppsetting = () => {
    return appsetting;
}
const gettranId = (modulesCode?: string) => {
    return modulesCode ? `${modulesCode}${Math.random().toString(36).slice(7)}` : (Math.random().toString(36).slice(7)) + '';
}
const getIntervalCall = () => {
    return appsetting.intervalCall;
}
const getSessionReset = () => {
    return appsetting.sessionReset;
}
const getShowMessageTime = () => {
    return appsetting.showMessageTime;
}
const getDateTimeInterval = () => {
    return appsetting.dateTimeInterval;
}
export { getDateTimeInterval, getSessionReset, getShowMessageTime, setAppsetting, getAppsetting, setApiUrlsData, getApiServiceUrlByComponentAndMethod, getIntervalCall, gettranId }
