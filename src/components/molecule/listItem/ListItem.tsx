import React from 'react'
import './ListItem.css'

const ListItem: React.FC = ({ children }) => {
  return <li className='listItem'>{children}</li>
}

export default ListItem
