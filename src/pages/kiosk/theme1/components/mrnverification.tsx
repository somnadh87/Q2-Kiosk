import React, { Component, useState } from 'react'
import '../../Kiosk.css';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { mrnSubmitRequest } from '../../../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IKioskModel } from '../../../../models/kioskModel';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { customContentValidation } from '../../../../helpers/helpersIndex';
import * as Yup from 'yup';

interface IProps {
    mrnSubmitRequest: any;
}

const MrnVerfication: React.FC = () => {

    const [layoutName, setLayoutName] = useState("default");
    const [keyboardopen, setKeyboardopen] = useState(false);
    const [mrn, setMrn] = useState("");

    let keyboard = React.createRef();
    const dispatch = useDispatch();
    const { t } = useTranslation("translations");

    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });

    // const appoinmntSubmit = () => {
    //     setKeyboardopen(false);
    //     console.log("appoinmntSubmit =>", mrn);
    //     dispatch(mrnSubmitRequest(mrn));
    // }

    const onChangeInput = (event) => {
        let input = event.target.value;
        setMrn(input);
    };

    const onChange = input => {
        setMrn(input);
    };

    const onKeyPress = button => {
        if (button === "{s}") handleShift();
        if (button === "{lock}" || button === "{locks}") handleLock();
    };

    const handleShift = () => {
        setLayoutName(layoutName === "default" ? "shift" : "default");
    };

    const handleLock = () => {
        setLayoutName(layoutName === "shift" ? "small" : "shift");
    };

    // const keyboardStatus = () => {
    //     setKeyboardopen(!keyboardopen);
    // }

    const layout = {
        'default': [
            '1 2 3',
            '4 5 6',
            '7 8 9',
            '0 {bksp}'
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

    const display = {
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

    return (
        <>
            <div className="kiosk-content">
                <div className="content-sec w100 text-center pad-btm30" >
                    <p className="mb-0">{t('Kiosk.pleaseEnterYour' + language)}</p>
                    <h1 className="mt-0 mrnText">{t('Kiosk.MrnId' + language)}</h1>
                    <div className="form-group frmInput">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                mrnNo: '',
                                keyboardopen: false
                            }}
                            validationSchema={Yup.object().shape({
                                mrnNo: customContentValidation(t, t('controleErrors.required'), { patternType: 'number', message: 'number', spacialChar: null }, 8, 2)
                            })}
                            onSubmit={(values) => {
                                console.log("Values =>", values);
                                setKeyboardopen(false);
                                dispatch(mrnSubmitRequest(values.mrnNo));
                            }}
                        >
                            {({ errors, touched, dirty, values, setFieldValue, setFieldTouched }) => (
                                <Form>
                                    {console.log("hfusiivnis =>", values, errors, touched)}
                                    <input type="text" name="mrnNo" autoComplete="off"
                                        onFocus={() => setFieldValue('keyboardopen', true)}
                                        onBlur={() => setFieldTouched('mrnNo', true)}
                                        value={values.mrnNo}
                                        placeholder={t('Kiosk.mrnNoPlaceholder')}
                                        className={'form-control ' + (errors.mrnNo && touched.mrnNo ? 'is-invalid' : '')}
                                        // onChange={(event) => setFieldValue('mrnNo', event.target.value)}
                                        onChange={e => onChangeInput(e)}
                                    />
                                    {errors.mrnNo && touched.mrnNo && (
                                        <div className="error-msg mt-0">{errors.mrnNo}
                                        </div>
                                    )}
                                    {values.keyboardopen && <Keyboard display={display} layout={layout}
                                        layoutName={layoutName}
                                        keyboardRef={r => (keyboard = r)}
                                        onChange={input => setFieldValue('mrnNo', input)}
                                        onKeyPress={button => onKeyPress(button)}
                                        buttonTheme={[
                                            {
                                                class: "hg-grey",
                                                buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M q w e r t y u i o p a s d f g h j k l z x c v b n m {space} 1 2 3 4 5 6 7 8 9 0"
                                            }
                                        ]}
                                    />
                                    }
                                    <button type="submit" className="btn submit-btn">{t('Kiosk.submit' + language)}</button>
                                </Form>
                            )}
                        </Formik>
                        {/* <input type="text" className="form-control"
                            onFocus={keyboardStatus}
                            value={mrn}
                            placeholder=""
                            onChange={e => onChangeInput(e)}
                        />
                        <button type="submit" className="btn submit-btn" onClick={appoinmntSubmit}>{t('Kiosk.submit' + language)}</button> */}
                    </div>
                    {/* {keyboardopen && <Keyboard display={display} layout={layout}
                        layoutName={layoutName}
                        keyboardRef={r => (keyboard = r)}
                        onChange={input => onChange(input)}
                        onKeyPress={button => onKeyPress(button)}
                        buttonTheme={[
                            {
                                class: "hg-grey",
                                buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M q w e r t y u i o p a s d f g h j k l z x c v b n m {space} 1 2 3 4 5 6 7 8 9 0"
                            }
                        ]}
                    />
                    } */}
                </div>
            </div>

        </>
    )
}

export default React.memo(MrnVerfication);


// class MrnVerfication extends React.PureComponent<IProps, any> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             layoutName: "default",
//             keyboardopen: false,
//             mrn: "",
//         };
//     }
//     keyboard = React.createRef();

//     appoinmntSubmit = () => {
//         console.log("appoinmntSubmit =>", this.state.mrn);
//         this.setState({ keyboardopen: false });
//         this.props.mrnSubmitRequest(this.state.mrn);
//     }

//     onChangeInput = event => {
//         let input = event.target.value;
//         this.setState({ mrn: input });
//     };

//     onChange = input => {
//         this.setState({ mrn: input });
//     };

//     onKeyPress = button => {
//         if (button === "{s}") this.handleShift();
//         if (button === "{lock}" || button === "{locks}") this.handleLock();
//     };

//     handleShift = () => {
//         let layoutName = this.state.layoutName;
//         this.setState({ layoutName: layoutName === "default" ? "shift" : "default" });
//     };

//     handleLock = () => {
//         let layoutName = this.state.layoutName;
//         this.setState({ layoutName: layoutName === "shift" ? "small" : "shift" });
//     };

//     keyboardStatus = () => {
//         this.setState({ keyboardopen: !this.state.keyboardopen })
//     }

//     layout = {
//         'default': [
//             '1 2 3 {bksp}',
//             '4 5 6 {enter}',
//             '7 8 9 {lock}',
//             '* 0 # {space}'
//         ],
//         'shift': [
//             '{tab} Q W E R T Y U I O P {bksp}',
//             '{locks} A S D F G H J K L {enter}',
//             '{shift} Z X C V B N M {shift}',
//             '{s} . {space} , {s}'
//         ],
//         'small': [
//             '{tab} q w e r t y u i o p {bksp}',
//             '{locks} a s d f g h j k l {enter}',
//             '{shift} z x c v b n m {shift}',
//             '{s} . {space} , {s}'
//         ],
//     }

//     display = {
//         '{bksp}': 'Delete',
//         '{enter}': 'Enter',
//         '{shift}': 'Shift',
//         '{s}': '123',
//         '{lock}': 'ABC',
//         '{space}': ' ',
//         '{tab}': 'Tab',
//         '{locks}': 'CapsLock',
//         '{//}': ' ',
//         '{return}': 'Return',
//     }

//     render() {
//         return (
//             <>
//                 <div className="kiosk-content">
//                     <div className="content-sec w100 text-center pad-btm30" >
//                         <p className="mb-0">Please enter your</p>
//                         <h1 className="mt-0 mrnText">MRN id</h1>
//                         <div className="form-group frmInput">
//                             <input type="text" className="form-control"
//                                 onFocus={this.keyboardStatus}
//                                 value={this.state.mrn}
//                                 placeholder=""
//                                 onChange={e => this.onChangeInput(e)}
//                             />
//                             <button type="submit" className="btn submit-btn" onClick={() => this.appoinmntSubmit()}>Submit</button>
//                         </div>
//                         {this.state.keyboardopen && <Keyboard display={this.display} layout={this.layout}
//                             layoutName={this.state.layoutName}
//                             keyboardRef={r => (this.keyboard = r)}
//                             onChange={input => this.onChange(input)}
//                             onKeyPress={button => this.onKeyPress(button)}
//                             buttonTheme={[
//                                 {
//                                     class: "hg-grey",
//                                     buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M q w e r t y u i o p a s d f g h j k l z x c v b n m {space} 1 2 3 4 5 6 7 8 9 0"
//                                 }
//                             ]}
//                         />
//                         }
//                     </div>
//                 </div>

//             </>
//         )
//     }
// }

// export default connect(null, { mrnSubmitRequest })(MrnVerfication);

