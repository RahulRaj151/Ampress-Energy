import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg text-slate-400">{description}</p>
    </motion.div>
  )
}
