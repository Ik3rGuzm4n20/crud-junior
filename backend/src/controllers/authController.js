import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import supabase from '../database/supabase.js'
import dotenv from 'dotenv'

dotenv.config()

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const passwordValido = await bcrypt.compare(password, usuario.password)

    if (!passwordValido) {
      return res.status(401).json({ message: 'Credenciales incorrectas' })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    })

  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' })
  }
}