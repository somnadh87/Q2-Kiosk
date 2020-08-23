import React, { useEffect } from "react";
import { Row, Col } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import Barcode from 'react-barcode';
import { IKioskModel, ITemplateData } from "../../../../models/kioskModel";


const ThemeOneTokenGeneration: React.FC = () => {

    const { t } = useTranslation("translations");
    let templateData: ITemplateData = useSelector(state => {
        if (state && state.kioskReducer && state.kioskReducer.templateData)
            return state.kioskReducer.templateData;
        else return undefined;
    });
    let tokenNo = useSelector(state => {
        if (state && state.kioskReducer && state.kioskReducer.tokenNo)
            return state.kioskReducer.tokenNo;
        else return undefined;
    });
    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });
    console.log("ThemeOneTokenGeneration =>", templateData, tokenNo);

    useEffect(() => {
        if (templateData && templateData.templates) {
            (document.getElementById('tokenTemplate1') as any).innerHTML = templateData.templates.length >= 1 ? templateData.templates[0] : '';
            (document.getElementById('tokenTemplate2') as any).innerHTML = templateData.templates.length >= 2 ? templateData.templates[1] : '';
        }
    }, [templateData]);

    return (
        <>
            {templateData && templateData.templates && <div className="kiosk-content">
                <Row className="w60 text-center">
                    <Col sm="6" className="pad-0">
                        <div className="tableCard">
                            <section id="tokenTemplate1"></section>
                            {templateData.mrnNo && <section id="barcodeTemplate" className="text-center">
                                <Barcode
                                    value={templateData.mrnNo}
                                    textMargin={-5}
                                    marginTop={0}
                                    height={50}
                                    displayValue={true}
                                />
                            </section>}
                            <section id="tokenTemplate2"></section>
                        </div>
                    </Col>

                    <Col sm="6" className="content-sec tokenmsg pad-0">
                        <div className="text-right">
                            <h3>{t('Kiosk.thankYou' + language)}</h3>
                            <h1>{templateData.tokenNo}</h1>
                            <p>{t('Kiosk.tokenGeneratedSuccessfully' + language)}</p>
                        </div>
                    </Col>

                </Row>
            </div>}
        </>
    )
}
export default React.memo(ThemeOneTokenGeneration);