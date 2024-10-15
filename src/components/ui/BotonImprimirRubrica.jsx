import { Printer } from "lucide-react"; // Importa el ícono de lucide-react
import axios from "../../api/axios"; // Importa Axios para hacer solicitudes HTTP

export const PrintButtonL = ({ id }) => {
  const handlePrint = async () => {
    console.log(id)
    try {

        const url = "https://rvpatrolapibackend.onrender.com/api/v1/rubrica";

        const response = await fetch(`${url}?id=${id}`, {
            method: 'GET',
        });
        const blob = await response.blob();
        const fileUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
  
        // Crear un enlace temporal para la descarga del archivo
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', `CalificacionPersonal-reporte.pdf`); // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Eliminar el enlace después de la descarga

      
    } catch (error) {
      console.error("Error al generar el reporte:", error);
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      <Printer className="mr-2" />
      Rubrica Evaluacion
    </button>
  );
};
