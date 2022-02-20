import {groupAPI, userAPI} from "../API/Api";
import {Dispatch} from "redux";
// @ts-ignore
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {GroupType, UserType} from "../Types/Types";


const SET_USERS = 'SET_USERS';
const SET_SElECTED_USER = 'SET_SElECTED_USER';
const SET_SElECTED_GROUP = 'SET_SElECTED_GROUP';
const SET_GROUPS = 'SET_GROUPS';
const SET_MESSAGE_FROM_SERVER = 'SET_MESSAGE_FROM_SERVER';
const SET_UPDATED_USER = 'SET_UPDATED_USER';
const SET_UPDATED_GROUP = 'SET_UPDATED_GROUP';
const SET_TOTAL_USERS = 'SET_TOTAL_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_NEED_ADD_NEW_USER = 'SET_NEED_ADD_NEW_USER';
const SET_NEED_ADD_NEW_GROUP = 'SET_NEED_ADD_NEW_GROUP';
const SET_FETCHING_IN_PROGRESS = 'SET_FETCHING_IN_PROGRESS';

let initialState = {
    isFetching: false,
    needAddNewUser: false,
    needAddNewGroup: false,
    fetchingInProgress: false,
    users: [] as Array<UserType>,
    selectedUser: {} as UserType,
    selectedGroup: {} as GroupType,
    groups: [] as Array<GroupType>,
    totalUsers: 0 as number,
    updatedUser: {} as UserType,
    updatedGroup: {} as GroupType,
    messageFromServer: '' as string
};

type InitialStateType = typeof initialState


const userReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_SElECTED_USER: {
            return {...state, selectedUser: action.selectedUser}
        }
        case SET_SElECTED_GROUP: {
            return {...state, selectedGroup: action.selectedGroup}
        }
        case SET_GROUPS: {
            return {...state, groups: action.groups}
        }
        case SET_UPDATED_USER: {
            return {...state, updatedUser: action.updatedUser}
        }
        case SET_UPDATED_GROUP: {
            return {...state, updatedGroup: action.updatedGroup}
        }
        case SET_TOTAL_USERS: {
            return {...state, totalUsers: action.totalUsers}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_FETCHING_IN_PROGRESS: {
            return {...state, fetchingInProgress: action.fetchingInProgress}
        }
        case SET_NEED_ADD_NEW_USER: {
            return {...state, needAddNewUser: action.needAddNewUser}
        }
        case SET_NEED_ADD_NEW_GROUP: {
            return {...state, needAddNewGroup: action.needAddNewGroup}
        }
        case SET_MESSAGE_FROM_SERVER: {
            return {...state, messageFromServer: action.messageFromServer}
        }
        default:
            return state;
    }

}

type ActionType = toggleIsFetchingType | setUsersType | setTotalUsersType | setUpdatedUsersType |
    messageFromServerType | setGroupsType | setSelectedUserType | needAddNewUserType | setSelectedGroupType |
    needAddNewGroupType | setUpdatedGroupType | fetchingInProgressType

type setUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): setUsersType => ({
    type: SET_USERS, users
})

type setSelectedUserType = {
    type: typeof SET_SElECTED_USER
    selectedUser: UserType
}
export const setSelectedUser = (selectedUser: UserType): setSelectedUserType => ({
    type: SET_SElECTED_USER, selectedUser
})

type setSelectedGroupType = {
    type: typeof SET_SElECTED_GROUP
    selectedGroup: GroupType
}
export const setSelectedGroup = (selectedGroup: GroupType): setSelectedGroupType => ({
    type: SET_SElECTED_GROUP, selectedGroup
})

type setGroupsType = {
    type: typeof SET_GROUPS
    groups: Array<GroupType>
}
export const setGroups = (groups: Array<GroupType>): setGroupsType => ({
    type: SET_GROUPS, groups
})

type setUpdatedUsersType = {
    type: typeof SET_UPDATED_USER
    updatedUser: UserType
}
export const setUpdatedUser = (updatedUser: UserType): setUpdatedUsersType => ({
    type: SET_UPDATED_USER, updatedUser
})

type setUpdatedGroupType = {
    type: typeof SET_UPDATED_GROUP
    updatedGroup: GroupType
}
export const setUpdatedGroup = (updatedGroup: GroupType): setUpdatedGroupType => ({
    type: SET_UPDATED_GROUP, updatedGroup
})


type setTotalUsersType = {
    type: typeof SET_TOTAL_USERS
    totalUsers: number
}
export const setTotalUsers = (totalUsers: number): setTotalUsersType => ({
    type: SET_TOTAL_USERS, totalUsers
})


export type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType =>
    ({type: TOGGLE_IS_FETCHING, isFetching})


export type fetchingInProgressType = {
    type: typeof SET_FETCHING_IN_PROGRESS
    fetchingInProgress: boolean
}
export const setFetchingInProgress = (fetchingInProgress: boolean): fetchingInProgressType =>
    ({type: SET_FETCHING_IN_PROGRESS, fetchingInProgress})

export type needAddNewUserType = {
    type: typeof SET_NEED_ADD_NEW_USER
    needAddNewUser: boolean
}
export const setNeedAddNewUser = (needAddNewUser: boolean): needAddNewUserType =>
    ({type: SET_NEED_ADD_NEW_USER, needAddNewUser})

export type needAddNewGroupType = {
    type: typeof SET_NEED_ADD_NEW_GROUP
    needAddNewGroup: boolean
}
export const setNeedAddNewGroup = (needAddNewGroup: boolean): needAddNewGroupType =>
    ({type: SET_NEED_ADD_NEW_GROUP, needAddNewGroup})

export type messageFromServerType = {
    type: typeof SET_MESSAGE_FROM_SERVER
    messageFromServer: string
}
export const setMessageFromServer = (messageFromServer: string): messageFromServerType =>
    ({type: SET_MESSAGE_FROM_SERVER, messageFromServer})


export const requestUsers = (): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(toggleIsFetching(true));

        let data = await userAPI.getAllUsers();
        if (typeof (data) === "string") {
            dispatch(setMessageFromServer(String(data)))
        }
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data[0]));
        dispatch(setTotalUsers(data[1].totalUsers));

    }
}
export const requestAllGroups = (): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(toggleIsFetching(true));

        let data = await userAPI.getAllGroups();
        if (typeof (data) === "string") {
            dispatch(setMessageFromServer(String(data)))
        }
        dispatch(setGroups(data));
        dispatch(toggleIsFetching(false));
    }
}
export const updateSingleUser = (updatedUser: UserType): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setFetchingInProgress(true))
        let data = await userAPI.updateUser(updatedUser);
        dispatch(setUpdatedUser(data))
        if (data.nickname) {
            dispatch(setMessageFromServer('User ' + `${data.nickname}` + ' updated'))
        }
        if (typeof (data) === "string") {
            dispatch(setMessageFromServer(String(data)))
        }
        dispatch(toggleIsFetching(false));
        dispatch(setFetchingInProgress(false))
    }
}
export const updateSingleGroup = (updatedGroup: GroupType): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setFetchingInProgress(true))
        let data = await groupAPI.updateGroup(updatedGroup);
        dispatch(setUpdatedGroup(data))
        if (data.name) {
            dispatch(setMessageFromServer('Group ' + `${data.name}` + ' updated'))
        }
        if (typeof (data) === "string") {
            dispatch(setMessageFromServer(String(data)))
        }
        dispatch(toggleIsFetching(false));
        dispatch(setFetchingInProgress(false))
    }
}
export const addUser = (newUser: UserType): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setNeedAddNewUser(true));
        dispatch(setFetchingInProgress(true))
        let data = await userAPI.addNewUser(newUser);
        if (data.nickname) {
            dispatch(setMessageFromServer('User ' + `${data.nickname}` + ' added'))
        }
        if (typeof (data) === "string") {
            dispatch(setMessageFromServer(String(data)))
        }
        dispatch(toggleIsFetching(false));
        dispatch(setNeedAddNewUser(false));
        dispatch(setFetchingInProgress(false))
    }
}
export const addNewGroup = (newGroup: GroupType): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setNeedAddNewGroup(true));
        dispatch(setFetchingInProgress(true))
        let data = await groupAPI.addNewGroup(newGroup);
        if (data.name) {
            dispatch(setMessageFromServer('Group ' + `${data.name}` + ' added'))
        }
        if (typeof (data) === "string") {
            dispatch(setMessageFromServer(String(data)))
        }
        dispatch(toggleIsFetching(false));
        dispatch(setNeedAddNewGroup(false));
        dispatch(setFetchingInProgress(false))
    }
}
export const deleteSingleUser = (userId: number): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(setFetchingInProgress(true))
        dispatch(toggleIsFetching(true));
        let data = await userAPI.deleteUser(userId);
        dispatch(setMessageFromServer(String(data)))
        dispatch(toggleIsFetching(false));
        dispatch(setFetchingInProgress(false))
    }
}
export const deleteSingleGroup = (id:number): ThunkActionType => {
    return async (dispatch: DispatchType) => {
        dispatch(setFetchingInProgress(true))
        dispatch(toggleIsFetching(true));
        let data = await groupAPI.deleteGroup(id);
        dispatch(setMessageFromServer(String(data)))
        dispatch(toggleIsFetching(false));
        dispatch(setFetchingInProgress(false))
    }
}
type DispatchType = Dispatch<ActionType>
type ThunkActionType = ThunkAction<Promise<void>, AppStateType, any, ActionType>


export default userReducer;
