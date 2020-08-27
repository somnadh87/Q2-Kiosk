import React from "react";
import { Row, Col } from 'reactstrap';
import '../../Kiosk.css';
import { useTranslation } from "react-i18next";
import { IKioskModel, IKioskAppointmentDto } from "../../../../models/kioskModel";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { appointmentsCheckinRequest } from '../../../../store/actions';

const ThemeOneAppointmentsList: React.FC = () => {

    const { t } = useTranslation("translations");
    const dispatch = useDispatch();
    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });

    const appointmentsData: IKioskAppointmentDto[] = useSelector(state => {
        if (state?.kioskReducer?.appointmentsData)
            return (state.kioskReducer as IKioskModel).appointmentsData;
        else return [];
    });
    console.log("ThemeOneAppointmentsList =>", language, appointmentsData);


    return (
        <>
            {appointmentsData && appointmentsData.length > 0 && <div className="kiosk-content pr-0">
                <div className="content-sec w100">
                    <div className="appointments-text">
                        <h2>{t('Kiosk.appointments' + language)}</h2>
                        <div className="appointments-container">
                            {appointmentsData && appointmentsData.length > 0 && appointmentsData.map((item, index) => {
                                return (
                                    <div className="appointment" key={index}>
                                        <div className="appointment-property">
                                            <div className="appointment-value">{item.patientName}</div>
                                            <div className="appointment-key">{t('Kiosk.patientName' + language)}</div>
                                        </div>

                                        <div className="appointment-property">
                                            <div className="appointment-value">{item.doctorName}</div>
                                            <div className="appointment-key">{t('Kiosk.doctor' + language)}</div>
                                        </div>

                                        <div className="appointment-property">
                                            <div className="appointment-value">{item.departmentName}</div>
                                            <div className="appointment-key">{t('Kiosk.department' + language)}</div>
                                        </div>

                                        <div className="appointment-property">
                                            <Row>
                                                <Col sm="6">
                                                    <div className="appointment-property">
                                                        <div className="appointment-value">{item.appointmentTime}</div>
                                                        <div className="appointment-key">{t('Kiosk.appointmentTime' + language)}</div>
                                                    </div>
                                                </Col>

                                                {/* <Col sm="6">
                                                    <div className="appointment-property">
                                                        <div className="appointment-value">18 Mar 2020</div>
                                                        <div className="appointment-key">{t('Kiosk.appointmentDate' + language)}</div>
                                                    </div>
                                                </Col> */}
                                            </Row>
                                        </div>

                                        <div className="appointment-button">
                                            <button type="button" className="btn btn-primary" onClick={() => { dispatch(appointmentsCheckinRequest(item.serviceBookedId)) }}>{t('Kiosk.checkIn' + language)}</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>}
        </>
    )
}
export default React.memo(ThemeOneAppointmentsList);