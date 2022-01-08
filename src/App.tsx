import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {addPost,  state} from "./redux/state";

export const changeNewText= (newText: string) => {
    state.profilePage.messageForNewPost = newText;
}


export const App =()=> {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                {/*     <Settings/>*/}
                <div className={'app-wrapper-content'}>
                    <Routes>
                        <Route path='/dialogs' element={<Dialogs dialogs={state.dialogsPage.dialogs} messages={state.dialogsPage.messages} />}/>
                        <Route path='/profile' element={<Profile  post={state.profilePage.post}
                                                                  addPostCallBack={addPost}
                                                                  message={state.profilePage.messageForNewPost}
                                                                  changeTextCallback={changeNewText}

                        />}/>

                        <Route path='/news' element={<News/>}/>
                        <Route path='/music' element={<Music/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
