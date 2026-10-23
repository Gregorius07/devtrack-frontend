import api from "../api"
import { useNavigate } from "react-router"
export default function Login(){
    const navigate = useNavigate()

    const handleLogin= async function (formData){
        const data = Object.fromEntries(formData.entries())
        
        try {
            const response = await api.post("/auth/login", data)
            console.log("LOGIN BERHASIL", response.data)
            navigate("/dashboard")
        } catch (error) {
            if (error.response) {
                console.error(
                    "Login gagal:",
                    error.response.status,
                    error.response.data
                )
            } else {
                console.error("Login tidak dapat terhubung ke backend:", error.message)
            }
        }
    }

    
    
    return(
        <form action={handleLogin}>
            <input type="email" name="email" id="email" placeholder="Masukkan email"/>
            <input type="password" name="password" id="password" placeholder="Masukkan password"/>
            <button type="submit">Login</button>
        </form>

    )
}