import React, { useEffect, useContext } from "react";
import { Row, Col } from 'reactstrap';
import headerlogo from '../../../../images/firstpasslogo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { interval } from "rxjs";
import { ParentContext } from '../../Container/kioskcontext';
import { getCurrentDateTimeRequest } from '../../../../store/actions';
import { getDateTimeInterval } from '../../../../helpers/helpersIndex';

let subscribe;

const ThemeOneTopBar: React.FC = () => {

    const dispatch = useDispatch();
    const context = useContext(ParentContext);

    const dataTime = useSelector(state => {
        if (state?.kioskReducer?.dateTime)
            return true;
        else return false;
    });

    useEffect(() => {
        dispatch(getCurrentDateTimeRequest());
        subscribe = interval(60000 * getDateTimeInterval()).subscribe(x => {
            dispatch(getCurrentDateTimeRequest());
        })
        return () => {
            if (subscribe)
                subscribe.unsubscribe();
        }
    }, [])



    return (
        <>
            {/* Header */}

            <div className="topbar">
                <Row className="m-0 topheader">
                    <Col sm="6" xs="6">
                        <img src={headerlogo} alt="" width="150" />
                    </Col>
                    <Col sm="6" xs="6" className="date-time">
                        {dataTime && <context.ThemeOneTime />}
                    </Col>
                </Row>
            </div>


        </>
    )
}
export default React.memo(ThemeOneTopBar);