import React from 'react';
import { Row, Col } from 'reactstrap';
import { setLanguageRequest } from '../../../../store/actions';
import { useDispatch } from 'react-redux';
import { Ilanguages } from './../../../../models/utilitiesModel';
import { useTranslation } from 'react-i18next';

const ThemeOneHome: React.FC = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation("translations");

    return (
        <>
            <div className="kiosk-content bgImage">
                <Row className="content-sec w95 pb-2">
                    <Col sm="6" className="welcometext">
                        <div>
                            <h2>{t('Kiosk.welcome')}</h2>
                            <p>{t('Kiosk.pleaseSelectTheAppropriateLanguage')}</p>
                        </div>
                    </Col>
                    <Col sm="6" className="align-center pad-left0">
                        <button className="languagebtn" onClick={() => { dispatch(setLanguageRequest(Ilanguages.ENG)) }}>{t('Kiosk.eng')}</button>
                        <button className="languagebtn" onClick={() => { dispatch(setLanguageRequest(Ilanguages.ARB)) }}>{t('Kiosk.arb')}</button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default React.memo(ThemeOneHome);