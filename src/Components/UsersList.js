import React from 'react'

function UsersList(props) {
    return (
        <div className="users-list">
            <ul>
                <h3>Users List: </h3>
                {props.users.map(user => {
                    return(
                        <li key={user.length} className="individual-user">
                            {user}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default UsersList