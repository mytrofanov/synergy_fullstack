import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    addUser,
    deleteSingleUser, requestAllGroups,
    requestUsers, setMessageFromServer, setNeedAddNewUser, setSelectedUser, updateSingleUser
} from "../Redux/user-reducer";
import {AppStateType} from "../Redux/reduxStore";
import {
    getFetching, getFetchingInProgress, getGroups,
    getMessageFromServer, getNeedAddNewUser, getSelectedUser,
    getUpdatedUser,
    getUsers

} from "../Redux/usersSelectors";
import Users from "./Users";
import {usersMapDispatchToPropsType, userMapStateToPropsType} from "../Types/Types";

type userContainerPropsType = userMapStateToPropsType & usersMapDispatchToPropsType
class UserContainer extends React.Component <userContainerPropsType>  {
    componentDidMount(){
        this.props.requestUsers()
        this.props.getGroups()
    }

    componentDidUpdate(prevProps: Readonly<userContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.needUpdate !== prevProps.needUpdate) {
            this.props.requestUsers();
        }
    }
    componentWillUnmount() {
        this.props.setSelectedUser({id: 0, nickname: '', groupId: 0})
    }

    render () {
        return <div>
                <Users users={this.props.users}
                       addUser={this.props.addUser}
                       updateSingleUser={this.props.updateSingleUser}
                       setSelectedUser={this.props.setSelectedUser}
                       selectedUser={this.props.selectedUser}
                       messageFromServer={this.props.messageFromServer}
                       deleteSingleUser={this.props.deleteSingleUser}
                       setMessageFromServer={this.props.setMessageFromServer}
                       isFetching={this.props.isFetching}
                       groups={this.props.groups}
                       setNeedAddNewUser={this.props.setNeedAddNewUser}
                       needAddNewUser={this.props.needAddNewUser}
                />
            </div>
    }
}


let userMapStateToProps = (state: AppStateType):userMapStateToPropsType => {

    return {
        users:getUsers(state),
        selectedUser:getSelectedUser(state),
        groups: getGroups(state),
        isFetching:getFetching(state),
        updatedUser:getUpdatedUser(state),
        messageFromServer: getMessageFromServer(state),
        needAddNewUser: getNeedAddNewUser(state),
        needUpdate: getFetchingInProgress(state)

    } as userMapStateToPropsType
}

export default compose(
    connect(userMapStateToProps,
        {
            addUser:addUser,
            requestUsers:requestUsers,
            updateSingleUser: updateSingleUser,
            deleteSingleUser: deleteSingleUser,
            setMessageFromServer:setMessageFromServer,
            getGroups:requestAllGroups,
            setSelectedUser:setSelectedUser,
            setNeedAddNewUser: setNeedAddNewUser
        }),
    )(UserContainer)
