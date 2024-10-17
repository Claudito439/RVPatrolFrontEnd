import { getMaps } from "@/api/maps";
import PatrullajesCard from "@/components/PratullajesCard";
import ReportsCard from "@/components/ReportsCard";
import Title from "@/components/ui/title";
import UserSelect from "@/components/UserSelect"; // Importa tu componente UserSelect
import { useState, useEffect } from "react";

// Reportes iniciales sin el filtro de usuario
const initialReports = [
    { title: "Patrullaje", description: "Reporte de patrullajes", route: "https://rvpatrolapibackend.onrender.com/api/v1/reports/patrols" },
    { title: "Reconocimiento", description: "Reporte de reconocimiento", route: "https://rvpatrolapibackend.onrender.com/api/v1/reports/recognitions" },
    { title: "Emboscadas", description: "Reporte de emboscadas", route: "/reporteTareas" },
    { title: "Combates", description: "Reportes de combates", route: "https://rvpatrolapibackend.onrender.com/api/v1/reports/combats" },
    { title: "Usuarios", description: "Reportes de usuarios registrados", route: "https://rvpatrolapibackend.onrender.com/api/v1/reports/users" }
];

export default function Reports() {
    const [reports, setReports] = useState(initialReports);
    const [selectedUser, setSelectedUser] = useState("all"); // Estado para el usuario seleccionado
    const [tasksEnabled, setTasksEnabled] = useState(false); // Estado para el checkbox de tareas

    // Función para actualizar las rutas dinámicamente según el userId seleccionado y el estado del checkbox
    const updateReportsWithUserId = (userId) => {
        const updatedReports = initialReports.map((report) => {
            // Solo modifica las rutas de emboscadas y combates para incluir el filtro de usuario 
            if (report.title === "Emboscadas") {
                if (tasksEnabled) {
                    return userId === "all" 
                        ? { ...report, route: `/reporteTareas` }
                        : { ...report, route: `/reporteTareas` };
                } else {
                    return userId === "all" 
                        ? { ...report, route: `/reporteTareas` }
                        : { ...report, route: `/reporteTareas` }
                        //: { ...report, route: `https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushesu?userId=${userId}` };
                }
            }
            if (report.title === "Combates") {
                return userId === "all" 
                    ? { ...report, route: `https://rvpatrolapibackend.onrender.com/api/v1/reports/combats` }
                    : { ...report, route: `https://rvpatrolapibackend.onrender.com/api/v1/reports/combatsu?userId=${userId}` };
            }
            if(report.title == "Patrullaje")
            {
                return userId === "all" 
                    ? { ...report, route: `https://rvpatrolapibackend.onrender.com/api/v1/reports/patrols` }
                    : { ...report, route: `https://rvpatrolapibackend.onrender.com/api/v1/reports/patrolsu?userId=${userId}` }
            }
            if(report.title=="Reconocimiento")
            {
                return userId === "all" 
                    ? { ...report, route: `https://rvpatrolapibackend.onrender.com/api/v1/reports/recognitions` }
                    : { ...report, route: `https://rvpatrolapibackend.onrender.com/api/v1/reports/recognitionu?userId=${userId}` }
            }
            // Las demás rutas permanecen sin cambios
            return report;
        });
        setReports(updatedReports); // Actualiza el estado con las nuevas rutas
    };

    // Efecto para actualizar los reportes cada vez que cambie el usuario seleccionado o el estado del checkbox
    useEffect(() => {
        updateReportsWithUserId(selectedUser);
    }, [selectedUser, tasksEnabled]);

    // Maneja el cambio de usuario desde el UserSelect
    const handleUserChange = (userId) => {
        setSelectedUser(userId);
    };

    // Maneja el cambio del checkbox de tareas
    const handleTaskCheckboxChange = (event) => {
        setTasksEnabled(event.target.checked);
    };

    /*return (
        <main className=" ">
            <Title text="Reportes" />
            <div className="my-4 flex items-center">
                <UserSelect onUserChange={handleUserChange} />
                <div className="ml-4 bg-blue-500 text-white px-4 py-2 rounded">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={tasksEnabled} 
                            onChange={handleTaskCheckboxChange} 
                        />
                        <span className="ml-2 ">Tareas en Emboscada</span>
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {reports &&
                    reports.map((report, index) => (
                        <ReportsCard key={index} title={report.title} description={report.description} route={report.route} />
                    ))}
            </div>
        </main>
    );
    */
    return (
        <main className=" ">
            <Title text="Reportes" />
            <div className="my-4 flex items-center">
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
