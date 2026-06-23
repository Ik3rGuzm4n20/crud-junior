import { Router } from 'express'
import {
  getVentas,
  getVentaById,
  createVenta,
  deleteVenta,
  getReporte
} from '../controllers/ventasController.js'
import verifyToken from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/reporte', verifyToken, getReporte)
router.get('/', verifyToken, getVentas)
router.get('/:id', verifyToken, getVentaById)
router.post('/', verifyToken, createVenta)
router.delete('/:id', verifyToken, deleteVenta)

export default router