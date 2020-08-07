import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import headerlogo from '../../images/firstpasslogo.svg';
import moment from 'moment';
import exit from '../../images/next-button.svg';
import close from '../../images/close.svg';
import Keyboard from "react-simple-keyboard";
import happy from '../../images/happy.svg';
import neutral from '../../images/neutral.svg';
import sad from '../../images/sad.svg';
import feedbackImg from '../../images/feedback.svg';
import sehalogo from '../../images/seha-logo.png';
import barcode from '../../images/barcode.png';
import appointment from '../../images/appoinments.svg';
import registration from '../../images/registration.svg';
import pharmacy from '../../images/pharmacy.svg';
import laboratory from '../../images/laboratory.svg';
import errorimg from '../../images/error.png';
import emiratescard from '../../images/emirates-card.svg';
import emiratesverf from '../../images/verification.svg';
import back from '../../images/back.svg';
import happyActive from '../../images/happy-active.svg';
import neutralActive from '../../images/neutral-active.svg';
import sadActive from '../../images/sad-active.svg';
import "react-simple-keyboard/build/css/index.css";
import './Kiosk.css';

class Kiosk1 extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format('DD MMMM YYYY'),
            weekday: moment().format('dddd'),
            time: moment().format('hh:mm A'),
            tabId: 1,
            layoutName: "small",
            keyboardopen: false,
            mrn: "",
            tokenNumber: "",
            happyActive: false,
            neutralActive: false,
            sadActive: false
        };
    }
    keyboard = React.createRef();

    selectMenu = () => {
        this.setState({ tabId: 2 })
    }

    registration = () => {
        this.setState({ tabId: 7,  tokenNumber: "R2" })
    }

    emirates = () => {
        this.setState({ tabId: 4 })
        setTimeout(() => {
            this.setState({ tabId: 6 })
        }, 5000)
    }

    selectMrn = () => {
        this.setState({ tabId: 5 })
    }

    appointments = () => {
        this.setState({ tabId: 3 })
    }

    feedback = () => {
        this.setState({ tabId: 8 })
    }

    checkin = () => {
        this.setState({ tabId: 7, tokenNumber: "C6746742" })
    }

    exit = () => {
        this.setState({ tabId: 1 })
    }

    activeHappy = () => {
        this.setState({ happyActive: !this.state.happyActive })
        setTimeout(() => {
            this.setState({ tabId: 1 })
        }, 3000)
    }

    activeNeutral = () => {
        this.setState({ neutralActive: !this.state.neutralActive })
        setTimeout(() => {
            this.setState({ tabId: 1 })
        }, 3000)
    }

    activeSad = () => {
        this.setState({ sadActive: !this.state.sadActive })
        setTimeout(() => {
            this.setState({ tabId: 1 })
        }, 3000)
    }

    back = () => {
        if (this.state.tabId === 5) {
            this.setState({ tabId: 3 })
        }
        else if (this.state.tabId === 7 || this.state.tabId === 8) {
            this.setState({ tabId: 2 })
        }
        else {
            this.setState({ tabId: this.state.tabId - 1 })
        }
    }

    appoinmntSubmit = () => {
        this.setState({tabId: 6, keyboardopen: false })
    }

    error = () => {
        this.setState({ tabId: 9 })
    }

    keyboardStatus = () => {
        this.setState({ keyboardopen: !this.state.keyboardopen })
    }

    layout = {
        'default': [
            '1 2 3 {bksp}',
            '4 5 6 {enter}',
            '7 8 9 {lock}',
            '* 0 # {space}'
        ],
        'shift': [
            '{tab} Q W E R T Y U I O P {bksp}',
            '{locks} A S D F G H J K L {enter}',
            '{shift} Z X C V B N M {shift}',
            '{s} . {space} , {s}'
        ],
        'small': [
            '{tab} q w e r t y u i o p {bksp}',
            '{locks} a s d f g h j k l {enter}',
            '{shift} z x c v b n m {shift}',
            '{s} . {space} , {s}'
        ],
    }

    display = {
        '{bksp}': 'Delete',
        '{enter}': 'Enter',
        '{shift}': 'Shift',
        '{s}': '123',
        '{lock}': 'ABC',
        '{space}': ' ',
        '{tab}': 'Tab',
        '{locks}': 'CapsLock',
        '{//}': ' ',
        '{return}': 'Return',
    }

    onChange = input => {
        this.setState({ mrn: input });
    };

    onKeyPress = button => {
        if (button === "{s}") this.handleShift();
        if (button === "{lock}" || button === "{locks}") this.handleLock();
    };

    handleShift = () => {
        let layoutName = this.state.layoutName;
        this.setState({ layoutName: layoutName === "default" ? "shift" : "default" });
    };

    handleLock = () => {
        let layoutName = this.state.layoutName;
        this.setState({ layoutName: layoutName === "shift" ? "small" : "shift" });
    };

    onChangeInput = event => {
        let input = event.target.value;
        this.setState({ mrn: input });
    };

    render() {
        return (
            <>
                <div className="containerbg">

                    {/* Header */}

                    <div className="topbar">
                        <Row className="m-0 topheader">
                            <Col sm="6" xs="6">
                                <img src={headerlogo} alt="" width="150" />
                            </Col>
                            <Col sm="6" xs="6" className="date-time">
                                <p className="time">{this.state.time}</p>
                                <p className="day">{this.state.weekday}, {this.state.date}</p>
                            </Col>
                        </Row>
                    </div>

                    {/* Language */}

                    {this.state.tabId === 1 &&
                        <div className="kiosk-content bgImage">
                            <Row className="content-sec w95 pb-2">
                                <Col sm="6" className="welcometext">
                                    <div>
                                        <h2>Welcome,</h2>
                                        <p>Please select the appropriate language</p>
                                    </div>
                                </Col>
                                <Col sm="6" className="align-center pad-left0">
                                    <button className="languagebtn" onClick={this.selectMenu}>ENG</button>
                                    <button className="languagebtn" onClick={this.selectMenu}>عربى</button>
                                </Col>
                            </Row>
                        </div>
                    }

                    {/* Menus */}

                    {this.state.tabId === 2 &&
                        <div className="kiosk-content">
                            <div className="content-sec homemenu-sec">
                                <h2>How can we help you ?</h2>
                                <div className="mt-4">
                                    <div className="kiosk-menuItem" onClick={this.registration}>
                                        <div className="menuitem-title">Registration</div>
                                        <img src={registration} alt="" width="55%" style={{ right: "-18px", top: "-6px" }} />
                                    </div>
                                    <div className="kiosk-menuItem" onClick={this.appointments}>
                                        <div className="menuitem-title">Appointments</div>
                                        <img src={appointment} alt="" width="55%" />
                                    </div>
                                    <div className="kiosk-menuItem" onClick={this.error}>
                                        <div className="menuitem-title">Pharmacy</div>
                                        <img src={pharmacy} alt="" width="65%" style={{ right: "-23px", top: "-15px" }} /></div>
                                    <div className="kiosk-menuItem" onClick={this.appointments}>
                                        <div className="menuitem-title">Laboratory</div>
                                        <img src={laboratory} alt="" width="55%" />
                                    </div>
                                    <div className="kiosk-menuItem" onClick={this.feedback}>
                                        <div className="menuitem-title">Feedback</div>
                                        <img src={feedbackImg} width="50%" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Verification */}

                    {this.state.tabId === 3 &&
                        <div className="kiosk-content bgImage">
                            <Row className="content-sec w90">
                                <Col sm="6" className="welcometext">
                                    <div>
                                        <h2>Verification,</h2>
                                        <p>Please select the mode of verification</p>
                                    </div>
                                </Col>
                                <Col sm="6" className="align-center">
                                    <button className="verification-btn" onClick={this.emirates}>
                                        <div>
                                            EMIRATES ID/<br />SMART CARD
                                            <img src={emiratesverf} alt="" width="80" />
                                        </div>
                                    </button>
                                    <button className="verification-btn mleft-10" onClick={this.selectMrn}>MRN ID</button>
                                </Col>
                            </Row>
                        </div>
                    }

                    {/* Emirates Verification */}

                    {this.state.tabId === 4 &&
                        <div className="kiosk-content">
                            <div className="content-sec w70 text-center verfcontent">
                                <img src={emiratescard} width="210" alt="" />
                                <div style={{ marginLeft: "50px" }}>
                                    <h2 className="mb-0 mt-0">Please insert your</h2>
                                    <h1 style={{ marginBottom: "20px" }}>Emirates ID/Smart card</h1>
                                </div>
                            </div>
                        </div>
                    }

                    {/* MRN Verification */}

                    {this.state.tabId === 5 &&
                        <div className="kiosk-content">
                            <div className="content-sec w100 text-center pad-btm30" >
                                <p className="mb-0">Please enter your</p>
                                <h1 className="mt-0 mrnText">MRN id</h1>
                                <div className="form-group frmInput">
                                    <input type="text" className="form-control"
                                        onFocus={this.keyboardStatus}
                                        value={this.state.mrn}
                                        placeholder=""
                                        onChange={e => this.onChangeInput(e)}
                                    />
                                    <button type="submit" className="btn submit-btn" onClick={this.appoinmntSubmit}>Submit</button>
                                </div>
                                {this.state.keyboardopen && <Keyboard display={this.display} layout={this.layout}
                                    layoutName={this.state.layoutName}
                                    keyboardRef={r => (this.keyboard = r)}
                                    onChange={input => this.onChange(input)}
                                    onKeyPress={button => this.onKeyPress(button)}
                                    buttonTheme={[
                                        {
                                            class: "hg-grey",
                                            buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M q w e r t y u i o p a s d f g h j k l z x c v b n m {space} 1 2 3 4 5 6 7 8 9 0"
                                        }
                                    ]}
                                />
                                }
                            </div>
                        </div>
                    }

                    {/* Appointments */}

                    {this.state.tabId === 6 &&
                        <div className="kiosk-content pr-0">
                            <div className="content-sec w100">
                                <div className="appointments-text">
                                    <h2>Appointments</h2>
                                    <div className="appointments-container">

                                        <div className="appointment">
                                            <div className="appointment-property">
                                                <div className="appointment-value">Marget alba</div>
                                                <div className="appointment-key">Patient Name</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">John adam</div>
                                                <div className="appointment-key">Doctor</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">Teeth Department</div>
                                                <div className="appointment-key">Department</div>
                                            </div>

                                            <div className="appointment-property">
                                                <Row>
                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">12:15 PM</div>
                                                            <div className="appointment-key">Appointment Time</div>
                                                        </div>
                                                    </Col>

                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">18 Mar 2020</div>
                                                            <div className="appointment-key">Appointment Date</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="appointment-button">
                                                <button type="button" className="btn btn-primary" onClick={this.checkin}>Check in</button>
                                            </div>
                                        </div>
                                        <div className="appointment">
                                            <div className="appointment-property">
                                                <div className="appointment-value">Marget alba</div>
                                                <div className="appointment-key">Patient Name</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">John adam</div>
                                                <div className="appointment-key">Doctor</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">Teeth Department</div>
                                                <div className="appointment-key">Department</div>
                                            </div>

                                            <div className="appointment-property">
                                                <Row>
                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">12:15 PM</div>
                                                            <div className="appointment-key">Appointment Time</div>
                                                        </div>
                                                    </Col>

                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">18 Mar 2020</div>
                                                            <div className="appointment-key">Appointment Date</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="appointment-button">
                                                <button type="button" className="btn btn-primary" onClick={this.checkin}>Check in</button>
                                            </div>
                                        </div>
                                        <div className="appointment">
                                            <div className="appointment-property">
                                                <div className="appointment-value">Marget alba</div>
                                                <div className="appointment-key">Patient Name</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">John adam</div>
                                                <div className="appointment-key">Doctor</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">Teeth Department</div>
                                                <div className="appointment-key">Department</div>
                                            </div>

                                            <div className="appointment-property">
                                                <Row>
                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">12:15 PM</div>
                                                            <div className="appointment-key">Appointment Time</div>
                                                        </div>
                                                    </Col>

                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">18 Mar 2020</div>
                                                            <div className="appointment-key">Appointment Date</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="appointment-button">
                                                <button type="button" className="btn btn-primary" onClick={this.checkin}>Check in</button>
                                            </div>
                                        </div>
                                        <div className="appointment">
                                            <div className="appointment-property">
                                                <div className="appointment-value">Marget alba</div>
                                                <div className="appointment-key">Patient Name</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">John adam</div>
                                                <div className="appointment-key">Doctor</div>
                                            </div>

                                            <div className="appointment-property">
                                                <div className="appointment-value">Teeth Department</div>
                                                <div className="appointment-key">Department</div>
                                            </div>

                                            <div className="appointment-property">
                                                <Row>
                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">12:15 PM</div>
                                                            <div className="appointment-key">Appointment Time</div>
                                                        </div>
                                                    </Col>

                                                    <Col sm="6">
                                                        <div className="appointment-property">
                                                            <div className="appointment-value">18 Mar 2020</div>
                                                            <div className="appointment-key">Appointment Date</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="appointment-button">
                                                <button type="button" className="btn btn-primary" onClick={this.checkin}>Check in</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    }

                    {/* Token generated */}

                    {this.state.tabId === 7 &&
                        <div className="kiosk-content">
                            <Row className="content-sec w60 text-center">
                                <Col sm="6" className="pad-0">
                                    <div className="tableCard">
                                        <table className="tableWidth">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <table className="tableHeader-img" >
                                                            <tbody>
                                                                <tr>
                                                                    <td><img width="100" src={sehalogo} alt="" /></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table className="tableHeader">
                                                            <tbody>
                                                                <tr style={{ fontWeight: "bold" }}>
                                                                    <td>SHEIKH KHALIFA MEDICAL CITY</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Oncology Department</td>
                                                                </tr>
                                                                <tr style={{ fontWeight: "bold" }}>
                                                                    <td>
                                                                    مدينة الشيخ خليفة الطبية
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>وقت التعيين</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="appBorder">
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Time of Appointment</td>
                                                                    <td>9.45 AM</td>
                                                                    <td>وقت التعيين</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Time Now</td>
                                                                    <td>9.30 PM</td>
                                                                    <td>الوقت الآن</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Date</td>
                                                                    <td>04/08/2020</td>
                                                                    <td>تاريخ</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table className="tokendetail">
                                                            <tbody>
                                                                <tr>
                                                                    <td>TOKEN NUMBER</td>
                                                                    <td>رقم الرمز الخاص بك</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{height:"30px"}}>
                                                        <h1 className="tokenNum">{this.state.tokenNumber}</h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><table className="barcode">
                                                        <tbody>
                                                            <tr>
                                                                <td><img src={barcode} alt="" width="100%" /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table></td>
                                                </tr>
                                                <tr >
                                                    <td>
                                                        <span className="bottomdetails">Please keep this card until you leave the hospital</span>
                                                        <span className="bottomdetails">يرجى الاحتفاظ بهذه البطاقة حتى تغادر المستشفى</span>
                                                        <span className="bottomdetails">Your token number will appear on TV screens when your turn comes</span>
                                                        <span className="bottomdetails">سيظهر رقمك المميز على شاشات التلفزيون عندما يحين دورك</span>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>

                                <Col sm="6" className="tokenmsg pad-0">
                                    <div className="text-right">
                                        <h3>Thank you,</h3>
                                        <h1>CDR123</h1>
                                        <p>Token generated successfully</p>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    }

                    {/* Feedback */}

                    {this.state.tabId === 8 &&
                        <div className="kiosk-content">
                            <div className="content-sec w70 text-center feedback-sec">
                                {!this.state.happyActive && <img src={happy} alt="" onClick={this.activeHappy} />}
                                {this.state.happyActive && <img src={happyActive} alt="" onClick={this.activeHappy} />}
                                {!this.state.neutralActive && <img src={neutral} alt="" onClick={this.activeNeutral} />}
                                {this.state.neutralActive && <img src={neutralActive} alt="" onClick={this.activeNeutral} />}
                                {!this.state.sadActive && <img src={sad} alt="" onClick={this.activeSad} />}
                                {this.state.sadActive && <img src={sadActive} alt="" onClick={this.activeSad} />}
                                <p>How was your experience with our team ?</p>
                            </div>
                        </div>
                    }

                    {/* Error Message */}

                    {this.state.tabId === 9 &&
                        <div className="kiosk-content">
                            <div className="errorMessage">
                                <div className="close-button" onClick={this.exit}>
                                    <img src={close} alt="" width="30" />
                                </div>
                                <img src={errorimg} alt="" />
                                <p>Something went wrong, please<br /> visit the registration desk</p>
                            </div>
                        </div>
                    }

                    {/* Footer */}

                    <div className="kiosk-footer">
                        <Row className="m-0">
                            <Col sm="6" xs="6" className="footerLeft">
                                <div className="copyRight">&copy; 2020 Vectramind</div>
                            </Col>
                            {this.state.tabId !== 1 &&
                                <Col sm="6" xs="6" className="text-right">
                                    <img src={back} alt="" width="80" onClick={this.back} />
                                    <img src={exit} alt="" width="80" onClick={this.exit} />
                                </Col>
                            }
                        </Row>
                    </div>
                </div>
            </>
        );
    }
}

export default Kiosk1;