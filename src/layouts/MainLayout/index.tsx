import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <main className="p-4">
      <Outlet />
    </main>
  )
}
