import { motion } from 'framer-motion'
import { User, Briefcase, Code, FileText, LogOut } from 'lucide-react'

export default function AdminSidebar({ activeSection, setActiveSection, onLogout }) {
  const menuItems = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r border-slate-700 bg-slate-800/50 p-6">
      <h2 className="mb-8 bg-gradient-to-r from-sky-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent">
        Admin Panel
      </h2>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveSection(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-sky-500/20 to-fuchsia-500/20 text-white'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      <motion.button
        whileHover={{ x: 4 }}
        onClick={onLogout}
        className="absolute bottom-6 flex w-[calc(100%-3rem)] items-center gap-3 rounded-lg px-4 py-3 text-left text-slate-400 transition hover:bg-slate-700/50 hover:text-white"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </motion.button>
    </div>
  )
}
