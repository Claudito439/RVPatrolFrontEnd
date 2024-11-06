import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {exportPatrolsPdf, exportCombatsPdf, exportRecognitionsPdf } from "@/components/PDFs";

export default function ReportsCard({ title, description, route,usuario }) {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    let titulo=""
    const handlePrintClick = async () => {
        setError(null);

        // Navegar directamente para Emboscadas
        if (title === "Emboscadas") {
            navigate("/reporteTareas");
            return;
        }

        // Para Patrullaje, Reconocimiento y Combates: Descargar o exportar PDF
        if (title === "Patrullaje" || title === "Reconocimiento" || title === "Combates") {
            try {
                const response = await fetch(route, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                // Para patrullajes, reconocimientos y combates se utiliza jsPDF para generar un PDF
                const data = await response.json(); // Suponemos que la respuesta es un JSON para estos casos
                console.log(usuario);
                if(usuario)
                {
                  if(title!="Patrullaje")
                  {
                    titulo=`Reporte de ${title} de ${data[0].patrol.user.name} ${data[0].patrol.user.lastName}`
                  }
                  else{
                    titulo=`Reporte de ${title} de ${data[0].user.name} ${data[0].user.lastName}`
                  }
                }
                else
                {
                   titulo=`Reporte Global de ${title}`
                }
                switch (title) {
                    case "Patrullaje":
                        exportPatrolsPdf(data,titulo);
                        break;
                    case "Reconocimiento":
                        exportRecognitionsPdf(data,titulo);
                        break;
                    case "Combates":
                        exportCombatsPdf(data,titulo);
                        break;
                    default:
                        break;
                }
            } catch (err) {
                setError(err.message);
            }
        } else {
            // Para Usuarios: Descargar un PDF generado por el servidor
            try {
                const response = await fetch(route, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'reporte.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <Card className="border-slate-700">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button className="w-full" onClick={handlePrintClick}>
                    Imprimir
                </Button>
            </CardFooter>
            {error && (
                <div className="mt-2 p-2 text-sm text-white bg-red-500 rounded-md">
                    <strong>Error: </strong>{error}
                </div>
            )}
        </Card>
    );
}