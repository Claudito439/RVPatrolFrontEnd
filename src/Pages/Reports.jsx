import { getMaps } from "@/api/maps";
import PatrullajesCard from "@/components/PratullajesCard";
import ReportsCard from "@/components/ReportsCard";
import Title from "@/components/ui/title";
import {  useState } from "react";

const reports_ = [
    {title:"Patrullaje", description: "Reporte de patrullajes realizado Patrullaje", route:"https://rvpatrolapibackend.onrender.com/api/v1/reports/patrols"},
    {title:"Reconocimiento", description: "Reporte de reconocimiento", route:"https://rvpatrolapibackend.onrender.com/api/v1/reports/recognitions"},
    {title:"Emboscadas", description: "Reporte de Emboscadas realizado", route:"https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushes"},
    {title:"Combates", description: "Reportes de Combate realizado", route:"https://rvpatrolapibackend.onrender.com/api/v1/reports/combats"},
    {title:"Usuarios", description: "Reportes de Usuarios Registrados", route:"https://rvpatrolapibackend.onrender.com/api/v1/reports/users"},

]

export default function Reports() {
    const [reports, setReports] = useState(reports_);


    return (
        <main className=" ">
            <Title text="Reportes" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-3">
                {reports &&
                    reports.map((report, index) =>
                        <ReportsCard key={index} title={report.title} description={report.description} route={report.route}></ReportsCard>
                    )}
            </div>

        </main>
    )
}