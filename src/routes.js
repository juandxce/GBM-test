import Home from "./components/Home/Home";
import LoadingPage from "./components/LoadingPage/LoadingPage";

export default [
    {
        path: "/loading-page",
        component: LoadingPage,
        exact: true,
    },
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/*",
        component: Home,
        exact: false,
    },
];
