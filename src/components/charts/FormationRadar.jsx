import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Formaciones",
    color: "hsl(var(--chart-1))",
  },
} 

export function FormationRadar({chartData}) {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Calificaciones de las Formaciones</CardTitle>
        <CardDescription>
          Promedio de las calificaciones en formaciones de emboscada
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="formation" />
            <Radar
              dataKey="averageQualification"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 6,
                fillOpacity: 1,
              }}
              name="Puntos"
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
