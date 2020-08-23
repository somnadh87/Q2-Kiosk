import React from "react";
import { Row, Col } from 'reactstrap';
import emiratesverf from '../../../../images/verification.svg';
import { selectedKioskMode } from "../../../../store/actions";
import { useDispatch, useSelector } from 'react-redux';
import { IKioskModel, IAppointments, IkioskManager } from "models/kioskModel";
import { useTranslation } from "react-i18next";

const ThemeOneVerificationMode: React.FC = () => {

    const { t } = useTranslation("translations");

    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });

    const dispatch = useDispatch();
    // const context = useContext(SuperParentContext);



    return (
        <>
            <div className="kiosk-content bgImage">
                <Row className="content-sec w90">
                    <Col sm="6" className="welcometext">
                        <div>
                            <h2>{t('Kiosk.verification' + language)}</h2>
                            <p>{t('Kiosk.pleaseSelectTheModeOfVerification' + language)}</p>
                        </div>
                    </Col>

                    <Col sm="6" className="align-center">
                        <button className="verification-btn" onClick={() => dispatch(selectedKioskMode(IkioskManager.EMIRADESVERIFICATION, undefined))}>
                            <div>
                                {t('Kiosk.EMIRATESID' + language)}<br />{t('Kiosk.SMARTCARD' + language)}
                                <img src={emiratesverf} alt="" width="80" />
                            </div>
                        </button>
                        <button className="verification-btn mleft-10" onClick={() => dispatch(selectedKioskMode(IkioskManager.MRNVERIFICATION, undefined))}>
                            {t('Kiosk.MRNID' + language)}
                        </button>
                    </Col>
                </Row>
            </div>


        </>
    )
}
export default React.memo(ThemeOneVerificationMode);