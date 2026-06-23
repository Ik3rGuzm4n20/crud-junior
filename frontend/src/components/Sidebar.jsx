import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/productos', label: 'Productos', icon: '📦' },
  { to: '/clientes', label: 'Clientes', icon: '👥' },
  { to: '/ventas', label: 'Ventas', icon: '🛒' },
  { to: '/reportes', label: 'Reportes', icon: '📈' },
]

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">CRUD Junior</h1>
        <p className="text-gray-400 text-sm mt-1">Panel de administración</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar