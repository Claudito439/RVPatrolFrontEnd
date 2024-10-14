
import { getAmbushes } from "@/api/dashboard";
import { AmbushesDataTable } from "@/components/ReporteTarea";
import Title from "@/components/ui/title";
import axios from "../api/axios";

import { useEffect, useState } from "react";
import { PrintButton } from "@/components/Imprimir";
import { PrintButtonE } from "@/components/PrintStadistic";

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
        <main className=" ">
            <Title text="Emboscadas" /> {/* Cambia el título */}
            <PrintButtonE/>
            <div id="printable-area"  className="print:w-full print:border print:border-black">
                <AmbushesDataTable ambushes={ambushes} />
            </div>
        </main>
    )
}
