export interface IBarChartEntry {
  className?: string
  data: { xAxis: string; yAxis: number }[]
  xLegend: string
  yLegend: string
}

export interface IBarChartData {
  xAxis: string
  yAxis: number
}
