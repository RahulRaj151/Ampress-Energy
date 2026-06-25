import { AnimatePresence, motion } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useState } from 'react'

function GalleryImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-800" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4">
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
          {alt}
        </span>
      </div>
    </div>
  )
}

export default function LightboxGallery({ images }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <motion.button
            key={image.src}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => setSelected(image)}
            className="group text-left"
          >
            <GalleryImage src={image.src} alt={image.alt} />
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
              <ZoomIn size={16} className="text-cyan-400" />
              Tap to view details
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-8 backdrop-blur"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-900 p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-slate-950/70 p-2 text-slate-200"
              >
                <X size={18} />
              </button>
              <img src={selected.src} alt={selected.alt} className="h-[70vh] w-full rounded-[1.5rem] object-cover" />
              <p className="mt-4 text-center text-lg text-slate-300">{selected.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
