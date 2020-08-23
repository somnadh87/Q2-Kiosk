import * as React from 'react';
import { connect } from 'react-redux';
import { setkioskIdAndGetTokensDataRequest } from '../../../store/actions';
import { SuperParentContext } from './kioskcontext';
import { interval } from 'rxjs';
import {
    ThemeOneHome,
    ThemeOneTopBar,
    ThemeOneKioskContainer,
    ThemeOneKioskManager,
    ThemeOneFooter,
    MrnVerfication,
    ThemeOneAppointmentsList,
    ThemeOneErrorBlock,
    ThemeOneFeedback,
    ThemeOneMenus,
    ThemeOneTokenGeneration,
    ThemeOneVerificationMode,
    EmiratesIdVerification,
    ThemeOneTime
} from './kioskindex'
import './../Kiosk.css';
import { IKioskThemes } from '../../../models/utilitiesModel';
import { getIntervalCall } from '../../../helpers/helpersIndex';
import PageUnAuthorized from '../../ErrorPages/pages-undisplay';
import ErrorUnTheam from '../../ErrorPages/pages-untheam';
import Loading from './loading';

let subscribe;

class Kiosk extends React.Component<any, any> {
    constructor(props) {
        super(props);

        const paramKey = 'kioskid';
        let kioskId: any = new URLSearchParams(this.props?.location?.search).toString()?.split('=')[0];
        kioskId = kioskId.toLowerCase() === paramKey ? new URLSearchParams(this.props?.location?.search).get(kioskId) : '';

        this.state = {
            themeOne: {
                ThemeOneHome: ThemeOneHome,
                ThemeOneFooter: ThemeOneFooter,
                ThemeOneKioskManager: ThemeOneKioskManager,
                ThemeOneTopBar: ThemeOneTopBar,
                MrnVerfication: MrnVerfication,
                EmiratesIdVerification: EmiratesIdVerification,
                ThemeOneAppointmentsList: ThemeOneAppointmentsList,
                ThemeOneErrorBlock: ThemeOneErrorBlock,
                ThemeOneFeedback: ThemeOneFeedback,
                ThemeOneMenus: ThemeOneMenus,
                ThemeOneTokenGeneration: ThemeOneTokenGeneration,
                ThemeOneVerificationMode: ThemeOneVerificationMode,
                ThemeOneTime: ThemeOneTime
            },
            kioskId: kioskId
        }
    }

    componentDidMount() {

        if (this.state.kioskId) {
            this.props.setkioskIdAndGetTokensDataRequest(this.state.kioskId, true);
            subscribe = interval(1000 * getIntervalCall()).subscribe(() => {
                if (this.props.theme && this.props.theme !== '')
                    this.props.setkioskIdAndGetTokensDataRequest(this.state.kioskId, false);
            });
        }
    }

    componentWillUnmount() {
        if (subscribe)
            subscribe.unsubscribe();
    }

    getThemeContainer = (kioskId, value) => {
        console.log('getThemeContainer=>', kioskId, value);
        if (kioskId && kioskId !== '') {
            switch (value) {
                case IKioskThemes.THEME1:
                    return <ThemeOneKioskContainer />;
                default:
                    return <ErrorUnTheam />;
            }
        }
        else
            return <PageUnAuthorized />
    }

    render() {
        console.log("props=111==>", this.props);
        const { kioskId, theme } = this.props;
        return (
            <>
                {this.state.kioskId && kioskId && kioskId !== 'kid' &&
                    <SuperParentContext.Provider value={this.state.themeOne}>
                        {this.getThemeContainer(kioskId, theme)}
                    </SuperParentContext.Provider>
                }
                {(!this.state.kioskId || (kioskId && kioskId === 'kid')) && <PageUnAuthorized />}
                <Loading />
            </>
        );
    }
}

const mapStateToProps = state => ({
    kioskId: state?.kioskReducer?.kioskId,
    theme: state?.kioskReducer?.theme
});
export default connect(mapStateToProps, { setkioskIdAndGetTokensDataRequest })(Kiosk); 
