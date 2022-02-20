export type userMapStateToPropsType = {
    users: Array<UserType>
    selectedUser: UserType
    updatedUser: UserType
    groups: Array<GroupType>
    getUsers: () => Promise<void>
    updateSingleUser: (arg0: UserType) => Promise<UserType>
    messageFromServer: string
    deleteSingleUser: (arg0: { id: number }) => Promise<string>
    setMessageFromServer: (arg0: string) => void
    isFetching: boolean
    setSelectedUser: (arg0: UserType) => void
    needAddNewUser: boolean
    needUpdate:boolean
}
export type UsersPropsType = {
    addUser: (arg0: UserType) => void
    groups: Array<GroupType>
    users: Array<UserType>
    selectedUser: UserType
    updateSingleUser: (arg0: UserType) => Promise<UserType>
    messageFromServer: string
    deleteSingleUser: (arg0: { id: number }) => Promise<string>
    setMessageFromServer: (arg0: string) => void
    isFetching: boolean
    setSelectedUser: (arg0: UserType) => void
    setNeedAddNewUser: (arg0: boolean) => void
    needAddNewUser: boolean
}

export type usersMapDispatchToPropsType = {
    addUser: (arg0: UserType) => void
    requestUsers: () => void
    updateSingleUser: (arg0: UserType) => Promise<UserType>
    deleteSingleUser: (arg0: { id: number; }) => Promise<string>
    setMessageFromServer: (arg0: string) => void
    getGroups: () => void
    setSelectedUser: (arg0: UserType) => void
    setNeedAddNewUser: (arg0: boolean) => void
}
type onlyUsersType = Array<UserType>
type totalUsersType = {
    totalUsers: number
}

export type usersAPIType = {
    0: onlyUsersType
    1: totalUsersType
}
export type GroupType = {
    id?: number
    name: string
    description?: string
}

export type UserType = {
    id?: number
    nickname: string
    created_at?: string
    updated_at?: string
    groupId?: number
}

export type groupMapStateToPropsType = {
    isFetching: boolean
    messageFromServer: string
    groups:Array<GroupType>
    needAddNewGroup:boolean
    selectedGroup:GroupType
    deleteSingleGroup: (arg0: { id: number; }) => Promise<void>
    needUpdate:boolean
}
export type groupMapDispatchToPropsType = {
    setMessageFromServer: (arg0: string) => void
    getGroups: () => void
    deleteSingleGroup: (arg0: { id: number; }) => Promise<void>
    setSelectedGroup:(arg0: GroupType) => void
    setNeedAddNewGroup:(arg0: boolean) => void
    addNewGroup:(arg0: GroupType) => void
    updateSingleGroup:(arg0: GroupType) => void
}
export type GroupPropsType = {
    setMessageFromServer: (arg0: string) => void
    deleteSingleGroup: (arg0: { id: number; }) => Promise<void>
    isFetching: boolean
    messageFromServer: string
    groups:Array<GroupType>
    setSelectedGroup:(arg0: GroupType) => void
    setNeedAddNewGroup:(arg0: boolean) => void
    needAddNewGroup:boolean
    addNewGroup:(arg0: GroupType) => void
    selectedGroup:GroupType
    updateSingleGroup:(arg0: GroupType) => void
}
