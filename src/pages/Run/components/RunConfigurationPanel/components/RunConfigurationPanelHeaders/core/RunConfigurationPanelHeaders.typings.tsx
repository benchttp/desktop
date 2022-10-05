export interface IProps {
  headers: { key: string; values: string[] }[]
  setHeaders: (headers: { key: string; values: string[] }[]) => void
}
