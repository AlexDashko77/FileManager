import { useState } from "react"
import { useNavigate } from "react-router-dom";



const Login = ({setUser, user}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();

    const login = (e) => {
        e.preventDefault()
            fetch('http://localhost:5000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        }).then((data) => data.json()).then((data) => setUser(data.username))
    } 
    setTimeout(() => {
        if(user) {
            return navigate('/main')
        }
    }, 1000)
    
   
    
    return (
        <>
            <div className="container">
                <h1>Авторизация</h1>
                <form className="registration">
                    <div>
                        <label>Почта:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Введите вашу почту"/>
                    </div>
                    <div>
                        <label>Пароль:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Введите ваш пароль"/>
                    </div>
                    <button onClick={(e) => login(e)}>Войти</button>
                </form>
            </div>
        </>
    )
}
export default Login