import api from "../api"
import { useState } from "react";
export default function UpdateUser({userid}){
    const [data, setData] = useState({});
    const [newData, setNewData] = useState({})
    //fetch current data user
    const currentData = async function () {
        try {
            const response = await api.get ("/users/{userid}")
            data = response.data
        } catch (error) {
            throw new Error("Tidak dapat mendapatkan data user");
        }
    }

    const handleUpdateUser = async function (formData){
        try{
            setNewData({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            const response = await api.post("/users/"+userid, newData)
        } catch(error){
            throw new Error ("Tidak dapat mengupdate data user")
        }
    }

    
    return(
        <div>
            <form action={handleUpdateUser}>

            <h1>Update User</h1>
            <input type="text" name="name" placeholder={data?.name}></input>
            <input type="email" id="name" name="email" placeholder={data?.email}></input>
            <input type="password" name="password" placeholder={data?.password}></input>
            </form>
        </div>
    )
}