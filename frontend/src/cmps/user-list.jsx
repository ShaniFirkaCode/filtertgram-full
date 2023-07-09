import { UserPreview } from "./user-preview";

export function UserList({ users }) {

    return (

        <ul className="users-list clean-list">
            {users.map(user =>
                <li key={user._id}>
                    <UserPreview user={user} />
                </li>
            )}

        </ul>

    )
}