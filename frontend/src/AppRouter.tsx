import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "./routes";
import ConversionContainer from './Pages/UserContainer';



const AppRouter: React.FC<any> = () => {

    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route path={path} element={<Component/>} key={path}/>
            )}
            <Route path={'*'} element={<ConversionContainer/>}/>
        </Routes>
    );
};

export default AppRouter;
