import { useState } from 'react'

export default function BirthdateDetector({ onDetect }) {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleDetect = async (e) => {
    e.preventDefault()
    setError('')
    if (!date) { setError('Pick your birthdate first'); return }
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/detect-sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthdate: date })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Could not detect sign')
      onDetect(data.sign)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleDetect} className="bg-slate-800/60 border border-indigo-500/20 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-sm text-indigo-200/80 mb-1">Birthdate</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-white/10" />
        </div>
        <button type="submit" disabled={loading} className="bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          {loading ? 'Detecting...' : 'Detect Sign'}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  )
}
