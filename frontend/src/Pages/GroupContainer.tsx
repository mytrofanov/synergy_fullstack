import React from 'react';
import Group from './Group';
import {groupMapDispatchToPropsType, groupMapStateToPropsType} from "../Types/Types";
import {AppStateType} from "../Redux/reduxStore";
import {
    getFetching, getFetchingInProgress, getGroups, getMessageFromServer, getNeedAddNewGroup, getSelectedGroup
} from "../Redux/usersSelectors";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    addNewGroup,
    deleteSingleGroup,
    requestAllGroups,
    setMessageFromServer, setNeedAddNewGroup, setSelectedGroup,  updateSingleGroup
} from "../Redux/user-reducer";


type groupContainerPropsType = groupMapStateToPropsType & groupMapDispatchToPropsType

class GroupContainer extends React.Component<groupContainerPropsType>  {
    componentDidMount(){
        this.props.getGroups()
    }

    componentDidUpdate(prevProps: Readonly<groupContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.needUpdate !== prevProps.needUpdate) {
            this.props.getGroups();
        }

    }
    componentWillUnmount() {
        this.props.setSelectedGroup({id: 0, name: '', description:''})
    }

    render() {
        return <div>
            <Group isFetching={this.props.isFetching}
                   messageFromServer={this.props.messageFromServer}
                   setMessageFromServer={this.props.setMessageFromServer}
                   groups={this.props.groups}
                   deleteSingleGroup={this.props.deleteSingleGroup}
                   setSelectedGroup={this.props.setSelectedGroup}
                   setNeedAddNewGroup={this.props.setNeedAddNewGroup}
                   needAddNewGroup={this.props.needAddNewGroup}
                   addNewGroup={this.props.addNewGroup}
                   selectedGroup={this.props.selectedGroup}
                   updateSingleGroup={this.props.updateSingleGroup}
            />
        </div>

    };
}

let groupMapStateToProps = (state: AppStateType):groupMapStateToPropsType => {
    return {
        isFetching:getFetching(state),
        messageFromServer: getMessageFromServer(state),
        groups: getGroups(state),
        selectedGroup:getSelectedGroup(state),
        needAddNewGroup: getNeedAddNewGroup(state),
        needUpdate: getFetchingInProgress(state)
    } as groupMapStateToPropsType
}

export default compose(
    connect(groupMapStateToProps,
        {
            setMessageFromServer:setMessageFromServer,
            getGroups:requestAllGroups,
            deleteSingleGroup:deleteSingleGroup,
            setSelectedGroup:setSelectedGroup,
            setNeedAddNewGroup:setNeedAddNewGroup,
            addNewGroup:addNewGroup,
            updateSingleGroup:updateSingleGroup
        }),
)(GroupContainer)


