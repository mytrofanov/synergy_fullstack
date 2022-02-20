import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import {GroupType} from "../Types/Types";
import TextField from '@mui/material/TextField';


type propsType = {
    setDescription:   React.Dispatch<React.SetStateAction<string>>
    description:string
    nickname: string
    setNickName: React.Dispatch<React.SetStateAction<string>>
}


export default function GroupInputs({description, nickname, setNickName, setDescription
                                          }:propsType) {




    return (
        <div>
            <FormControl sx={{ m: 1 }} variant="standard">

                <TextField
                    id="outlined-multiline-flexible"
                    size={'small'}
                    multiline
                    maxRows={4}
                    label={'Name'}
                    value={nickname}
                    // @ts-ignore
                    onChange={(event)=>{setNickName(String(event.target.value))}}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    size={'small'}
                    multiline
                    maxRows={4}
                    label={'Description'}
                    value={description}
                    // @ts-ignore
                    onChange={(event)=>{setDescription(String(event.target.value))}}
                />



            </FormControl>

        </div>
    );
}

