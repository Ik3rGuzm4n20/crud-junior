import { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard | CRUD'
  }, [])

  return <div>Dashboard</div>
}
export default Dashboard