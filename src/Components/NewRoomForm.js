import React from 'react'

class NewRoomForm extends React.Component{
    constructor() {
        super() 
        this.state = {
            enteredRoom: ""
        }
        this.handleChangeOfRoom = this.handleChangeOfRoom.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeOfRoom(event) {
        this.setState({
            enteredRoom: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createRoom(this.state.enteredRoom)
       this.setState({
           enteredRoom: ""
       }) 
    }
    render() {
        return (
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChangeOfRoom}
                        type="text"
                        placeholder="Create a Room" 
                        value={this.state.enteredRoom}
                        required
                    />
                    <button id="create-room-btn" type="submit"> + </button>
                </form>
            </div>
        )
    }
}

export default NewRoomForm