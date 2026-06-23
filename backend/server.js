import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './src/routes/authRoutes.js'
import productosRoutes from './src/routes/productosRoutes.js'
import clientesRoutes from './src/routes/clientesRoutes.js'
import ventasRoutes from './src/routes/ventasRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares globales
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/productos', productosRoutes)
app.use('/api/clientes', clientesRoutes)
app.use('/api/ventas', ventasRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})