
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
    registros: {
        label: "Registros",
    },
    fuerza_aerea: {
        label: "Fuerza Aerea",
        color: "hsl(var(--chart-1))",
    },
    ejercito: {
        label: "Ejercito",
        color: "hsl(var(--chart-2))",
    },
    armada: {
        label: "Armada",
        color: "hsl(var(--chart-3))",
    },
    other: {
        label: "Otro",
        color: "hsl(var(--chart-4))",
    },
}

export function PatrolPie({ users }) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Registros de las FFAA</CardTitle>
                <CardDescription>Muestra de uso por fuerzas</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />

                        <Pie data={users} dataKey="registros" label nameKey="ffaa" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
