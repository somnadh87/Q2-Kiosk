import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { persistStoreData } from './store';
import Axios from 'axios';
import { setAppsetting, setApiUrlsData } from './helpers/configandapiurls';
import * as _ from 'lodash';
import { I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { PersistGate } from 'redux-persist/integration/react';

async function loadapi() {

    console.log("consoleLogE=>", window['consoleLogE']);
    if (process.env.NODE_ENV === 'production') {
        let consoleLog = window['consoleLogE'] ? window['consoleLogE'] : false;
        if (!consoleLog)
            console.log = function () { };
    }
    let optionsdata = {
        params: { currentHash: (new Date().getTime()) + '' }
    };
    let data = await Axios.all([
        Axios.get('assets/config/appsettings.json', optionsdata),
        Axios.get('assets/config/ControlSettings.json', optionsdata),
        Axios.get('assets/i18n/en.json', optionsdata)
    ]).then(response => {
        console.log("ControlSettings=>111111", response);
        if (response[1].status === 200) {
            let apiUrls = response[1].data;
            console.log(response, apiUrls);
            let serviceUrl = apiUrls.baseUrl;
            let baseUrl = apiUrls.baseUrl;
            _.forEach(apiUrls.components, (apiUrl) => {
                if (apiUrl.apiUrl !== "")
                    baseUrl = apiUrl.apiUrl;
                else
                    baseUrl = serviceUrl;
                return _.forEach(apiUrl.methods, (apiMethod) => {
                    apiMethod.url = baseUrl + apiMethod.url;
                    return apiMethod
                });
            });
            apiUrls = apiUrls.components;
            setApiUrlsData(apiUrls);
            console.log("ControlSettings final =>", apiUrls);
        }
        if (response[0].status === 200) {
            setAppsetting(response[0].data);
        }
        // if (response.status === 400 || response.status === 500)
        //     throw response.data;
        return response;
    }).catch(err => {
        console.log("ControlSettings=>", err);
        return false;
    });
    console.log("data=>", data);
    if (data) {
        let enjson = data.length >= 3 ? (data[2].status === 200 ? data[2].data : {}) : {};
        console.log("enjson=>", enjson);

        i18n.use(LanguageDetector)
            .init({
                debug: true,
                lng: "en",
                fallbackLng: "en", // use en if detected lng is not available
                keySeparator: '.', // we do not use keys in form messages.welcome
                nsSeparator: true,
                interpolation: {
                    escapeValue: false // react already safes from xss
                },
                resources: {
                    en: {
                        translations: enjson
                    }
                },
            })

        const app = (
            <Provider store={store}>
                <PersistGate persistor={persistStoreData().persistor}>
                    <I18nextProvider i18n={i18n}>
                        <HashRouter>
                            <App />
                        </HashRouter>
                    </I18nextProvider>
                </PersistGate>
            </Provider>
        );
        ReactDOM.render(app, document.getElementById('root'));
        // serviceWorker.unregister();
    }
    // else {
    //     const app = (
    //             <HashRouter>
    //               <h1>Loading</h1>
    //             </HashRouter>
    //     );
    //     setTimeout(() => {
    //         ReactDOM.render(app, document.getElementById('root'));
    //        // loadapi();
    //     }, 50000);
    // }

}

loadapi();

// ReactDOM.render(app, document.getElementById('root'));
// serviceWorker.unregister();
