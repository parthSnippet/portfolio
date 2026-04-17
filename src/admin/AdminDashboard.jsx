import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Save, Plus, Trash2, Upload, FileText } from 'lucide-react'
import CustomCursor from '../components/CustomCursor'

export default function AdminDashboard({ onLogout }) {
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolio')
      const data = await response.json()
      setPortfolio(data)
    } catch (err) {
      setMessage('Error loading portfolio')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(portfolio),
      })

      if (response.ok) {
        setMessage('✅ Saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ Save failed')
      }
    } catch (err) {
      setMessage('❌ Server error')
    } finally {
      setSaving(false)
    }
  }

  const addSkillCategory = () => {
    setPortfolio({
      ...portfolio,
      skills: [
        ...portfolio.skills,
        { category: '', icon: '💻', color: 'from-sky-500 to-cyan-500', bg: 'bg-sky-500/10', text: 'text-sky-400', items: [] }
      ]
    })
  }

  const removeSkillCategory = (index) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter((_, i) => i !== index)
    })
  }

  const updateSkillCategory = (index, field, value) => {
    const updated = [...portfolio.skills]
    updated[index][field] = value
    setPortfolio({ ...portfolio, skills: updated })
  }

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        { title: '', description: '', stack: [], link: '' }
      ]
    })
  }

  const removeProject = (index) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== index)
    })
  }

  const updateProject = (index, field, value) => {
    const updated = [...portfolio.projects]
    updated[index][field] = value
    setPortfolio({ ...portfolio, projects: updated })
  }

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setMessage('❌ Only PDF files are allowed')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/upload-resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setPortfolio({ ...portfolio, resume: data.resumePath })
        setMessage('✅ Resume uploaded successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('❌ Upload failed: ' + data.error)
      }
    } catch (err) {
      setMessage('❌ Upload error')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-slate-900 p-6" style={{ cursor: 'none' }}>
      <CustomCursor dark={true} />
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-sky-400 to-fuchsia-400 bg-clip-text text-3xl font-bold text-transparent">
            Portfolio Admin
          </h1>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 font-semibold text-white shadow-lg disabled:opacity-50"
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 font-semibold text-white"
            >
              <LogOut size={18} /> Logout
            </motion.button>
          </div>
        </div>

        {message && (
          <div className="mb-4 rounded-lg bg-slate-800 border border-slate-700 p-3 text-center text-sm text-white">
            {message}
          </div>
        )}

        {/* Basic Info */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Basic Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Name</label>
              <input
                type="text"
                value={portfolio.name}
                onChange={(e) => setPortfolio({ ...portfolio, name: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Role</label>
              <input
                type="text"
                value={portfolio.role}
                onChange={(e) => setPortfolio({ ...portfolio, role: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                value={portfolio.email}
                onChange={(e) => setPortfolio({ ...portfolio, email: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Location</label>
              <input
                type="text"
                value={portfolio.location}
                onChange={(e) => setPortfolio({ ...portfolio, location: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-slate-300">Tagline</label>
              <input
                type="text"
                value={portfolio.tagline}
                onChange={(e) => setPortfolio({ ...portfolio, tagline: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-slate-300">About</label>
              <textarea
                value={portfolio.about}
                onChange={(e) => setPortfolio({ ...portfolio, about: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">Resume</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="mb-2 block text-sm text-slate-300">
                Current Resume: {portfolio.resume ? (
                  <a href={portfolio.resume} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                    View Current Resume
                  </a>
                ) : (
                  <span className="text-slate-500">No resume uploaded</span>
                )}
              </label>
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg disabled:opacity-50">
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : 'Upload New Resume'}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {portfolio.resume && (
                  <a
                    href={portfolio.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
                  >
                    <FileText size={16} /> Preview
                  </a>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-400">Only PDF files, max 5MB</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Skills</h2>
            <button
              onClick={addSkillCategory}
              className="flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white"
            >
              <Plus size={16} /> Add Category
            </button>
          </div>
          {portfolio.skills.map((skill, index) => (
            <div key={index} className="mb-4 rounded-lg border border-slate-600 bg-slate-700/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Category name"
                  value={skill.category}
                  onChange={(e) => updateSkillCategory(index, 'category', e.target.value)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                />
                <button
                  onClick={() => removeSkillCategory(index)}
                  className="ml-2 rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <textarea
                placeholder="Skills (comma separated)"
                value={skill.items.join(', ')}
                onChange={(e) => updateSkillCategory(index, 'items', e.target.value.split(',').map(s => s.trim()))}
                rows={2}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
              />
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Projects</h2>
            <button
              onClick={addProject}
              className="flex items-center gap-2 rounded-lg bg-sky-500 px-3 py-1.5 text-sm font-semibold text-white"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
          {portfolio.projects.map((project, index) => (
            <div key={index} className="mb-4 rounded-lg border border-slate-600 bg-slate-700/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Project title"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                />
                <button
                  onClick={() => removeProject(index)}
                  className="ml-2 rounded-lg bg-red-500/20 p-2 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <textarea
                placeholder="Description"
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
              />
              <input
                type="text"
                placeholder="Tech stack (comma separated)"
                value={project.stack.join(', ')}
                onChange={(e) => updateProject(index, 'stack', e.target.value.split(',').map(s => s.trim()))}
                className="mb-3 w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
              />
              <input
                type="text"
                placeholder="Project link"
                value={project.link}
                onChange={(e) => updateProject(index, 'link', e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
