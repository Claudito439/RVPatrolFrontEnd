import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"


function convertirSegundos(segundos) {
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  return `${horas}H ${minutos}M  ${segundosRestantes}S`;
}

export function PatrolTable({ name, patrols }) {
  return (
    <Card className=" border-slate-700">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Tabla de Patrullajes de reconocimiento</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="max-h-80 overflow-y-auto">

          <Table className="dark:bg-card rounded-lg">
            <TableCaption>Lista de Patrullajes en el mapa.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Fecha</TableHead>
                <TableHead className="text-center">Usuario</TableHead>
                <TableHead className="text-center">Mapa</TableHead>
                <TableHead className="text-right">Tiempo de Patrullaje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="dark:text-gray-200 ">
              {patrols.map((patrol, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(patrol.created).toDateString()}</TableCell>
                  <TableCell>{patrol.user.username}</TableCell>
                  <TableCell>{patrol.map.name}</TableCell>
                  <TableCell className="text-right">{convertirSegundos(patrol.totalSeconds)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="">
              <TableRow>
                <TableCell colSpan={3}>Total de patrullajes</TableCell>
                <TableCell className="text-right">{patrols.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>

  )
}