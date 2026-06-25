import './App.css'
import { useMemo, useState } from 'react'

function App() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [error, setError] = useState('')

  const whatsappNumber = '917543035923'

  const selectedImageSummary = useMemo(() => {
    if (!images?.length) return 'No images added.'

    const maxNames = 5
    const names = images.slice(0, maxNames).map((f) => f.name)
    const remaining = images.length - names.length
    return `Images selected: ${images.length} (${names.join(', ')}${remaining > 0 ? `, +${remaining} more` : ''})`
  }, [images])

  const buildWhatsAppMessage = () => {
    const safeName = fullName.trim() || 'N/A'
    const safePhone = phone.trim() || 'N/A'
    const safeAddress = address.trim() || 'N/A'
    const safeQuery = query.trim() || 'N/A'

    return [
      'Ampres Energy - New Inquiry',
      '',
      `Name: ${safeName}`,
      `Phone: ${safePhone}`,
      `Address: ${safeAddress}`,
      '',
      'Inquiry:',
      safeQuery,
      '',
      selectedImageSummary,
      '',
      'Service availability: Only within Jamshedpur, Jharkhand.'
    ].join('\n')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const safeAddress = address.trim()
    const isInJamshedpur = /jamshedpur/i.test(safeAddress)

    if (!isInJamshedpur) {
      setError('Service is available only in Jamshedpur, Jharkhand. Please enter your address accordingly.')
      return
    }

    const message = buildWhatsAppMessage()

    // Click-to-Chat supports text only (images can't be attached without a backend).
    // This sends the full inquiry message, including selected image names, to the WhatsApp number.
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }






  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    setImages(files)
  }

  return (
    <div className="container" style={{ padding: '2rem 0 4rem' }}>
      <header className="glass" style={{ borderRadius: '2rem', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Ampress Energy</h1>
          <p style={{ margin: '0.2rem 0 0', color: '#94a3b8' }}>Powering EVs with Reliable Lithium Battery Solutions</p>
        </div>
        <a href="#inquiry" className="btn-primary">Get Support</a>
      </header>

      <main style={{ marginTop: '2rem' }}>
        <section className="hero-grid section">
          <div>
            <div className="glass" style={{ display: 'inline-block', borderRadius: '999px', padding: '0.6rem 0.9rem', marginBottom: '1rem' }}>
              Premium lithium battery solutions for modern EVs
            </div>

            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05, margin: '0 0 1rem' }}>POWER YOUR EV WITH CONFIDENCE</h2>

            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '680px' }}>
              Custom Lithium Battery Packs, EV services and charger repair solutions built for performance, reliability and long-term durability.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="#inquiry" className="btn-primary">Get Support</a>
              <a href="#services" className="btn-secondary">Explore Services</a>
            </div>
            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1.5rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              {['2 Years Battery Warranty', 'Bluetooth Monitoring', 'Free Charger', 'Free Delivery'].map((item) => (
                <div key={item} className="glass" style={{ borderRadius: '1rem', padding: '0.8rem 0.9rem' }}>{item}</div>
              ))}
            </div>
          </div>
          <div className="card">
            <img src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80" alt="Battery pack" style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '1.5rem' }} />
            <div style={{ marginTop: '1rem', color: '#94a3b8' }}>Battery Pack • EV Scooter • Charger</div>
          </div>
        </section>

        <section id="about" className="section">
          <h3 style={{ color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.35em', fontSize: '0.8rem', marginBottom: '0.8rem' }}>About us</h3>
          <h4 style={{ fontSize: '1.8rem', margin: '0 0 1rem' }}>Trusted battery engineering for next-gen mobility</h4>
          <p style={{ color: '#cbd5e1', maxWidth: '760px', lineHeight: 1.8 }}>
            AmpForce is an emerging e-mobility battery solutions provider specializing in high-performance lithium battery packs for electric scooters. We provide expert troubleshooting, EV services, and customized battery solutions designed to deliver reliability, performance, and long-term durability.
          </p>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginTop: '1.5rem' }}>
            {['500+ Happy Customers', '1000+ Batteries Serviced', '98% Satisfaction'].map((item) => (
              <div key={item} className="card" style={{ textAlign: 'center' }}>
                <strong style={{ fontSize: '1.4rem', color: 'white' }}>{item.split(' ')[0]}</strong>
                <div style={{ color: '#94a3b8', marginTop: '0.3rem' }}>{item.replace(item.split(' ')[0], '')}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <h3 style={{ color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.35em', fontSize: '0.8rem', marginBottom: '0.8rem' }}>Services</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {[
              ['Lithium Battery Troubleshooting', 'Diagnose and troubleshoot lithium batteries for electric scooters and e-rickshaws.'],
              ['EV Service', 'Professional maintenance for electric scooters and e-rickshaws.'],
              ['EV Charger Repair', 'Repair and revive EV chargers with advanced diagnostics.'],
              ['Custom Battery Packs', 'Tailored packs for range, performance and Bluetooth monitoring.'],
            ].map(([title, text]) => (
              <div key={title} className="card">
                <h4 style={{ marginTop: 0 }}>{title}</h4>
                <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h3 style={{ color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.35em', fontSize: '0.8rem', marginBottom: '0.8rem' }}>Why choose us</h3>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {['Custom-built battery packs', 'Affordable lithium solutions', 'Smart Bluetooth monitoring', 'Free charger with every battery', '2 years battery warranty', 'Free delivery'].map((item) => (
              <div key={item} className="card">{item}</div>
            ))}
          </div>
        </section>

        <section id="inquiry" className="section">
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.35em', fontSize: '0.8rem', marginBottom: '0.8rem' }}>Inquiry</h3>
            <h4 style={{ fontSize: '1.8rem', margin: '0 0 1rem' }}>Start your EV battery consultation</h4>
            <p style={{ color: '#cbd5e1', lineHeight: 1.8 }}>Share your details and our team will contact you shortly.</p>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.3rem' }}>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                style={{ padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.12)', background: '#020617', color: 'white' }}
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                inputMode="tel"
                style={{ padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.12)', background: '#020617', color: 'white' }}
              />

              <textarea
                rows="4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tell us about your battery or charger issue"
                style={{ padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.12)', background: '#020617', color: 'white' }}
              />

              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Upload images (optional)</div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ padding: '0.6rem 0.9rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.12)', background: '#020617', color: 'white' }}
                />
                {images?.length ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {images.slice(0, 6).map((file, idx) => {
                      const url = URL.createObjectURL(file)
                      return (
                        <div key={`${file.name}-${idx}`} style={{ textAlign: 'center' }}>
                          <img
                            src={url}
                            alt={file.name}
                            style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.12)' }}
                          />
                          <div style={{ marginTop: '0.35rem', color: '#cbd5e1', fontSize: '0.75rem', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {file.name}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
                {images?.length ? <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{selectedImageSummary}</div> : null}
              </div>

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address (available in Jamshedpur, Jharkhand)"
                style={{ padding: '0.9rem 1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.12)', background: '#020617', color: 'white' }}
              />


              {error ? (
                <div style={{ color: '#fb7185', background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.25)', padding: '0.75rem 1rem', borderRadius: '1rem' }}>
                  {error}
                </div>
              ) : (
                <div style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Service is available only within Jamshedpur, Jharkhand.</div>
              )}

              <button type="button" onClick={handleSubmit} className="btn-primary" style={{ width: 'fit-content' }}>
                Add Submit
              </button>


            </div>

          </div>
        </section>

        <section className="section">
          <h3 style={{ color: '#00d4ff', textTransform: 'uppercase', letterSpacing: '0.35em', fontSize: '0.8rem', marginBottom: '0.8rem' }}>Contact</h3>
          <div className="card" style={{ display: 'grid', gap: '1rem' }}>
            <div>Phone: +91 93342 89477</div>
            <div>WhatsApp: +91 93342 89477</div>
            <div>Email: support@ampressenergy.com</div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
