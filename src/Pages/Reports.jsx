import { getMaps } from "@/api/maps";
import PatrullajesCard from "@/components/PratullajesCard";
import ReportsCard from "@/components/ReportsCard";
import Title from "@/components/ui/title";
import UserSelect from "@/components/UserSelect"; // Importa tu componente UserSelect
import { useState, useEffect } from "react";

const API_BASE_URL = "https://rvpatrolapibackend.onrender.com/api/v1";
let usuario=false;
const initialReports = [
    { title: "Patrullaje", description: "Reporte de patrullajes", route: `${API_BASE_URL}/patrols` },
    { title: "Reconocimiento", description: "Reporte de reconocimiento", route: `${API_BASE_URL}/recognition-results` },
    { title: "Emboscadas", description: "Reporte de emboscadas", route: `/reporteTareas` },
    { title: "Combates", description: "Reportes de combates", route: `${API_BASE_URL}/combats` },
    { title: "Usuarios", description: "Reportes de usuarios registrados", route: `${API_BASE_URL}/reports/users` }
];

export default function Reports() {
    const [reports, setReports] = useState(initialReports);
    const [selectedUser, setSelectedUser] = useState("all"); // Estado para el usuario seleccionado

    // Función para actualizar las rutas dinámicamente según el userId seleccionado
    const updateReportsWithUserId = (userId) => {
        const updatedReports = initialReports.map(report => {
            const isAllUsers = userId === "all";
            usuario=true
            if(userId=="all")
            {
                usuario=false;
            }
            else
            {
                usuario=true;
            }
            if (report.title === "Emboscadas" || report.title === "Usuarios") {
                // No cambiar la ruta para Emboscadas ni Usuarios
                return report;
            } else {
                // Actualiza la ruta para Patrullajes, Reconocimientos, y Combates
                const newRoute = isAllUsers ? report.route : `${report.route}/user/${userId}`;
                return { ...report, route: newRoute };
            }
        });
        setReports(updatedReports);
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
        <main>
            <Title text="Reportes" />
            <div className="my-4 flex items-center">
                <UserSelect onUserChange={handleUserChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {reports.map((report, index) => (
                    <ReportsCard key={index} title={report.title} description={report.description} route={report.route} usuario={usuario} />
                ))}
            </div>
        </main>
    );
}