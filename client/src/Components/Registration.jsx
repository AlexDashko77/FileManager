import { useState } from "react"

const Registration = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')

    const registration = (e) => {
        e.preventDefault()
        console.log(name, email, password);
        if(password == repeatedPassword) {
            fetch('http://localhost:5000/registration',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        })
        window.location.href = '/login'
        } else{
            console.log('Пароли не совпадают');
        }
    }    
    return (
        <>
            <div className="container">
                <h1>Регистрация</h1>
                <form className="registration">
                    <div>
                        <label>Имя:</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Введите ваше имя" />
                    </div>
                    <div>
                        <label>Почта:</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Введите ваш email" />
                    </div>
                    <div>
                        <label>Пароль:</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Введите ваш пароль" />
                    </div>
                    <div>
                        <label>Повтор пароля:</label>
                        <input onChange={(e) => setRepeatedPassword(e.target.value)} type="password" placeholder="Введите ваш пароль" />
                    </div>
                    <button onClick={(e) => registration(e)}>Зарегистрироваться</button>
                </form>
            </div>
        </>
    )
}

export default Registration