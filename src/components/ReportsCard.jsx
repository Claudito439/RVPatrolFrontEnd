import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export default function ReportsCard({ title, description, route }) {
  const [error, setError] = useState(null); // Estado para manejar los errores
  const navigate = useNavigate(); // Usar useNavigate para la redirección

  const handlePrintClick = async () => {
    setError(null); // Resetear el error antes de hacer la solicitud

    // Si la ruta es "/reportTarea", redirigir con navigate en lugar de hacer la solicitud
    if (route.includes("/reporteTareas")) {
      navigate(route); // Usar navigate para redirigir
      return;
    }

    // Verificar si la ruta es "/api/v1/reports/ambushtask" sin userId
    if (route.includes("/api/v1/reports/ambushtask") && !route.includes("userId")) {
      setError("Debe seleccionar un usuario para generar el reporte.");
      return; // Salir de la función sin hacer la solicitud
    }

    try {
      const response = await fetch(route, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Si todo sale bien, redirigir al PDF o manejar la respuesta
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (err) {
      setError(err.message); // Manejar el error
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

      {/* Mostrar el error en un globo de alerta */}
      {error && (
        <div className="mt-2 p-2 text-sm text-white bg-red-500 rounded-md">
          <strong>Error: </strong>{error}
        </div>
      )}
    </Card>
  );
}
