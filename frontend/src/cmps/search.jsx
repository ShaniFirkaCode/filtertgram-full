import { useEffect, useState } from "react"
import { loadUsers } from "../store/user.actions"
import { useSelector } from "react-redux"
import { UserList } from "./user-list"

export function Search() {

    const { users } = useSelector((storeState) => storeState.userModule.users) || []
    const [filterBy, setFilterBy] = useState({ txt: '' })

    useEffect(() => {
        loadUsers(filterBy)
        console.log('users', users)
    }, [filterBy])

    function handleChange({ target }) {
        const { name: field, value } = target
        setFilterBy(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="search">
            <h1>Search users</h1>
            <form>
                <input
                    type="text"
                    name="txt"
                    placeholder="Search users..."
                    onChange={handleChange}
                    autoFocus
                />
            </form>

            <UserList users={users} />
        </div>
    )
}