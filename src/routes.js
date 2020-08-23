// import Pageslogin from './pages/Auth/Login';
import Error404 from './pages/ErrorPages/pages-404';
//import Error440 from './pages/ErrorPages/pages-440';
//import PageUnAuthorized from './pages/ErrorPages/pages-unauthorized';
import Kiosk from './pages/kiosk/Container/kiosk';
console.log("kiosk", Kiosk);
const routes = [

    //{ path: '/displayboard1', component: Displayboard1 },
    // { path: '/403', component: PageUnAuthorized, ispublic: true },
    // { path: '/440', component: Error440, ispublic: true },

    { path: '/', component: Kiosk, ispublic: true },

    { path: '*', component: Error404, ispublic: true }

];

export default routes;