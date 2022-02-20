import React, {useState} from 'react';
// @ts-ignore
import s from './styles/Group.module.css'
// @ts-ignore
import o from './styles/User.module.css'
import LinearIndeterminate from "../Components/Progres";
import {GroupPropsType} from "../Types/Types";
import GroupTable from "../Components/GroupTable";
import SimpleSnackbar from "../Components/simpleSnackBar";
import Button from "@mui/material/Button";
import EditGroupAlert from "../Components/EditGroupAlert";

const Group:
    React.FC<GroupPropsType> = ({
                                    isFetching, groups, deleteSingleGroup, updateSingleGroup,
                                    needAddNewGroup, setNeedAddNewGroup, selectedGroup,
                                    setSelectedGroup, messageFromServer, setMessageFromServer,addNewGroup
                                }) => {
    let [showSnackBar, setShowSnackBar] = useState(false)
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
        <div className={s.groupPage}>
            {isFetching && <LinearIndeterminate/>}
            <div className={s.groupInnerBox}>

                <GroupTable groups={groups}
                            isFetching={isFetching}
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            setShowSnackBar={setShowSnackBar}
                            deleteSingleGroup={deleteSingleGroup}
                            setSelectedGroup={setSelectedGroup}
                />
                <Button
                    variant="outlined" size={"small"} color="primary"
                    sx={{m: 1}}
                    onClick={() => {
                        setNeedAddNewGroup(true)
                        setOpenDialog(true)
                    }}>Add new Group</Button>
            </div>
            <SimpleSnackbar showSnackBar={showSnackBar}
                            setMessageFromServer={setMessageFromServer}
                            messageFromServer={messageFromServer}

            />
            <EditGroupAlert addNewGroup={addNewGroup}
                            groups={groups}
                            isFetching={isFetching}
                            needAddNewGroup={needAddNewGroup}
                            setNeedAddNewGroup={setNeedAddNewGroup}
                            openDialog={openDialog}
                            setOpenDialog={setOpenDialog}
                            setShowSnackBar={setShowSnackBar}
                            selectedGroup={selectedGroup}
                            updateSingleGroup={updateSingleGroup}/>
        </div>
    );
};

export default Group;
