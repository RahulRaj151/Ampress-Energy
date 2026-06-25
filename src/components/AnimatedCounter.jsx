import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return undefined

    const duration = 1200
    const startTime = performance.now()

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1)
      setDisplayValue(Math.round(value * progress))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
    >
      <div className="text-4xl font-semibold text-white sm:text-5xl">
        {displayValue}
        {suffix}
      </div>
      <p className="mt-2 text-sm uppercase tracking-[0.25em] text-slate-400">{label}</p>
    </motion.div>
  )
}
