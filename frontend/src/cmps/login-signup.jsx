import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { addUser, login } from '../store/user.actions.js'
import { CredentialsForm } from './credentials-form.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)
    const [message, setMessage] = useState('')

    function onSubmit(userCred) {
        isSignup ? onSignup(userCred) : onLogin(userCred)
    }

    async function onLogin(userCred) {
        try {
            const user = await login(userCred)
            console.log(user)
            // window.location.reload()
        }
        catch (err) {
            console.log('err', err)
            showErrorMsg(err)
        }
    }

    async function onSignup(userCred) {
        try {
            const user = await addUser(userCred)
            await onLogin(userCred)
            console.log(user)
        }
        catch (err) {
            showErrorMsg(err)
        }
    }

    return (
        <div className='login-screen'>
            <CredentialsForm onSubmit={onSubmit} isSignup={isSignup} setIsSignUp={setIsSignUp} />
            <span>{message}</span>
            <section className="new-user">
                <a onClick={() => setIsSignUp((prev) => !prev)}>
                    {isSignup ?
                        'Already a member? Click here' :
                        'Don\'t have an account? Signup here'
                    }</a >
            </section>
        </div >
    )
}