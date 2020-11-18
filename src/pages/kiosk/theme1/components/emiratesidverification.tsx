import React, { useEffect } from "react";
import '../../Kiosk.css';
import emiratescard from '../../../../images/emirates-card.svg';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { IKioskModel } from "../../../../models/kioskModel";

import { getEmiratesIdRequest } from '../../../../store/actions';

const EmiratesIdVerification: React.FC = () => {

    const { t } = useTranslation("translations");
    const dispatch = useDispatch();
    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });

    useEffect(() => {
        setTimeout(() => {
            dispatch(getEmiratesIdRequest('')); // pass emiratedId 
        }, 5000);
    }, []);


    return (
        <>
            <div className="kiosk-content">
                <div className="content-sec w70 text-center verfcontent">
                    <img src={emiratescard} width="210" alt="" />
                    <div style={{ marginLeft: "50px" }}>
                        <h2 className="mb-0 mt-0">{t('Kiosk.pleaseInsertYour' + language)}</h2>
                        <h1 style={{ marginBottom: "20px" }}>{t('Kiosk.emiratesIDSmartCard' + language)}</h1>
                    </div>
                </div>
            </div>

        </>
    )
}
export default React.memo(EmiratesIdVerification);