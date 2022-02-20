import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
// @ts-ignore
import s from './app.module.css'
import NavMenu from './Components/NavMenu';




function App() {
    const [page, setPage] = React.useState(0);

    return (
        <BrowserRouter>

                <div className={s.app}>
                    <div className={s.navbar}>
                        <NavMenu page={page} setPage={setPage}/>
                    </div>
                    <AppRouter/>
                </div>

        </BrowserRouter>
    );
}


export default App;
