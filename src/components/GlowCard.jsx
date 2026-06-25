import { motion } from 'framer-motion'

const glowStyles = {
  cyan: 'from-cyan-500/20 via-cyan-400/10 to-transparent shadow-cyan-500/10',
  green: 'from-emerald-500/20 via-emerald-400/10 to-transparent shadow-emerald-500/10',
  violet: 'from-violet-500/20 via-fuchsia-400/10 to-transparent shadow-violet-500/10',
}

export default function GlowCard({ children, className = '', glow = 'cyan' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ type: 'spring', stiffness: 160, damping: 18 }}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${glowStyles[glow]} opacity-80 transition duration-500 group-hover:opacity-100`} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
