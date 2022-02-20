import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {GroupType} from "../Types/Types";
import {useEffect} from "react";
import GroupInputs from "./GroupInputs";
import {setSelectedGroup} from "../Redux/user-reducer";


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
    selectedGroup: GroupType
    isFetching: boolean
    updateSingleGroup: (arg0: GroupType) => void
    addNewGroup: (arg0: GroupType) => void
    setNeedAddNewGroup: (arg0: boolean) => void
    needAddNewGroup: boolean
    setShowSnackBar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditGroupAlert({
                                           openDialog, setOpenDialog, groups, selectedGroup, isFetching,
                                           updateSingleGroup, setNeedAddNewGroup, needAddNewGroup,
                                           setShowSnackBar, addNewGroup
                                       }: propsType) {


    const [group, setGroup] = React.useState('');
    const [nickname, setNickName] = React.useState('')
    const [description, setDescription] = React.useState('')

    function clearGroupFields() {
        setNickName('')
        setGroup('')
        setDescription('')
        setSelectedGroup({id: 0, name: '', description: ''})
    }

    const updateGroup = () => {
        updateSingleGroup({id: selectedGroup.id, name: nickname, description: description})
        setShowSnackBar(true)
        clearGroupFields()
    }
    const createNewGroup = () => {
        addNewGroup({name: nickname, description: description})
        setShowSnackBar(true)
        setNeedAddNewGroup(false)
        clearGroupFields()
    }

    useEffect(() => {
        if (selectedGroup.id !== 0 && selectedGroup.description !== undefined) {
            setNickName(selectedGroup.name)
            setDescription(String(selectedGroup.description))
        }
    }, [selectedGroup])


    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setNeedAddNewGroup(false)
        clearGroupFields()
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
                {needAddNewGroup ? <DialogTitle>{"Add new Group?"}</DialogTitle> :
                    <DialogTitle>{"Edit group properties?"}</DialogTitle>}

                <DialogContent>
                    <div>
                        <GroupInputs nickname={nickname}
                                     setNickName={setNickName}
                                     description={description}
                                     setDescription={setDescription}
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
                        if (needAddNewGroup) {
                            createNewGroup()
                        }
                        if (!needAddNewGroup) {
                            updateGroup()
                        }
                        handleClose()
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

