import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { Navbar } from './cmps/navbar'
import { HomeIndex } from './pages/home-index'
import { NavbarMobile } from './cmps/navbar-mobile'
import { Explore } from './pages/explore'
import { Profile } from './pages/profile'
import { Messages } from './pages/messages'
import { Reels } from './pages/reels'
import { StoryEdit } from './cmps/story-edit'
import { StoryDetails } from './cmps/story-details'
import { userService } from './services/user.service'
import { loadUser, logout } from './store/user.actions'
import { EditImg } from './cmps/edit-img'
import { LoginSignup } from './cmps/login-signup'
import { Search } from './cmps/search'
import useBreakpoint from 'use-breakpoint'

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 }

export function RootCmp() {

    const user = useSelector(storeState => (storeState.userModule.loggedinUser))
    const [isStoryEdit, setisStoryEdit] = useState(false)
    const location = useLocation()
    const background = location.state && location.state.background
    const { breakpoint, maxWidth, minWidth } = useBreakpoint(
        BREAKPOINTS,
        'desktop'
    )

    async function onLogout() {
        try {
            await logout()
        } catch (err) {
            console.log(err)
        }
    }

    if (!user) return <LoginSignup />

    return (
        <div className='app flex'>
            {breakpoint !== 'mobile' && < Navbar onLogout={onLogout} setisStoryEdit={setisStoryEdit} user={user} />}
            {isStoryEdit && <StoryEdit setisStoryEdit={setisStoryEdit} />}

            <main className='main-section'>
                <Routes location={background || location}>
                    <Route element={<HomeIndex />} path="/" />
                    <Route element={<Search />} path="/search" />
                    <Route element={<Explore />} path="/explore" />
                    <Route element={<Reels />} path="/reels" />
                    <Route element={<Messages />} path="/messages" />
                    <Route element={<Profile />} path="/profile/:userId" />
                </Routes>
            </main>
            {breakpoint === 'mobile' && <NavbarMobile onLogout={onLogout} setisStoryEdit={setisStoryEdit} user={user} />}
        </div >
    )
}

