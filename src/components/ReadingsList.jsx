import { useEffect, useState } from 'react'

export default function ReadingsList({ selectedSign }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const url = selectedSign ? `${baseUrl}/api/readings?sign=${selectedSign}` : `${baseUrl}/api/readings`
        const res = await fetch(url)
        const data = await res.json()
        setItems(data.items || [])
      } catch {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [selectedSign])

  if (loading) return <div className="text-indigo-200">Loading saved readings...</div>

  if (!items.length) return <div className="text-indigo-200/80">No saved readings yet.</div>

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((r) => (
        <div key={r.id || r._id} className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
          <div className="text-xs uppercase tracking-wide text-indigo-300/80">{r.sign}</div>
          <div className="text-sm text-indigo-200/90">{r.date}</div>
          <p className="text-white/90 mt-2 text-sm leading-relaxed">{r.content}</p>
        </div>
      ))}
    </div>
  )
}
