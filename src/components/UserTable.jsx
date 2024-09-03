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
  CardHeader,
  CardTitle,
} from "./ui/card"


export function UserTable({ users, descripcion = 'Tabla de Usuarios registrados en el Mapa', caption = 'Lista de Usuarios en el mapa.' }) {
  return (
    <Card className=" border-slate-700">
      <CardHeader>
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>{descripcion}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="max-h-80 overflow-y-auto">
          <Table className="dark:bg-card rounded-lg  ">
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Username</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Apellido</TableHead>
                <TableHead className="text-center">FFAA</TableHead>
                <TableHead className="text-center">Rango</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody className="dark:text-gray-200">
              {users.length && users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.lastName}</TableCell>

                  <TableCell>{user.ffaa}</TableCell>
                  <TableCell>{user.rank}</TableCell>

                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="">
              <TableRow>
                <TableCell className="text-center" colSpan={4}>Total de usarios</TableCell>
                <TableCell className="text-center">{users.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>

  )
}