import api from "../api"

export default function CreateUser(){
    
    const handleCreateUser = async function (formData) {
        const data = Object.fromEntries(formData.entries())
        console.log("DATA USER ----", data)
        try {
            const response = await api.post("/auth/register", JSON.stringify(data))
            console.log("CREATE USER SUCCESS");
            console.log("RES ----", response)

        } catch (error) {
            console.log(error.response.data)
        }
    }
    
    return(
        <>
            <form action={handleCreateUser}>
                <input type="text" name="name" id="name" placeholder="Masukkan nama" />
                <input type="email" name="email" id="email" placeholder="Masukkan email" />
                <input type="password" name="password" id="password" placeholder="Masukkan password" />
                <button type="submit">Buat User</button>
            </form>
        </>
    )
}