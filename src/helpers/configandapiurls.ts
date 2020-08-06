
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
const getShowMessagecode = () => {
    return appsetting.showMessagecode
}
const getAutoRefresing = () => {
    return appsetting.autoRefresing
}
const getTokenServingInterval = () => {
    return appsetting.tokenServingInterval;
}
const getautoRefreshTime = () => {
    return typeof (appsetting.autoRefreshTime) === 'number' ? (appsetting.autoRefreshTime * 1000) : 30000;
}
const getSessionTime = () => {
    return typeof (appsetting.sessionTime) === 'number' ? appsetting.sessionTime : 20;
}

export { getShowMessagecode, getAutoRefresing,getTokenServingInterval, getautoRefreshTime, getSessionTime, setAppsetting, getAppsetting, setApiUrlsData, getApiServiceUrlByComponentAndMethod }
