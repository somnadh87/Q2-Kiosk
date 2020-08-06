// import Pageslogin from './pages/Auth/Login';
import Error404 from './pages/ErrorPages/pages-404';
//import Error440 from './pages/ErrorPages/pages-440';
//import PageUnAuthorized from './pages/ErrorPages/pages-unauthorized';
import Kiosk1 from 'pages/kiosk/Kiosk1';

const routes = [

    //{ path: '/displayboard1', component: Displayboard1 },
   // { path: '/403', component: PageUnAuthorized, ispublic: true },
   // { path: '/440', component: Error440, ispublic: true },

    { path: '/', component: Kiosk1 },

    { path: '*', component: Error404, ispublic: true },

];

export default routes;