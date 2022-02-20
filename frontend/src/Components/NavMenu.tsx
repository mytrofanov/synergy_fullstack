import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useNavigate} from "react-router";
import {USER_ROUTE, GROUP_ROUTE} from '../utils/consts'
import {useEffect} from "react";

type navMenuPropsType = {
    page:number | 0,
    setPage: React.Dispatch<React.SetStateAction<number>>
}


export default function NavMenu ({page,setPage}:navMenuPropsType) {

    const navigate = useNavigate();
    const navi = (number:number) => {
      number === 0 && navigate(USER_ROUTE)
      number === 1 && navigate(GROUP_ROUTE)
    }

    useEffect(()=>{
        navi(page)
    },[page])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={page} onChange={handleChange} centered>
                <Tab label="Users" />
                <Tab label="Groups" />
            </Tabs>
        </Box>
    );
}
