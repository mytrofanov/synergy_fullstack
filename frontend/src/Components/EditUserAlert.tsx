import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {GroupType, UserType} from "../Types/Types";
import GroupSelect from "./GroupSelect";
import {useEffect} from "react";
import {setSelectedUser} from "../Redux/user-reducer";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type  propsType = {
    openDialog: boolean
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
    groups: Array<GroupType>
    selectedUser: UserType
    updateSingleUser: (arg0: UserType) => Promise<UserType>
    addUser: (arg0: UserType) => void
    setNeedAddNewUser: (arg0: boolean) => void
    needAddNewUser: boolean
    setShowSnackBar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditUserAlert({
                                          openDialog, setOpenDialog, groups, selectedUser,
                                          updateSingleUser, setNeedAddNewUser, needAddNewUser, setShowSnackBar, addUser
                                      }: propsType) {


    let [group, setGroup] = React.useState('1');
    let [nickname, setNickName] = React.useState('')

    useEffect(()=>{
        //Set default Group
        groups.length > 0 &&  setGroup(String(groups[0].id))
    },[groups])

    function clearUserFields() {
        setNickName('')
        setSelectedUser({id: 0, nickname: '',groupId:0})
    }

    const updateUser = () => {
        updateSingleUser({id: selectedUser.id, nickname: nickname, groupId: Number(group)})
        setShowSnackBar(true)
        clearUserFields()
    }
    const createNewUser = () => {
        if(Number(group)===0){
            addUser({nickname: nickname})
        }
        addUser({nickname: nickname, groupId: Number(group)})
        setShowSnackBar(true)
        setNeedAddNewUser(false)
        clearUserFields()
    }

    useEffect(() => {
        if (selectedUser.id !== 0) {
            setNickName(selectedUser.nickname)
            setGroup(String(selectedUser.groupId))
        }
    }, [selectedUser])

    const handleClickOpen = () => {
        setOpenDialog(true);
    };


    const handleClose = () => {
        setOpenDialog(false);
        clearUserFields()
    };

    return (
        <div>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {needAddNewUser ? <DialogTitle>{"Add new User?"}</DialogTitle> :
                    <DialogTitle>{"Edit user properties?"}</DialogTitle>}

                <DialogContent>
                    <div>
                        <GroupSelect groups={groups}
                                     group={group}
                                     setGroup={setGroup}
                                     nickname={nickname}
                                     setNickName={setNickName}
                        />
                    </div>
                    <DialogContentText id="alert-dialog-slide-description">
                        You can change nickname and Group, then press Save.
                        To exit without changes press Cancel
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        if (needAddNewUser) {
                            createNewUser()
                        }
                        if (!needAddNewUser) {
                            updateUser()
                        }
                        handleClose()
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

