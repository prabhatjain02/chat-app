import React from 'react'

class DeleteRoom extends React.Component{
    render() {
        const joinedRooms = [...this.props.rooms].sort((a,b) => a.id > b.id)
        return (
            <div className="delete-room">
                <ul>
                    <h3>Already Joined Rooms: </h3>
                    {joinedRooms.map(room => {
                        return (
                            <li>
                                <a
                                    href="#"
                                    onClick={() => this.props.deleteRoom(room.id)}
                                >
                                # {room.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default DeleteRoom