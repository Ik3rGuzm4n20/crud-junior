import { useEffect } from 'react'

const Reportes = () => {
  useEffect(() => {
    document.title = 'Reportes | CRUD'
  }, [])

  return <div>Reportes</div>
}
export default Reportes