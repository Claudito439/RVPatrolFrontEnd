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
    label: "Reconocimientos",
    color: "hsl(var(--chart-1))",
  },
} 

export function RecognitionRadar({chartData}) {
  return (
    <Card >
      <CardHeader className="items-center pb-4 ">
        <CardTitle>Calificaciones de las Reconocimientos</CardTitle>
        <CardDescription>
          Promedio de las calificaciones en Reconocimientos
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-96"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="name" />
            <Radar
              dataKey="value"
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
