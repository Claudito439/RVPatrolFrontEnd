import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserSelectModal from "./ui/FilterUserModal"; // Asegúrate de que el path es correcto
import { exportAmbushTasksByUserPdf } from "./PDFs"; // Asegúrate de que el path es correcto

export default function BotonReporte({ title, route, modal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Este método se llama para cerrar el modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePrintClick = async () => {
    if (modal) {
      setIsModalOpen(true);
      return;
    }
  
    let url = route;
    let params = new URLSearchParams();
  
    if (title === "Reporte Global") {
      url = "https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushes";
    } else {
      const isApproved = title === "Aprobados";
      params.append("aprobacion", isApproved);
      params.append("reprobacion", !isApproved);
      url = `https://rvpatrolapibackend.onrender.com/api/v1/ambushes?${params.toString()}`;
    }
  
    try {
      const response = await fetch(url, { method: 'GET' });
  
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}: ${response.statusText}`);
      }
  
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = await response.json();
        if (title === "Aprobados" || title === "Reprobados") {
          // Utiliza el JSON de respuesta para generar el PDF
          exportAmbushTasksByUserPdf(data, `Reporte de Emboscadas - ${title}`);
        }
      } else {
        // Asumiendo que quieres mostrar o descargar directamente el PDF del servidor
        const blob = await response.blob();
        const fileUrl = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error al generar el reporte:", error);
    }
  };
  return (
    <>
      <Button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handlePrintClick}>
        {title}
      </Button>

      {/* Mostrar el modal si isModalOpen es true y el botón corresponde a uno que debe abrir el modal */}
      {modal && isModalOpen && (
        <UserSelectModal onClose={handleModalClose} />
      )}
    </>
  );
}
