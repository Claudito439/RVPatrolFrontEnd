import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function ReportsCard({ title, description, route }) {
  

  return (
    <Card className=" border-slate-700">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <a href={route} className="w-full">
          <Button className="w-full">
            Imprimir
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
