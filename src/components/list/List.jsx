import React from 'react'
import './List.css'
import UserInfo from './userinfo/UserInfo.jsx'
import ChatList from './chatList/ChatList.jsx'


const List = () => {
  return (
    <div className='list'>
      <UserInfo/>
      <ChatList/>
    </div>
  )
}

export default List