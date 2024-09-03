import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"
export default function PatrullajesCard({ title, weather, id, number }) {
  

  return (
    <Card className=" border-slate-700">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{weather}</CardDescription>
      </CardHeader>
      <CardContent className="text-center ">
        <h4 className="font-bold text-5xl "> {number}</h4>
        <p className=" font-medium text-lg " >Patrullajes</p>

      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={"maps/" + id} className="w-full">
          <Button className="w-full">
            Detalles del Mapa
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
