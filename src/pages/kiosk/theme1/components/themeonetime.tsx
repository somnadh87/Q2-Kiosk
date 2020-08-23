import React, { useState, useEffect } from "react";
import moment from 'moment';
import { useSelector } from 'react-redux';
import { interval } from "rxjs";
import { IKioskModel } from "../../../../models/kioskModel";

let subscribe;

const ThemeOneTime: React.FC = () => {

    const rawDataTime = useSelector(state => {
        if (state?.kioskReducer?.dateTime)
            return (state.kioskReducer as IKioskModel).dateTime;
        else return undefined;
    });
    const dateTime = rawDataTime.replace(/\s/g, "T");

    const [currentDateTime, setcurrentDateTime] = useState(new Date(dateTime).getTime());
    // console.log("ThemeOneTime =>", currentDateTime);


    useEffect(() => {
        subscribe = interval(1000).subscribe(x => {
            let newDateTime = currentDateTime;
            newDateTime = newDateTime + 1000;
            if (new Date(dateTime).getTime() > newDateTime)
                newDateTime = new Date(dateTime).getTime();
            setcurrentDateTime(newDateTime);
        })
        return () => {
            if (subscribe)
                subscribe.unsubscribe();
        }
    });



    return (
        <>
            <p className="time">{moment(currentDateTime).format('hh:mm A')}</p>
            <p className="day">{moment(currentDateTime).format('DD MMMM YYYY')}</p>
        </>
    )
}
export default React.memo(ThemeOneTime);