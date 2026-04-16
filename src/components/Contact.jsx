import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const infoCards = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: portfolioData.email,
    href: `mailto:${portfolioData.email}`,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: portfolioData.location,
    href: null,
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
  },
  {
    icon: <FaGithub size={20} />,
    label: 'GitHub',
    value: '@parthSnippet',
    href: portfolioData.social.github,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: <FaLinkedin size={20} />,
    label: 'LinkedIn',
    value: 'Parth Rohit',
    href: portfolioData.social.linkedin,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
]

export default function Contact() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mb-8 rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-xl shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 md:p-10"
    >
      {/* Heading */}
      <motion.div variants={item} className="mb-8 text-center">
        <h2 className="mb-2 bg-gradient-to-r from-sky-400 via-fuchsia-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
          Get in Touch
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">

        {/* Left — info cards */}
        <motion.div variants={item} className="flex flex-col gap-4">
          {infoCards.map((card) => (
            <motion.div
              key={card.label}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200/60 bg-slate-50/60 p-4 dark:border-slate-700/60 dark:bg-slate-800/40"
            >
              <div className={`rounded-xl ${card.bg} ${card.color} p-3`}>
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-slate-400">{card.label}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-sm font-semibold ${card.color} hover:underline`}
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {card.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right — message form */}
        <motion.form
          variants={item}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Subject</label>
            <input
              type="text"
              placeholder="What's this about?"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:shadow-sky-500/40"
          >
            <Send size={15} /> Send Message
          </motion.button>
        </motion.form>

      </div>
    </motion.section>
  )
}
