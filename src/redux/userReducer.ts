import {UserLocation} from "../components/Users/UsersContainer";

export type UsersType = {
    id: number,
    photoUrl: string
    followed: boolean
    status: string
    location: UserLocation
    fullName: string
    photos: PhotosType

}
export type PhotosType = {
    small: null
    large: null
}

export type InitialStateTypeUsers = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize:number
    currentPage: number
}
let InitialStateUsers: InitialStateTypeUsers = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2
}

export const userReducer = (state: InitialStateTypeUsers = InitialStateUsers, action: ActionsTypes): InitialStateTypeUsers => {
    switch (action.type) {
        case 'FOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        };
        case 'UNFOLLOW': {
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        };
        case 'SET-USERS': {
            return {...state, users: action.users}
        }
        case 'SET-CURREN-PAGE': {
            return {...state, currentPage:action.currentPage }
        }
        case "SET-TOTAL-USERS-COUNT": {
            return {...state,totalUsersCount: action.totalUsersCount}
        }
        case "TOOGGLE-IS-FETCHING": {
            return {...state,isFetching: action.isFetching}
        }
        default:
            return state
    }
}

export const followAC = (userId: number) => ({
    type: 'FOLLOW',
    userId: userId
}) as const

export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId: userId
    } as const
}
export const setUsersAC = (users: Array<UsersType>) => ({type: 'SET-USERS', users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURREN-PAGE', currentPage} as const)
export const setTotalUsersCountAC = (totalUsersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', totalUsersCount} as const)
export const toggleIsFetchingAC = (isFetching: number) => ({type: 'TOOGGLE-IS-FETCHING', isFetching} as const)

export type ActionsTypes = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> | ReturnType<typeof setTotalUsersCountAC>| ReturnType<typeof toggleIsFetchingAC>
