import { JSX } from "react";
import Main from "./components/sections/Main/Main";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router";
import LoginForm from "./components/blocks/LoginForm/LoginForm";
import RegForm from "./components/blocks/RegForm/RegForm";


export default function App(): JSX.Element {
    return <>
        <Routes>
            <Route index element={<Main />} />

            <Route element={<LoginPage />}>
                <Route path="login" element={<LoginForm/>} />
                <Route path="reg" element={<RegForm />} />
            </Route>

        </Routes>
    </>;
}
