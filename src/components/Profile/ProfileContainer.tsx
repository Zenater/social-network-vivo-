import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/storeRedux";
import {getUserProfileTC, setUsersProfile} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";
import {profileApi} from "../../api/ProfileApi/profileApi";

export type MapStateToPropsTypeProfile = {
    profile: any
}

type PathParamsType = {
    // userID: number
}

export type MapDispatchProfile = {
    setUsersProfile: (profile: any) => void
}

export type Owntype = MapStateToPropsTypeProfile & MapDispatchProfile
export type ProfileContainerType = PathParamsType & Owntype

const mapStateToProps = (state: AppRootStateType): MapStateToPropsTypeProfile => {
    return {
        profile: state.profileReducer.profile
    }
}

const ProfileContainer = (props: ProfileContainerType) => {

    let params:any = useParams<any>();

    // getUserProfileTC(params.userId)

    // profileApi.getProfile(params.userId)
    //     .then(responce => {
    //         props.setUsersProfile(responce.data)
    // })

    useEffect(() => {
        axios.get<any>(`https://social-network.samuraijs.com/api/1.0/profile/` + params.userID)
            .then(responce => {
                props.setUsersProfile(responce.data)
            });
    }, [])

    return (
        <Profile profile={props.profile}  setUsersProfile={setUsersProfile}/>
    )
}
export default connect<MapStateToPropsTypeProfile, MapDispatchProfile, {}, AppRootStateType>(mapStateToProps,
    {setUsersProfile})(ProfileContainer);
