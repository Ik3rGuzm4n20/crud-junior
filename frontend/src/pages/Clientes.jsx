import { useEffect } from 'react'

const Clientes = () => {
  useEffect(() => {
    document.title = 'Clientes | CRUD'
  }, [])

  return <div>Clientes</div>
}
export default Clientes