import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import p from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import userPhoto from "../../../assests/img/users.jpg";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileDataForm, {ProfileType} from "./ProfileDataForm";
import SocialLink from "./SocialLink/SocialLink";
import Analytics from "./Analitics/Analitics";

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    isOwner: boolean
    saveProfile: (profile: ProfileType) => Promise<any>
}

export const ProfileInfo = ({profile, status, updateStatus, savePhoto, isOwner, saveProfile}: ProfileInfoType) => {

    let [editMode, setEditMode] = useState(false);
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            });
    }
    return (
        <div className={s.descriptionBlock}>
            <div className={p.info}>
                <img className={p.ava__img} src={profile.photos.small || userPhoto}/>
                <ProfileStatus status={status} updateStatus={updateStatus}/>
                <p className={p.name}>{profile.fullName}</p>
                <p className={p.status}>{profile.lookingForAJobDescription}</p>
                <div className={p.editPhoto}>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} className={p.uploadInput}/>}
                </div>
            </div>
            <div className={p.editMode}>
                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>
                }
            </div>
            <div className={p.social}>
                <SocialLink/>
                <Analytics/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: any
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataPropsType) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {
            Object.keys(profile.contacts)
                .map((key) => {return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
        </div>
    </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

