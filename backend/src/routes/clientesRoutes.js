import { Router } from 'express'
import {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  searchClientes
} from '../controllers/clientesController.js'
import verifyToken from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/search', verifyToken, searchClientes)
router.get('/', verifyToken, getClientes)
router.get('/:id', verifyToken, getClienteById)
router.post('/', verifyToken, createCliente)
router.put('/:id', verifyToken, updateCliente)
router.delete('/:id', verifyToken, deleteCliente)

export default router