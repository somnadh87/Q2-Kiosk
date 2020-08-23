import React from "react";
import errorimg from '../../../../images/error.png';
import { Modal, ModalBody } from 'reactstrap';
import close from '../../../../images/close.svg';
import '../../Kiosk.css';
import { IKioskModel } from "models/kioskModel";
import { useSelector, useDispatch } from 'react-redux';
import { suspendErrorMethod } from "../../../../store/actions";
import { getShowMessageTime } from '../../../../helpers/helpersIndex';
import { useTranslation } from "react-i18next";

let setinterval;

const ThemeOneErrorBlock: React.FC = () => {

    const { t } = useTranslation("translations");
    const errorMessage = useSelector(state => {
        if (state?.kioskReducer?.errorMessage)
            return (state.kioskReducer as IKioskModel).errorMessage;
        else return undefined;
    });
    console.log("ThemeOneErrorBlock =>", errorMessage);
    const dispatch = useDispatch();

    const suspendErrorInitiate = () => {
        dispatch(suspendErrorMethod());
        if (setinterval)
            clearTimeout(setinterval);
    }

    if (errorMessage) {
        setinterval = setTimeout(() => {
            suspendErrorInitiate();
        }, getShowMessageTime() * 1000);
    }


    return (
        <>

            {errorMessage && errorMessage !== '' &&
                <Modal isOpen={errorMessage !== '' ? true : false}>
                    <ModalBody>
                        <div className="kiosk-content">
                            <div className="errorMessage">
                                <div className="close-button" onClick={suspendErrorInitiate}>
                                    <img src={close} alt="" width="30" />
                                </div>
                                <img src={errorimg} alt="" />
                                {errorMessage === 'EM0' && <p>{t('errorMessage.EM1')}<br /> {t('errorMessage.EM2')}</p>}
                                {errorMessage !== 'EM0' && <p>{t('errorMessage.' + errorMessage) === 'errorMessage.' + errorMessage ? errorMessage : t('errorMessage.' + errorMessage)}</p>}
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            }
        </>
    )
}
export default React.memo(ThemeOneErrorBlock);