import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ApprovalSelect({ onChange }) {
  return (
    <Select onValueChange={(value) => {
      let aprobacion, reprobacion;
      switch (value) {
        case 'approved':
          aprobacion = true;
          reprobacion = false;
          break;
        case 'disapproved':
          aprobacion = false;
          reprobacion = true;
          break;
        default:
          aprobacion = undefined;
          reprobacion = undefined;
      }
      onChange(aprobacion, reprobacion);
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seleccionar estado" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Estado de aprobación</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="approved">Aprobados</SelectItem>
          <SelectItem value="disapproved">Reprobados</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}