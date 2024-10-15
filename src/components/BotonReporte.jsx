import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserSelectModal from "./ui/FilterUserModal";

export default function BotonReporte({ title, route, modal }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si el modal está abierto


  const handlePrintClick = async () => {
    if (modal) {
      setIsModalOpen(true); // Abrir el modal si es necesario
    } else {
      let url = "";
      let params = {};
  
      // Verificar qué botón fue presionado y establecer el URL correspondiente
      if (title === "Reporte Global") {
        url = "https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushes";
      }
  
      if (title === "Aprobados") {
        url = "https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushtask";
        params = {
          userId: "all",    // Si deseas que sea para todos los usuarios
          aprobado: true,   // Parámetro aprobado en true
          reprobado: false, // Parámetro reprobado en false
        };
      }
  
      if (title === "Reprobados") {
        url = "https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushtask";
        params = {
          userId: "all",    // Si deseas que sea para todos los usuarios
          aprobado: false,  // Parámetro aprobado en false
          reprobado: true,  // Parámetro reprobado en true
        };
      }
  
      try {
        // Realizar la solicitud fetch para descargar el PDF
        const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        // Si todo sale bien, manejar la respuesta como un blob
        const blob = await response.blob();
        const fileUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
  
        // Crear un enlace temporal para la descarga del archivo
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', `${title}-reporte.pdf`); // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Eliminar el enlace después de la descarga
      } catch (error) {
        console.error("Error al generar el reporte:", error);
      }
    }
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <>
      <Button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handlePrintClick}>
        {title}
      </Button>

      {/* Mostrar el modal si isModalOpen es true */}
      {isModalOpen && (
        <UserSelectModal onClose={handleModalClose} />
      )}
    </>
  );
}
