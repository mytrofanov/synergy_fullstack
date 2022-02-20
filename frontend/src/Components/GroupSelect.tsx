import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import {GroupType} from "../Types/Types";
import TextField from '@mui/material/TextField';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));
type propsType = {
    groups:Array<GroupType>
    group: string
    setGroup:  React.Dispatch<React.SetStateAction<string>>
    nickname: string
    setNickName: React.Dispatch<React.SetStateAction<string>>
}


export default function CustomizedSelects({groups, group, setGroup,
                                              nickname, setNickName
                                          }:propsType) {


    const handleChange = (event: { target: { value: string } }) => {
        setGroup(event.target.value);
    };

    const inputChange = (nickname: string) => {
        setNickName(nickname)
    };

    const oList:Array<JSX.Element> = []

    groups.map( (item,index) =>
        oList.push(
            // @ts-ignore
            <option value={item.id} key={item.id}>Group  {item.id} </option>
        )
    )

    return (
        <div>
            <FormControl sx={{ m: 1 }} variant="standard">

                <TextField
                    id="outlined-multiline-flexible"
                    size={'small'}
                    multiline
                    maxRows={4}
                    label={'Nickname'}
                    value={nickname}
                    // @ts-ignore
                    onChange={(event)=>{setNickName(String(event.target.value))}}
                />


                <NativeSelect
                    id="demo-customized-select-native"
                    value={group}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                >
                    {oList}
                </NativeSelect>
            </FormControl>

        </div>
    );
}

