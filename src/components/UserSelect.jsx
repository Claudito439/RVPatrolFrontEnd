import { useState, useEffect } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { getUsers } from "@/api/users";

export default function UserSelect({ onUserChange }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Manejo del input de búsqueda

  // Obtiene la lista de usuarios al cargar el componente
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        const userData = Array.isArray(response.data) 
          ? response.data.map(user => ({
              id: user.id, // ID del usuario
              name: user.name, // Nombre
              lastName: user.lastName, // Apellido
              fullName: `${user.name} ${user.lastName}` // Nombre completo
            }))
          : [];
          
        const allUsers = [{ id: 'all', fullName: 'Todos los usuarios' }, ...userData];
        
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (error) {
        console.error('Error al obtener los usuarios', error);
        setUsers([{ id: 'all', fullName: 'Todos los usuarios' }]);
        setFilteredUsers([{ id: 'all', fullName: 'Todos los usuarios' }]);
      }
    }
    
    fetchUsers();
  }, []);

  // Filtra los usuarios cada vez que cambia el término de búsqueda o los usuarios
  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between dark:text-white"
        >
          {value
            ? users.find((user) => user.id === value)?.fullName || "Seleccionar usuario..."
            : "Seleccionar usuario..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-50"> {/* Añadimos un z-index alto para asegurarnos que esté sobre otros elementos */}
        <Command>
          <CommandInput 
            placeholder="Buscar usuario..." 
            value={searchTerm}
            onValueChange={(value) => setSearchTerm(value)} // Actualiza el término de búsqueda
          />
          <CommandList>
            {filteredUsers.length === 0 && (
              <CommandEmpty>No se encontró usuario.</CommandEmpty>
            )}
            {filteredUsers.length > 0 && (
              <CommandGroup>
                {filteredUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id.toString()}
                    onSelect={(currentValue) => {
                      const newValue = currentValue === value ? "" : currentValue;
                      setValue(newValue); // Actualiza el valor seleccionado
                      onUserChange(newValue); // Envía el valor seleccionado al padre
                      setOpen(false); // Cierra el popover
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.fullName} 
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
