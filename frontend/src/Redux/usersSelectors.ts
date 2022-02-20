import {AppStateType} from "./reduxStore";


export const getUsers = (state:AppStateType) => {
    return state.user.users;
}
export const getSelectedUser = (state:AppStateType) => {
    return state.user.selectedUser;
}
export const getGroups = (state:AppStateType) => {
    return state.user.groups;
}
export const getSelectedGroup = (state:AppStateType) => {
    return state.user.selectedGroup;
}
export const getFetching = (state:AppStateType) => {
    return state.user.isFetching;
}
export const getMessageFromServer = (state:AppStateType) => {
    return state.user.messageFromServer;
}
export const getUpdatedUser = (state:AppStateType) => {
    return state.user.updatedUser;
}
export const getTotalUsers = (state:AppStateType) => {
    return state.user.totalUsers;
}
export const getNeedAddNewUser = (state:AppStateType) => {
    return state.user.needAddNewUser;
}
export const getNeedAddNewGroup = (state:AppStateType) => {
    return state.user.needAddNewGroup;
}
export const getFetchingInProgress = (state:AppStateType) => {
    return state.user.fetchingInProgress;
}




