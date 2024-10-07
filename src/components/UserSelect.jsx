'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getUsers } from "@/api/users"

export default function UserSelect({ onUserChange }) {
  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [value, setValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers()
        console.log(response.data)
        const userData = Array.isArray(response.data) ? response.data : []
        const allUsers = [{ id: 'all', name: 'Todos los usuarios' }, ...userData]
        setUsers(allUsers)
        setFilteredUsers(allUsers)
      } catch (error) {
        console.error('Error al obtener los usuarios', error)
        const fallbackUsers = [{ id: 'all', name: 'Todos los usuarios' }]
        setUsers(fallbackUsers)
        setFilteredUsers(fallbackUsers)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [searchTerm, users])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? users.find((user) => user.id.toString() === value)?.name || "Seleccionar usuario..."
            : "Seleccionar usuario..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput 
            placeholder="Buscar usuario..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
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
                      const newValue = currentValue === value ? "" : currentValue
                      setValue(newValue)
                      onUserChange(newValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}