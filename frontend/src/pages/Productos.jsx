import { useEffect } from 'react'

const Productos = () => {
  useEffect(() => {
    document.title = 'Productos | CRUD'
  }, [])

  return <div>Productos</div>
}
export default Productos