import { userService } from '../services/user.service.js'
import { useState } from 'react'
import filtergramLogo from '../assets/img/filtergramLogo.png'

export function CredentialsForm({ onSubmit, isSignup, setIsSignUp }) {

    const [userCred, setUserCred] = useState(userService.getEmptyCred())

    function handleChange({ target }) {
        const { name: field, value } = target
        setUserCred(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSubmit(userCred)
    }

    function onDemoUserMode() {
        setUserCred(userService.getDemoUserCred())
        console.log(userCred)
        if (isSignup) setIsSignUp(false)
        onSubmit(userCred)

        // userService._createGuest()
        // window.location.reload()
    }

    return (
        <div className='login-container'>
            <form className="credentials-form" onSubmit={handleSubmit}>
                <section>
                    <img src={filtergramLogo} alt="Logo" className="logo" />
                    <input
                        className="txt-input username"
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        // required
                        autoFocus
                    />
                    <input className="txt-input password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    // required
                    />
                    {isSignup && <input
                        className="txt-input fullname"
                        type="text"
                        name="fullname"
                        placeholder="Full name"
                        onChange={handleChange}
                    // required
                    />}
                    <button className="btn log-btn">{isSignup ? 'Signup' : 'Login'}</button>
                    <span class="or"><span>OR</span></span>
                    <button className="btn demo-user" onClick={onDemoUserMode}>Have fun with a Demo user</button>
                </section>
            </form>
        </div>
    )
}
