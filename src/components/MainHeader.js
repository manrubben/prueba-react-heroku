import React from 'react'
import {Link} from 'react-router-dom'

const MainHeader = () => {
    return (
        <div>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/hola'>Hola</Link></li>
            <li><Link to='/crud'>CRUD</Link></li>
        </div>
    )
}

export default MainHeader;
