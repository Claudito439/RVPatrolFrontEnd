import { getMaps } from "@/api/maps";
import PatrullajesCard from "@/components/PratullajesCard";
import ReportsCard from "@/components/ReportsCard";
import Title from "@/components/ui/title";
import UserSelect from "@/components/UserSelect"; // Importa tu componente UserSelect
import { useState, useEffect } from "react";

// Reportes iniciales sin el filtro de usuario
const initialReports = [
    { title: "Patrullaje", description: "Reporte de patrullajes", route: "/api/v1/reports/patrols" },
    { title: "Reconocimiento", description: "Reporte de reconocimiento", route: "/api/v1/reports/recognitions" },
    { title: "Emboscadas", description: "Reporte de emboscadas", route: "/api/v1/reports/ambushes" },
    { title: "Combates", description: "Reportes de combates", route: "/api/v1/reports/combats" },
    { title: "Usuarios", description: "Reportes de usuarios registrados", route: "/api/v1/reports/users" }
];

export default function Reports() {
    const [reports, setReports] = useState(initialReports);
    const [selectedUser, setSelectedUser] = useState("all"); // Estado para el usuario seleccionado

    // Función para actualizar las rutas dinámicamente según el userId seleccionado
    const updateReportsWithUserId = (userId) => {
        const updatedReports = initialReports.map((report) => {
            // Solo modifica las rutas de emboscadas y combates para incluir el filtro de usuario
            if (report.title === "Emboscadas") {
                return { ...report, route: `/api/v1/reports/ambushu?userId=${userId}` };
            }
            if (report.title === "Combates") {
                return { ...report, route: `/api/v1/reports/combatsu?userId=${userId}` };
            }
            // Las demás rutas permanecen sin cambios
            return report;
        });
        setReports(updatedReports); // Actualiza el estado con las nuevas rutas
    };

    // Efecto para actualizar los reportes cada vez que cambie el usuario seleccionado
    useEffect(() => {
        updateReportsWithUserId(selectedUser);
    }, [selectedUser]);

    // Maneja el cambio de usuario desde el UserSelect
    const handleUserChange = (userId) => {
        setSelectedUser(userId);
    };

    return (
        <main className=" ">
            <Title text="Reportes" />
            <div className="my-4">
                <UserSelect onUserChange={handleUserChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {reports &&
                    reports.map((report, index) => (
                        <ReportsCard key={index} title={report.title} description={report.description} route={report.route} />
                    ))}
            </div>
        </main>
    );
}
