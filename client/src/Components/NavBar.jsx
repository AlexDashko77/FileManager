import { NavLink } from "react-router-dom"

const NavBar = ({user, setUser, setList}) => {

    const changeSmth = () => {
      setUser('')
      setList([])
    }

    return (
        <>
        {!user ? <div className="navbar">
           <span className="title">File Manager</span>
           <ul>
            <li><NavLink to='/'>Регистрация</NavLink></li>
            <li><NavLink to='/login'>Авторизация</NavLink></li>
           </ul>
         </div> :
         
         <div className="navbar">
           <span className="title">File Manager</span>
           <ul>
            <li><NavLink to={'/main'}>Главная</NavLink></li>
            <li><NavLink to='/createFile'>Создать файл</NavLink></li>
            <li>{user}</li>
            <li ><NavLink onClick={changeSmth} to='/login'>Выйти</NavLink></li>
           </ul>
         </div>}
         
        </>
    )
}
export default NavBar