import axios from "axios";
import {GroupType, usersAPIType, UserType} from "../Types/Types";


const instance = axios.create({
    withCredentials: false,
    baseURL: `http://localhost:5000/`
})


export const userAPI = {
    getAllUsers() {
        return instance.get <usersAPIType>(`users`)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },
    addNewUser(newUser: UserType) {
        return instance.post <UserType>(`users`, newUser)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },
    getAllGroups() {
        return instance.get <Array<GroupType>>(`groups`)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },
    updateUser(updatedUser: UserType) {
        return instance.post <UserType>(`users/update`, updatedUser)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },
    deleteUser(userId: number) {
        return instance.post <string>(`users/del`, userId)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },


}
export const groupAPI = {

    addNewGroup(newGroup: GroupType) {
        return instance.post <GroupType>(`create`, newGroup)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },

    updateGroup(updatedGroup: GroupType) {
        return instance.post <GroupType>(`update`, updatedGroup)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },

    deleteGroup(id:number) {
        return instance.post <string>(`/del`, id)
            .then(response => {
                return response.data
            }).catch(function (error) {
                if (error.response) {
                    return error.response.data.message
                }
            });
    },


}

