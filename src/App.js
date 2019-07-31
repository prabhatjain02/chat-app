import React from 'react'
import Chatkit from '@pusher/chatkit-client'
import RoomList from './Components/RoomList'
import MessageList from './Components/MessageList'
import NewRoomForm from './Components/NewRoomForm'
import SendMessageFrom from './Components/SendMessageForm'
import UsersList from './Components/UsersList'
//import DeleteRoom from './Components/DeleteRoom'
import { instanceLocator, tokenUrl } from './config'


class App extends React.Component{
  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      allUsers: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
    //this.deleteRoom = this.deleteRoom.bind(this)
    //this.getRoomIds = this.getRoomIds.bind(this)
    this.getUsers = this.getUsers.bind(this)
  }

  componentDidMount() {

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "prabhat",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
      
    })
    .catch(err => console.log('error on connecting', err))

  }


  // to subscribe to a particular room
  subscribeToRoom(roomId) {
    this.setState({messages: []})
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
      this.getUsers(roomId)
    })
    .catch(err => console.log("error on subscribing rooms", err))
  }

  
  // get the users in each room
  getUsers(roomId) {
    this.setState({allUsers: []})
    this.currentUser.rooms.map(room => {
      if(roomId === room.id){
        this.setState({
          allUsers: [...this.state.allUsers, ...room.userIds]
        })
      }
    })
    // console.log(this.state.allUsers)
  }

  // to get the no. of rooms present
  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log("error on join able Rooms", err))

  }

  // to send message to a room
  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    })
  }

  // to create a room
  createRoom(name) {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log("error with creating room ", err))
  }

  // to delete a room
  // deleteRoom(roomId) {
  //   this.currentUser.deleteRoom({
  //     roomId
  //   })
  //   .then(console.log("deleted room is : ", roomId))
  //   .catch(err => console.log("error with deleting room", err))
  // }

  render() {
    return(
      <div className="app">
        <RoomList 
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom} 
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList 
          messages={this.state.messages}
          roomId={this.state.roomId}
        />
        <NewRoomForm createRoom={this.createRoom}/>
        <SendMessageFrom 
          sendMessage={this.sendMessage}
          disabled={!this.state.roomId} 
        />
        <UsersList
          users={this.state.allUsers}
        />
        {/* <DeleteRoom
          rooms= {[...this.state.joinedRooms]} 
          deleteRoom={this.deleteRoom}
        /> */}
      </div>
    )
  }
}

export default App