import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2, Upload, FileText, Edit } from 'lucide-react'
import CustomCursor from '../components/CustomCursor'
import AdminSidebar from './components/AdminSidebar'
import Toast from './components/Toast'
import ProjectModal from './components/ProjectModal'
import SkillModal from './components/SkillModal'

export default function AdminDashboard({ onLogout }) {
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [uploading, setUploading] = useState(false)
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('adminActiveSection') || 'basic'
  })
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingProjectIndex, setEditingProjectIndex] = useState(null)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [editingSkillIndex, setEditingSkillIndex] = useState(null)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  useEffect(() => {
    localStorage.setItem('adminActiveSection', activeSection)
  }, [activeSection])

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const isMainAdmin = localStorage.getItem('isMainAdmin')
      
      if (!token) {
        setMessageType('error')
        setMessage('No authentication token found. Please login again.')
        onLogout()
        return
      }

      let response;
      
      // Check if main admin (old system)
      if (isMainAdmin === 'true') {
        response = await fetch('http://localhost:5000/api/portfolio', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } else {
        // New multi-user system
        response = await fetch('http://localhost:5000/api/portfolio/my/portfolio', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
      
      if (response.status === 401) {
        setMessageType('error')
        setMessage('Session expired. Please login again.')
        localStorage.removeItem('adminToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('isMainAdmin')
        onLogout()
        return
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio')
      }
      
      const result = await response.json()
      
      // Handle both old and new data structures
      if (isMainAdmin === 'true') {
        // New structure from API
        if (result.success) {
          setPortfolio(result.data)
        }
      } else {
        // New structure
        if (result.success) {
          setPortfolio(result.data)
        }
      }
    } catch (err) {
      setMessageType('error')
      setMessage('Error loading portfolio data')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const token = localStorage.getItem('adminToken')
      const isMainAdmin = localStorage.getItem('isMainAdmin')
      
      let response;
      let saveData;

      if (isMainAdmin === 'true') {
        // Old system - convert back to old structure
        saveData = {
          name: portfolio.personalInfo?.fullName || '',
          role: portfolio.personalInfo?.title || '',
          tagline: portfolio.personalInfo?.tagline || '',
          about: portfolio.personalInfo?.bio || '',
          email: portfolio.personalInfo?.email || '',
          location: portfolio.personalInfo?.location || '',
          resume: portfolio.personalInfo?.resume?.url || '',
          skills: portfolio.skills || [],
          projects: portfolio.projects || []
        }
        
        response = await fetch('http://localhost:5000/api/portfolio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(saveData),
        })
      } else {
        // New system - use as is
        response = await fetch('http://localhost:5000/api/portfolio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(portfolio),
        })
      }

      if (response.ok) {
        setMessageType('success')
        setMessage('Changes saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessageType('error')
        setMessage('Save failed')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) {
      setMessageType('error')
      setMessage('Server error')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  const addSkillCategory = () => {
    setEditingSkill(null)
    setEditingSkillIndex(null)
    setIsSkillModalOpen(true)
  }

  const editSkillCategory = (index) => {
    setEditingSkill(portfolio.skills[index])
    setEditingSkillIndex(index)
    setIsSkillModalOpen(true)
  }

  const handleSaveSkill = (skillData, index) => {
    if (index !== null) {
      // Edit existing skill
      const updated = [...portfolio.skills]
      updated[index] = skillData
      setPortfolio({ ...portfolio, skills: updated })
    } else {
      // Add new skill
      setPortfolio({
        ...portfolio,
        skills: [...portfolio.skills, skillData]
      })
    }
    setIsSkillModalOpen(false)
    setEditingSkill(null)
    setEditingSkillIndex(null)
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
    setEditingProject(null)
    setEditingProjectIndex(null)
    setIsProjectModalOpen(true)
  }

  const editProject = (index) => {
    setEditingProject(portfolio.projects[index])
    setEditingProjectIndex(index)
    setIsProjectModalOpen(true)
  }

  const handleSaveProject = (projectData, index) => {
    if (index !== null) {
      // Edit existing project
      const updated = [...portfolio.projects]
      updated[index] = projectData
      setPortfolio({ ...portfolio, projects: updated })
    } else {
      // Add new project
      setPortfolio({
        ...portfolio,
        projects: [...portfolio.projects, projectData]
      })
    }
    setIsProjectModalOpen(false)
    setEditingProject(null)
    setEditingProjectIndex(null)
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
      setMessageType('error')
      setMessage('Only PDF files are allowed')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const token = localStorage.getItem('adminToken')
      const response = await fetch('http://localhost:5000/api/upload/resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setPortfolio({ ...portfolio, resume: data.resumePath })
        setMessageType('success')
        setMessage('Resume uploaded successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessageType('error')
        setMessage('Upload failed: ' + data.error)
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) {
      setMessageType('error')
      setMessage('Upload error')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">Loading...</div>

  if (!portfolio) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Failed to load portfolio</p>
          <button 
            onClick={fetchPortfolio}
            className="px-4 py-2 bg-sky-500 rounded-lg hover:bg-sky-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900" style={{ cursor: 'none' }}>
      <CustomCursor dark={true} />
      <Toast message={message} type={messageType} onClose={() => setMessage('')} />
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)}
        project={editingProject}
        index={editingProjectIndex}
        onSave={handleSaveProject}
      />
      <SkillModal 
        isOpen={isSkillModalOpen} 
        onClose={() => setIsSkillModalOpen(false)}
        skill={editingSkill}
        index={editingSkillIndex}
        onSave={handleSaveSkill}
      />
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={onLogout} />
      
      <div className="ml-64 p-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              {activeSection === 'basic' && 'Basic Information'}
              {activeSection === 'resume' && 'Resume'}
              {activeSection === 'skills' && 'Skills'}
              {activeSection === 'projects' && 'Projects'}
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 font-semibold text-white shadow-lg disabled:opacity-50"
            >
              <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </div>

          {/* Basic Info */}
          {activeSection === 'basic' && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Basic Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Name</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo?.fullName || ''}
                    onChange={(e) => setPortfolio({ 
                      ...portfolio, 
                      personalInfo: { ...portfolio.personalInfo, fullName: e.target.value }
                    })}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Role</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo?.title || ''}
                    onChange={(e) => setPortfolio({ 
                      ...portfolio, 
                      personalInfo: { ...portfolio.personalInfo, title: e.target.value }
                    })}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Email</label>
                  <input
                    type="email"
                    value={portfolio.personalInfo?.email || ''}
                    onChange={(e) => setPortfolio({ 
                      ...portfolio, 
                      personalInfo: { ...portfolio.personalInfo, email: e.target.value }
                    })}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Location</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo?.location || ''}
                    onChange={(e) => setPortfolio({ 
                      ...portfolio, 
                      personalInfo: { ...portfolio.personalInfo, location: e.target.value }
                    })}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm text-slate-300">Tagline</label>
                  <input
                    type="text"
                    value={portfolio.personalInfo?.tagline || ''}
                    onChange={(e) => setPortfolio({ 
                      ...portfolio, 
                      personalInfo: { ...portfolio.personalInfo, tagline: e.target.value }
                    })}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm text-slate-300">About</label>
                  <textarea
                    value={portfolio.personalInfo?.bio || ''}
                    onChange={(e) => setPortfolio({ 
                      ...portfolio, 
                      personalInfo: { ...portfolio.personalInfo, bio: e.target.value }
                    })}
                    rows={3}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Resume Upload */}
          {activeSection === 'resume' && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Resume</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="mb-2 block text-sm text-slate-300">
                    Current Resume: {portfolio.personalInfo?.resume?.url ? (
                      <a href={portfolio.personalInfo.resume.url} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
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
                    {portfolio.personalInfo?.resume?.url && (
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
          )}

          {/* Skills */}
          {activeSection === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Skills</h2>
                  <p className="text-sm text-slate-400">Manage your skill categories</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addSkillCategory}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                >
                  <Plus size={16} /> Add Category
                </motion.button>
              </div>

              {(portfolio.skills || []).map((skill, index) => (
                <motion.div
                  key={`skill-${index}-${skill.category}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10"
                >
                  {/* Icon badge */}
                  <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500 text-2xl shadow-lg">
                    {skill.icon || '💻'}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute right-4 top-20 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => editSkillCategory(index)}
                      className="rounded-lg bg-sky-500/20 p-2 text-sky-400 transition hover:bg-sky-500/30"
                      title="Edit category"
                    >
                      <Edit size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeSkillCategory(index)}
                      className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500/30"
                      title="Delete category"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>

                  <div className="space-y-3 pr-20">
                    {/* Category Name */}
                    <div>
                      <h3 className="text-lg font-bold text-white">{skill.category}</h3>
                    </div>

                    {/* Skills */}
                    {skill.items.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, itemIndex) => (
                          item && (
                            <span
                              key={itemIndex}
                              className="rounded-lg bg-gradient-to-r from-sky-500/20 to-fuchsia-500/20 border border-sky-500/30 px-3 py-1.5 text-sm font-semibold text-sky-400"
                            >
                              {item}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {(portfolio.skills || []).length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-700/50">
                    <Plus size={32} className="text-slate-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">No skill categories yet</h3>
                  <p className="mb-4 text-sm text-slate-400">Start by adding your first skill category</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addSkillCategory}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                  >
                    <Plus size={16} /> Add Your First Category
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {/* Projects */}
          {activeSection === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Projects</h2>
                  <p className="text-sm text-slate-400">Manage your portfolio projects</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addProject}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                >
                  <Plus size={16} /> Add Project
                </motion.button>
              </div>

              {(portfolio.projects || []).map((project, index) => (
                <motion.div
                  key={`project-${index}-${project.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-6 transition-all hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10"
                >
                  {/* Project number badge */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute right-4 top-16 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => editProject(index)}
                      className="rounded-lg bg-sky-500/20 p-2 text-sky-400 transition hover:bg-sky-500/30"
                      title="Edit project"
                    >
                      <Edit size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeProject(index)}
                      className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500/30"
                      title="Delete project"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>

                  <div className="space-y-3 pr-16">
                    {/* Title */}
                    <div>
                      <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-sm text-slate-400 line-clamp-3">{project.description}</p>
                    </div>

                    {/* Tech Stack */}
                    {project.stack?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, techIndex) => (
                          tech && (
                            <span
                              key={techIndex}
                              className="rounded-lg bg-gradient-to-r from-sky-500/20 to-fuchsia-500/20 border border-sky-500/30 px-3 py-1 text-xs font-semibold text-sky-400"
                            >
                              {tech}
                            </span>
                          )
                        ))}
                      </div>
                    )}

                    {/* Project Link */}
                    {project.link && (
                      <div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300 transition"
                        >
                          {project.link}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {(portfolio.projects || []).length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-700/50">
                    <Plus size={32} className="text-slate-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">No projects yet</h3>
                  <p className="mb-4 text-sm text-slate-400">Start by adding your first project</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addProject}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
                  >
                    <Plus size={16} /> Add Your First Project
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
