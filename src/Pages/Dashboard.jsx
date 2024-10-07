import { getAmbushes, getCombats, getPatrols, getRecognition } from "@/api/dashboard";
import Title from "@/components/ui/title";
import { calculateAveragesCombats, calculateAveragesRecognitions, calculateTamPatrols, formationAverages, getPatrolsLastSixMonths } from "../lib/dashboard.utils";
import { useEffect, useState } from "react";
import { FormationRadar } from "@/components/charts/FormationRadar";
import { CombatsBar } from "@/components/charts/CombatsBar";
import { PatrolLength } from "@/components/charts/PatrolLength";
import { PatrolsArea } from "@/components/charts/PatrolsArea";
import { RecognitionRadar } from "@/components/charts/RecognitionRadar";
import UserSelect from "@/components/UserSelect";
//hola
export default function Dashboard() {
    const [selectedUser, setSelectedUser] = useState("all");
    const [ambushes, setAmbushes] = useState(null);
    const [combats, setCombats] = useState(null);
    const [patrolsLen, setPatrolsLen] = useState(null);
    const [patrols, setPatrols] = useState(null);
    const [recognitions, setRecognitions] = useState(null);

    const fetchDashboard = async (userId = "all") => {
        window.scrollTo(0, 0);

        try {
            const responsePatrols = await getPatrols(userId);
            const dataPatrols = responsePatrols.data;
            setPatrolsLen(calculateTamPatrols(dataPatrols));
            setPatrols(getPatrolsLastSixMonths(dataPatrols));
        } catch (error) {
            console.log('Error al obtener las patrullas', error);
        }
        try {
            const response = await getAmbushes(userId);
            const data = response.data;
            setAmbushes(formationAverages(data));
        } catch (error) {
            console.log('Error al obtener las emboscadas', error);
        }
        try {
            const responseCombats = await getCombats(userId);
            const dataCombats = responseCombats.data;
            setCombats(calculateAveragesCombats(dataCombats));
        } catch (error) {
            console.log('Error al obtener los combates', error);
        }
        
        try {
            const responseRecognitions = await getRecognition(userId);
            const dataRecognitions = responseRecognitions.data;
            setRecognitions(calculateAveragesRecognitions(dataRecognitions))
        } catch (error) {
            console.log('Error al obtener los reconocimientos', error);
        }
    }

    useEffect(() => {
        fetchDashboard(selectedUser);
    }, [selectedUser])

    const handleUserChange = (userId) => {
        console.log(userId)
        setSelectedUser(userId);
    }

    return (
        <main className=" ">
            <Title text="Dashboard" />
            <div className="my-4">
                <UserSelect onUserChange={handleUserChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
                <FormationRadar chartData={ambushes} />
                <PatrolsArea chartData={patrols} />
                {patrolsLen && <PatrolLength chartData={patrolsLen} />}
                <CombatsBar chartData={combats} />
                <div className="col-span-2 ">
                    <RecognitionRadar chartData={recognitions} />
                </div>
            </div>
        </main>
    )
}