import React, { useState, useEffect } from "react";
import happy from '../../../../images/happy.svg';
import neutral from '../../../../images/neutral.svg';
import sad from '../../../../images/sad.svg';
import happyActive from '../../../../images/happy-active.svg';
import neutralActive from '../../../../images/neutral-active.svg';
import sadActive from '../../../../images/sad-active.svg';
import { useSelector, useDispatch } from 'react-redux';
import { IKioskModel, IFeedBackEnums } from "models/kioskModel";
import '../../Kiosk.css';
import { useTranslation } from "react-i18next";
import { exitAction, getFeedbackRequest } from '../../../../store/actions';
import { getShowMessageTime } from '../../../../helpers/helpersIndex';

let setTime;
const ThemeOneFeedback: React.FC = () => {

    const { t } = useTranslation("translations");
    const dispatch = useDispatch();
    const [feedbackState, setFeedbackState] = useState('');

    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });

    const updateFeedback = (feedBack) => {
        console.log("updateFeedback =>", feedBack);
        setFeedbackState(feedBack);
        dispatch(getFeedbackRequest(feedBack));
    }

    if (feedbackState !== '') {
        setTime = setTimeout(() => {
            dispatch(exitAction());
        }, getShowMessageTime() * 1000);
    }

    useEffect(() => {
        return () => {
            if (setTime)
                clearTimeout(setTime);
        }
    }, [])


    return (
        <>
            <div className="kiosk-content">
                <div className="content-sec w70 text-center feedback-sec">
                    {feedbackState === '' && <img src={happy} alt="" onClick={() => updateFeedback(IFeedBackEnums.HAPPY)} />}
                    {feedbackState === IFeedBackEnums.HAPPY && <img src={happyActive} alt="" />}
                    {feedbackState !== IFeedBackEnums.HAPPY && feedbackState !== '' && <img src={happy} alt="" />}

                    {feedbackState === '' && <img src={neutral} alt="" onClick={() => updateFeedback(IFeedBackEnums.NATURAL)} />}
                    {feedbackState === IFeedBackEnums.NATURAL && <img src={neutralActive} alt="" />}
                    {feedbackState !== IFeedBackEnums.NATURAL && feedbackState !== '' && <img src={neutral} alt="" />}

                    {feedbackState === '' && <img src={sad} alt="" onClick={() => updateFeedback(IFeedBackEnums.SAD)} />}
                    {feedbackState === IFeedBackEnums.SAD && <img src={sadActive} alt="" />}
                    {feedbackState !== IFeedBackEnums.SAD && feedbackState !== '' && <img src={sad} alt="" />}

                    <p>{t('Kiosk.howWasYourExperienceWithOurTeam' + language)}</p>
                </div>
            </div>
        </>
    )
}
export default React.memo(ThemeOneFeedback);