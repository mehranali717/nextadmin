import { loginStyles } from "../ui"

const LoginPage =()=>{
    return (
        <div className={loginStyles.container}>
            <form action="" className={loginStyles.form}>
                <h1>Login</h1>
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="assword"/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginPage