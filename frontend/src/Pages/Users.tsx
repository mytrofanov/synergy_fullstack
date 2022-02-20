import React, {useState} from 'react';
// @ts-ignore
import s from './styles/User.module.css'
import {UsersPropsType} from "../Types/Types";
import UnstyledTable from "../Components/Table";
import LinearIndeterminate from "../Components/Progres";
import EditUserAlert from "../Components/EditUserAlert";
import SimpleSnackbar from "../Components/simpleSnackBar";
import Button from "@mui/material/Button";

const Users:
    React.FC<UsersPropsType> = ({
                                    users, updateSingleUser,
                                    messageFromServer, deleteSingleUser, setMessageFromServer,
                                    isFetching, groups, setSelectedUser,
                                    selectedUser,setNeedAddNewUser,needAddNewUser,addUser
                                }) => {
    let [showSnackBar, setShowSnackBar] = useState(false)
    const [openDialog, setOpenDialog] = React.useState(false);



    return (
        <div className={s.conversionPage}>
            {isFetching && <LinearIndeterminate/>}

            <EditUserAlert openDialog={openDialog}
                           setOpenDialog={setOpenDialog}
                           groups={groups}
                           selectedUser={selectedUser}
                           updateSingleUser={updateSingleUser}
                           setNeedAddNewUser={setNeedAddNewUser}
                           needAddNewUser={needAddNewUser}
                           setShowSnackBar={setShowSnackBar}
                           addUser={addUser}
            />
            <div className={s.exchangeBox}>

                <UnstyledTable users={users}
                               setSelectedUser={setSelectedUser}
                               deleteSingleUser={deleteSingleUser}
                               setShowSnackBar={setShowSnackBar}
                               setOpenDialog={setOpenDialog}
                               openDialog={openDialog}
                               isFetching={isFetching}
                />

                <SimpleSnackbar showSnackBar={showSnackBar}
                                setMessageFromServer={setMessageFromServer}
                                messageFromServer={messageFromServer}

                />
                <Button
                    variant="outlined" size={"small"} color="primary"
                    sx={{m: 1}}
                    onClick={() => {
                        setNeedAddNewUser(true)
                        setOpenDialog(true)
                    }}>Add new User</Button>
            </div>


        </div>

    )
        ;
};

export default Users;
