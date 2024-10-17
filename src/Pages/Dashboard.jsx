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
import { PrintButton } from "@/components/Imprimir";
import { PrintButtonE } from "@/components/PrintStadistic";
import ApprovalSelect from "@/components/AprpovalSelect";

export default function Dashboard() {
    const [selectedUser, setSelectedUser] = useState("all");
    const [aprobacion, setAprobacion] = useState(undefined);
    const [reprobacion, setReprobacion] = useState(undefined);
    const [ambushes, setAmbushes] = useState(null);
    const [combats, setCombats] = useState(null);
    const [patrolsLen, setPatrolsLen] = useState(null);
    const [patrols, setPatrols] = useState(null);
    const [recognitions, setRecognitions] = useState(null);

    const fetchDashboard = async (userId = "all", aprobacion, reprobacion) => {
        window.scrollTo(0, 0);

        try {
            const responsePatrols = await getPatrols(userId, aprobacion, reprobacion);
            const dataPatrols = responsePatrols.data;
            setPatrolsLen(calculateTamPatrols(dataPatrols));
            setPatrols(getPatrolsLastSixMonths(dataPatrols));
        } catch (error) {
            console.log('Error al obtener las patrullas', error);
        }
        try {
            const response = await getAmbushes(userId, aprobacion, reprobacion);
            const data = response.data;
            setAmbushes(formationAverages(data));
        } catch (error) {
            console.log('Error al obtener las emboscadas', error);
        }
        try {
            const responseCombats = await getCombats(userId, aprobacion, reprobacion);
            const dataCombats = responseCombats.data;
            setCombats(calculateAveragesCombats(dataCombats));
        } catch (error) {
            console.log('Error al obtener los combates', error);
        }
        
        try {
            const responseRecognitions = await getRecognition(userId, aprobacion, reprobacion);
            const dataRecognitions = responseRecognitions.data;
            setRecognitions(calculateAveragesRecognitions(dataRecognitions))
        } catch (error) {
            console.log('Error al obtener los reconocimientos', error);
        }
    }

    useEffect(() => {
        fetchDashboard(selectedUser, aprobacion, reprobacion);
    }, [selectedUser, aprobacion, reprobacion])

    const handleUserChange = (userId) => {
        console.log(userId)
        setSelectedUser(userId);
    }

    const handleApprovalChange = (newAprobacion, newReprobacion) => {
        setAprobacion(newAprobacion);
        setReprobacion(newReprobacion);
    }

    return (
        <main className=" ">
        <div id="printable-area">
            <Title text="Dashboard" />
            <div className="my-4 sm:flex  sm:space-x-4">
            <PrintButtonE/>

                <UserSelect onUserChange={handleUserChange} />
                <ApprovalSelect onChange={handleApprovalChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
                <FormationRadar chartData={ambushes} />
                <PatrolsArea chartData={patrols} />
                {patrolsLen && <PatrolLength chartData={patrolsLen} />}
                <CombatsBar chartData={combats} />
                <div className="sm:col-span-2">
                    <RecognitionRadar chartData={recognitions} />
                </div>
            </div>
            </div>
        </main>
    )
}