import { useState } from "react"
import { api } from "../../../services/api"
import { useNavigate } from 'react-router-dom'
import { objectToFormData } from "../../../utils/objectToFormData";


const CreateUserPage = () => {

    let navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [userPhoto, setUserPhoto] = useState('')


    // const addPhoto = async (id) => {
    //     const formData = new FormData()
    //     formData.append('profile_picture[]', userPhoto[0])
    //     try {const response = await api.post(`user/add_profile_picture/${id}`, formData)

    //     if (response.data) {
    //         alert("Usuário criado com sucesso")
    //     }
    //     }catch(e){alert(e)}
    // }

    const createUser = async (e) => {
        e.preventDefault()
        
        const formData = objectToFormData({
            user: {
                name: userName,
                is_admin: false,
                profile_picture: userPhoto[0],
                email,
                password
            }
        })

        try {
            const response = await api.post("/user/create", formData)
    
            if (response.data) {
                // addPhoto(response.data.id)
                navigate('/genres')
            }
        } catch(e) {
            alert(e)
        }
        
    }
    
    return (
        <>
            <h1>Adicionar um usuário:</h1>
            <form style={{display: 'flex', flexDirection:'column'}} 
                onSubmit={createUser}>
                <input
                    style={{marginLeft: '20rem', fontSize: `3rem`}}
                    placeholder="Nome do usuário"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    style={{marginLeft: '20rem', fontSize: `3rem`}}
                    placeholder="Email do usuário"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    style={{marginLeft: '20rem', fontSize: `3rem`}}
                    placeholder="Senha do usuário"
                    
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    style={{marginLeft: '20rem', fontSize: `3rem`}}
                    type='file'
                    onChange={(e) => setUserPhoto(e.target.files)}
                />
                <button
                    style={{marginLeft: '20rem', fontSize: `3rem`, width:'fit-content'}}
                    type="submit">Criar</button>
            </form>
        </>
    )
}

export default CreateUserPage