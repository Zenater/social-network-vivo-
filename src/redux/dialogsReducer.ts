
export type PostType = {
    id: number
    message: string
    likes: number
}
export type ProfilePageType = {
    post: Array<PostType>
    messageForNewPost: string
}

export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessageType[]
    newMessageBody:string
}
type SidebarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar?: SidebarType
}

//////////////////////////////////////////////
export type MessageType = {
    id: number
    message: string
}

export type DialogsType = {
    id: number
    name: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Valera'},
        {id: 2, name: 'Sveta'},
        {id: 3, name: 'Jon'},
        {id: 4, name: 'Victor'},
        {id: 5, name: 'Oleg'},
        {id: 6, name: 'Igor'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Yo'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'i tried'}
    ] as Array<MessageType>,
    newMessageBody: '',
}
export type InitialStateTypeDialogs = typeof initialState

export const dialogsReducer = (state: InitialStateTypeDialogs= initialState, action: ActionsTypes):InitialStateTypeDialogs => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY': {
            return {
                ...state,
                newMessageBody: action.newText
            };
        }
        case 'SEND-MESSAGE': {
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 7, message: body}]
            };
        }
        default:
            return state
    }
}

export const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE'
    } as const
}
export const updateNewMessageBodyAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        newText: newText
    } as const
}


export type ActionsTypes = ReturnType<typeof updateNewMessageBodyAC> | ReturnType<typeof sendMessageAC>