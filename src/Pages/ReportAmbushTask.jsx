
import { getAmbushes } from "@/api/dashboard";
import { AmbushesDataTable } from "@/components/ReporteTarea";
import Title from "@/components/ui/title";
import axios from "../api/axios";

import { useEffect, useState } from "react";
import { PrintButton } from "@/components/Imprimir";
import { PrintButtonE } from "@/components/PrintStadistic";
import BotonReporte from "@/components/BotonReporte";

var global="https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushes"
export default function Ambushes() { // Cambia el nombre de la función si ahora muestra emboscadas
    const [ambushes, setAmbushes] = useState([]); // Cambiado a un array

    const fetchAmbushes = async () => {
        try {
            const response = await axios.get('/ambushes');
            console.log(response.data);
            const data = response.data;
            setAmbushes(data); // Almacena los datos de emboscadas
        } catch (error) {
            console.log('Error al obtener las emboscadas', error);
        }
    }

    useEffect(() => {
        fetchAmbushes(); // Ejecuta la función para obtener emboscadas
    }, []);

    return (
        <main className="p-4">
            <Title text="Emboscadas" /> {/* Cambia el título */}
            
            {/* Flex container for buttons */}
            <div className="flex flex-wrap gap-4 justify-start items-center mb-4"> {/* Flexbox classes */}
                <PrintButtonE/>
                <BotonReporte title={"Reporte Global"} route={global} modal={false}/>
                <BotonReporte title={"Reporte por persona"} modal={true}/>
                <BotonReporte title={"Aprobados"}/>
                <BotonReporte title={"Reprobados"}/>
            </div>
            
            <div id="printable-area" className="print:w-full print:border print:border-black">
                <AmbushesDataTable ambushes={ambushes} />
            </div>
        </main>
    )
}
