import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getUsers } from "@/api/users";
import axios from "../../api/axios";


export default function UserSelectModal({ onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(true); // Controla si el modal está abierto
  const [users, setUsers] = useState([]); // Estado para almacenar usuarios
  const [selectedUser, setSelectedUser] = useState(null); // Estado para manejar el usuario seleccionado

  // Obtiene la lista de usuarios al cargar el componente
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        const userData = Array.isArray(response.data)
          ? response.data.map(user => ({
              id: user.id.toString(), // Convertir a string para comparación consistente
              name: user.name, // Nombre
              lastName: user.lastName, // Apellido
              fullName: `${user.name} ${user.lastName}` // Nombre completo
            }))
          : [];
        const allUsers = [{ id: 'all', fullName: 'Todos los usuarios' }, ...userData];
        setUsers(allUsers);
      } catch (error) {
        const fallbackUsers = [{ id: 'all', fullName: 'Todos los usuarios' }];
        setUsers(fallbackUsers);
      }
    }
    fetchUsers();
  }, []);

  // Manejar la selección de usuario
  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value === "all" ? null : event.target.value);
  };

  // Manejo de la descarga
  const handleDownload = async (type) => {
    if (!selectedUser) {
      console.log("No se puede generar el reporte sin seleccionar un usuario.");
      return;
    }
  
    try {
      // Construir la URL con los parámetros necesarios
      const route = `https://rvpatrolapibackend.onrender.com/api/v1/reports/ambushtask?userId=${selectedUser}&aprobado=${type === "approved"}&reprobado=${type === "rejected"}`;
  
      // Realizar la solicitud para obtener el archivo PDF
      const response = await fetch(route, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      // Si todo sale bien, manejar la respuesta como un blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      
      // Crear un enlace temporal para la descarga del archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte-${type}.pdf`); // Nombre del archivo que se descargará
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Eliminar el enlace después de la descarga
  
      console.log("Reporte generado y descargado con éxito.");
    } catch (error) {
      console.error("Error generando el reporte:", error);
    }
  };

  // Maneja el cierre del modal
  const handleModalClose = (open) => {
    setIsModalOpen(open); // Cambia el estado según el valor recibido.
  };
  
  const handleModalChange = (isOpen) => {
    if (!isOpen) {
      onClose(); // Llama a la función onClose cuando el modal se cierra
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
      <DialogContent className="sm:max-w-[425px] dark:text-white bg-card">
        <DialogHeader>
          <DialogTitle>Seleccionar Usuario</DialogTitle>
        </DialogHeader>

        {/* Selector de usuario */}
        <select 
          className="w-full p-2 border rounded-md" 
          value={selectedUser || "all"} 
          onChange={handleUserSelect}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>

        {/* Mostrar botones solo si se selecciona un usuario específico */}
        {selectedUser && (
          <div className="grid gap-4 mt-4">
            {/* Botón de Todas las notas */}
            <Button className="w-full" onClick={() => handleDownload("all")}>
              Todas las notas
            </Button>

            {/* Botón de Notas de aprobación */}
            <Button className="w-full" onClick={() => handleDownload("approved")}>
              Notas de aprobación
            </Button>

            {/* Botón de Notas de reprobación */}
            <Button className="w-full" onClick={() => handleDownload("rejected")}>
              Notas de reprobación
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
