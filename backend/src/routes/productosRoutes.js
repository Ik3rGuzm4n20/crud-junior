import { Router } from 'express'
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  searchProductos
} from '../controllers/productosController.js'
import verifyToken from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/search', verifyToken, searchProductos)
router.get('/', verifyToken, getProductos)
router.get('/:id', verifyToken, getProductoById)
router.post('/', verifyToken, createProducto)
router.put('/:id', verifyToken, updateProducto)
router.delete('/:id', verifyToken, deleteProducto)

export default router