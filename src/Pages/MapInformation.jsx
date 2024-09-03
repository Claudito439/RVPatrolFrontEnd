import { getMap } from "@/api/maps";
import { PatrolPie } from "@/components/charts/PatrolPie";
import { PatrolTable } from "@/components/PatrolTable";
import Title from "@/components/ui/title";
import { UserTable } from "@/components/UserTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MapInformation() {
    const [map, setMap] = useState(null)
    const [users, setUsers] = useState(null)
    const [usersPie, setUsersPie] = useState(null)

    const param = useParams()

    const userArmy = (data) => {
        let contador = {
            ejercito: 0, fuerza: 0, armada: 0, otro: 0
        }


        data.forEach(user => {
            console.log(user)
            if (user.ffaa == "Ejercito") contador.ejercito += 1;
            else if (user.ffaa == "Fuerza Area") contador.fuerza += 1;
            else if (user.ffaa == "Armada") contador.armada += 1;
            else contador.otro += 1;
        })
        const chartData = [
            { ffaa: "ejercito", registros: contador.ejercito, fill: "hsl(var(--chart-1))" },
            { ffaa: "armada", registros: contador.armada, fill: "hsl(var(--chart-2))" },
            { ffaa: "fuerza_aerea", registros: contador.fuerza, fill: "hsl(var(--chart-3))" },
            { ffaa: "other", registros: contador.otro, fill: "hsl(var(--chart-4))" },
        ]

        return chartData;
    }

    const fetchMap = async () => {
        try {
            //console.log(param)
            const response = await getMap(param.mapId);
            const data = response.data;
            const usrs = data.patrols.map(patrol => patrol.user)
            setMap(data);
            setUsers(usrs);
            setUsersPie(userArmy(usrs));
            console.log(userArmy(usrs))
        } catch (error) {
            console.log('Error al obtener los mapas', error);
        }
    }

    useEffect(() => {
        fetchMap();
    }, [])

    return (
        <>
            <Title text="Informacion sobre el Mapa" />
            {map && <>
                <PatrolTable name={map.name} patrols={map.patrols} />
                <div className="grid grid-cols-1 md:grid-cols-2 my-4 w-full gap-3">
                    <UserTable users={users} />
                    <PatrolPie users={usersPie} />
                </div>
            </>
            }

        </>
    )
}