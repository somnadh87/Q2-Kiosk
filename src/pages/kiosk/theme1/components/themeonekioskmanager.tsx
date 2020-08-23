import React, { useContext } from "react";
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Ilanguages } from "../../../../models/utilitiesModel";
import { SuperParentContext } from "../../Container/kioskcontext";
import { IKioskModel, IkioskManager } from "../../../../models/kioskModel";

const ThemeOneKioskManager: React.FC = () => {
    const dispatch = useDispatch();
    const Context = useContext(SuperParentContext);
    const selectionArea = useSelector(state => {
        if (state?.kioskReducer?.selectedArea)
            return (state.kioskReducer as IKioskModel).selectedArea;
        else return IkioskManager.HOME;
    });

    console.log("selectionArea::", selectionArea);

    const getSelectedAreaComponent = (value) => {
        console.log('getSelectedAreaComponent=>', value);

        switch (value) {
            case IkioskManager.MENUSELECTION:
                return <Context.ThemeOneMenus />;
            case IkioskManager.VERIFICATION:
                return <Context.ThemeOneVerificationMode />;
            case IkioskManager.MRNVERIFICATION:
                return <Context.MrnVerfication />;
            case IkioskManager.EMIRADESVERIFICATION:
                return <Context.EmiratesIdVerification />;
            case IkioskManager.TOKENAREA:
                return <Context.ThemeOneTokenGeneration />;
            case IkioskManager.APPOINTMENTSAREA:
                return <Context.ThemeOneAppointmentsList />;
            case IkioskManager.FEEDBACKAREA:
                return <Context.ThemeOneFeedback />;
            default:
                return <Context.ThemeOneHome />;
        }

    }
    return (
        <>

            {/* Language */}

            {getSelectedAreaComponent(selectionArea)}
            <Context.ThemeOneErrorBlock />

        </>
    )
}
export default React.memo(ThemeOneKioskManager);