import { getUsers } from "@/api/users";
import Title from "@/components/ui/title";
import { UsersDataTable } from "@/components/UsersDataTable";
import { UserTable } from "@/components/UserTable";
import { useEffect, useState } from "react";



export default function Users() {
    const [users, setUsers] = useState({})

    const fetchUsers = async () => {
        try {
            //console.log(param)
            const response = await getUsers();
            const data = response.data;
            setUsers(data);
        } catch (error) {
            console.log('Error al obtener los usuarios', error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <main className=" ">
            <Title text="Usuarios" />
            <UsersDataTable users={users}/>

        </main>
    )
}