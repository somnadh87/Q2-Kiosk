import React, { useContext } from "react";
import appointment from '../../../../images/appoinments.svg';
import registration from '../../../../images/registration.svg';
import pharmacy from '../../../../images/pharmacy.svg';
import laboratory from '../../../../images/laboratory.svg';
import feedbackImg from '../../../../images/feedback.svg';
import { useSelector, useDispatch } from 'react-redux';
import { IKioskModel, IMenus } from "../../../../models/kioskModel";
import { menuSelectionRequest } from "../../../../store/actions";
import { SuperParentContext } from "../../Container/kioskcontext";
import { useTranslation } from "react-i18next";

const ThemeOneMenus: React.FC = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation("translations");
    const context = useContext(SuperParentContext);
    const language = useSelector(state => {
        if (state?.kioskReducer?.language)
            return (state.kioskReducer as IKioskModel).language;
        else return '';
    });

    const menusData: IMenus[] = useSelector(state => {
        if (state?.kioskReducer?.menusData)
            return (state.kioskReducer as IKioskModel).menusData;
        else return [];
    });

    console.log("menuDAta:::", menusData);


    return (
        <>

            <div className="kiosk-content">
                <div className="content-sec homemenu-sec">
                    <h2>{t('Kiosk.howCanIHelpYou' + language)}</h2>
                    <div className="mt-4">
                        {menusData.map((menu, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {index === 0 && <div className="kiosk-menuItem" onClick={() => { dispatch(menuSelectionRequest(menu)) }}>
                                        <div className="menuitem-title">{menu.menuName}</div>
                                        <img src={registration} alt="" width="55%" style={{ right: "-18px", top: "-6px" }} />
                                    </div>}

                                    {index === 1 && <div className="kiosk-menuItem" onClick={() => { dispatch(menuSelectionRequest(menu)) }}>
                                        <div className="menuitem-title">{menu.menuName}</div>
                                        <img src={pharmacy} alt="" width="65%" style={{ right: "-23px", top: "-15px" }} />
                                        {/* <img src={appointment} alt="" width="55%" /> */}
                                    </div>}

                                    {index === 2 && <div className="kiosk-menuItem" onClick={() => { dispatch(menuSelectionRequest(menu)) }}>
                                        <div className="menuitem-title">{menu.menuName}</div>
                                        {/* <img src={pharmacy} alt="" width="65%" style={{ right: "-23px", top: "-15px" }} /> */}
                                        <img src={laboratory} alt="" width="55%" />

                                    </div>}

                                    {index === 3 && <div className="kiosk-menuItem" onClick={() => { dispatch(menuSelectionRequest(menu)) }}>
                                        <div className="menuitem-title">{menu.menuName}</div>
                                        {/* <img src={laboratory} alt="" width="55%" /> */}
                                        <img src={appointment} width="50%" alt="" />

                                    </div>}
                                    {index === 4 && <div className="kiosk-menuItem" onClick={() => { dispatch(menuSelectionRequest(menu)) }}>
                                        <div className="menuitem-title">{menu.menuName}</div>
                                        {/* <img src={feedbackImg} width="50%" alt="" /> */}
                                        <img src={feedbackImg} alt="" width="50%" />
                                    </div>}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}
export default React.memo(ThemeOneMenus);