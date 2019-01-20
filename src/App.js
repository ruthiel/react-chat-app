import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { instanceLocator, tokenUrl } from './config'

class App extends React.Component {

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager( {
          instanceLocator,
          userId: 'ruthiel',
          tokenProvider: new Chatkit.TokenProvider({
            url: tokenUrl
          })
        })

        chatManager.connect()
        .then(currentUser => {
          currentUser.subscribeToRoom({
            roomId: 19395159,
            hooks: {
              onNewMessage: message => {
                console.log('message.text: ', message.text);
              }
            }
          })
        })
    }

    render() {
        return (
            <div className="app">
                <RoomList />
                <MessageList />
                <SendMessageForm />
                <NewRoomForm />
            </div>
        );
    }
}

export default App
