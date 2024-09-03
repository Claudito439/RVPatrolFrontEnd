import { getAmbushes, getCombats, getPatrols, getRecognition } from "@/api/dashboard";
import Title from "@/components/ui/title";
import { calculateAveragesCombats, calculateAveragesRecognitions, calculateTamPatrols, formationAverages, getPatrolsLastSixMonths } from "../lib/dashboard.utils";
import { useEffect, useState } from "react";
import { FormationRadar } from "@/components/charts/FormationRadar";
import { CombatsBar } from "@/components/charts/CombatsBar";
import { PatrolLength } from "@/components/charts/PatrolLength";
import { PatrolsArea } from "@/components/charts/PatrolsArea";
import { RecognitionRadar } from "@/components/charts/RecognitionRadar";

export default function Dashboard() {
    const [ambushes, setAmbushes] = useState(null);
    const [combats, setCombats] = useState(null);
    const [patrolsLen, setPatrolsLen] = useState(null);
    const [patrols, setPatrols] = useState(null);
    const [recognitions, setRecognitions] = useState(null);


    const fetchDasboard = async () => {
        window.scrollTo(0, 0);

        try {
            const response = await getAmbushes();
            const data = response.data;
            setAmbushes(formationAverages(data));
        } catch (error) {
            console.log('Error al obtener los mapas', error);
        }
        try {
            const responseCombats = await getCombats();
            const dataCombats = responseCombats.data;
            setCombats(calculateAveragesCombats(dataCombats));
        } catch (error) {
            console.log('Error al obtener los mapas', error);
        }
        try {
            const responsePatrols = await getPatrols();
            const dataPatrols = responsePatrols.data;
            setPatrolsLen(calculateTamPatrols(dataPatrols));
            setPatrols(getPatrolsLastSixMonths(dataPatrols));
        } catch (error) {
            console.log('Error al obtener los mapas', error);
        }
        try {
            const responseRecognitions = await getRecognition();
            const dataRecognitions = responseRecognitions.data;
            setRecognitions(calculateAveragesRecognitions(dataRecognitions))
        } catch (error) {
            console.log('Error al obtener los mapas', error);
        }
    }
    useEffect(() => {
        fetchDasboard();
    }, [])

    return (
        <main className=" ">
            <Title text="Dashboard" />

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