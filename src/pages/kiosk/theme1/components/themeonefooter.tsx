import React from "react";
import { Row, Col } from 'reactstrap';
import back from '../../../../images/back.svg';
import exit from '../../../../images/next-button.svg';
import { useSelector, useDispatch } from 'react-redux';
import { IKioskModel, IkioskManager } from "../../../../models/kioskModel";
import { exitAction, backActionRequest } from "../../../../store/actions";
import '../../Kiosk.css';
import { useTranslation } from "react-i18next";

const ThemeOneFooter: React.FC = () => {

    const { t } = useTranslation("translations");

    const selectionArea = useSelector(state => {
        if (state?.kioskReducer?.selectedArea)
            return (state.kioskReducer as IKioskModel).selectedArea;
        else return IkioskManager.HOME;
    });
    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });
    console.log("ThemeOneFooter =>", selectionArea, language);
    const dispatch = useDispatch();

    return (
        <>
            <div className="kiosk-footer">
                <Row className="m-0">
                    <Col sm="6" xs="6" className="footerLeft">
                        <div className="copyRight">&copy; {t('Kiosk.2020Vectramind' + language)}</div>
                    </Col>
                    {selectionArea !== IkioskManager.HOME && selectionArea !== IkioskManager.ERRORBLOCKAREA && <Col sm="6" xs="6" className="text-right">
                        {/* <img src={back} alt="" width="80" onClick={() => { dispatch(backActionRequest()) }} /> */}
                        <img src={exit} alt="" width="80" onClick={() => { dispatch(exitAction()) }} />
                    </Col>}

                </Row>
            </div>

        </>
    )
}
export default React.memo(ThemeOneFooter);