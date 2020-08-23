import React, { useContext } from 'react';
import { SuperParentContext, ParentContext } from '../../Container/kioskcontext';
import '../../Kiosk.css';

const ThemeOneKioskContainer: React.FC = () => {

    const context = useContext(SuperParentContext);
    console.log("ThemeOneKioskContainer =>", context);

    return (
        <>
            <div className="containerbg">
                <ParentContext.Provider value={{ ThemeOneTime: context.ThemeOneTime }}>
                    <context.ThemeOneTopBar />
                </ParentContext.Provider>
                <context.ThemeOneKioskManager />
                <context.ThemeOneFooter />
                {false && <context.ThemeOneErrorBlock />}
            </div>
        </>
    );
}
export default ThemeOneKioskContainer;