import { Bar, BarChart, CartesianGrid, Label, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Releases } from '@/types/release';

export function TotalDownloads({ releases }: { releases: Releases }) {
  const chartData = useMemo(() => {
    return releases
      .filter((release) => !release.prerelease)
      .map((release) => ({
        tag: release.tag_name,
        downloads: release.assets.reduce((acc, asset) => acc + asset.download_count, 0),
      }))
      .slice(0, 6)
  }, [releases])

  const chartConfig = useMemo(() => ({
    downloads: {
      label: 'Downloads',
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig), [])

  const totalDownloads = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.downloads, 0)
  }, [chartData])

  return (
    <Card className='w-1/3'>
      <CardHeader>
        <CardTitle>Downloads</CardTitle>
        <CardDescription>Total downloads for last 6 releases</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="tag"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="downloads" fill="var(--color-downloads)" radius={8} />
            <Label>Total Downloads: {totalDownloads}</Label>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}