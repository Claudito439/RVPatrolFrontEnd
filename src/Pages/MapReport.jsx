import { getMaps } from "@/api/maps";
import PatrullajesCard from "@/components/PratullajesCard";
import Title from "@/components/ui/title";
import { useEffect, useState } from "react";

export default function MapReport() {
    const [maps, setMaps] = useState(null);

    const fetchMaps = async () => {
        try {
            const response = await getMaps();
            const data = response.data;
            setMaps(data);
        } catch (error) {
            console.log('Error al obtener los mapas', error);
        }
    }
    useEffect(() => {
        fetchMaps();
    }, [])

    return (
        <main className=" ">
            <Title text="Reporte de los Mapas" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-3">
                {maps && maps.length>=0 &&
                    maps.map((map, index) =>
                        <PatrullajesCard title={map.name} weather={map.weather} key={index} id={map.id} number={map.patrols.length}/>
                    )}
            </div>

        </main>
    )
}