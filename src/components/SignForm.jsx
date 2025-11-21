import { useState } from 'react'

const SIGNS = [
  'aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'
]

export default function SignForm({ onGet }) {
  const [sign, setSign] = useState('aries')
  const [scope, setScope] = useState('daily')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/horoscope`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sign, scope })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to fetch horoscope')
      onGet(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-indigo-500/20 rounded-2xl p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-indigo-200/80 mb-1">Zodiac Sign</label>
          <select value={sign} onChange={(e)=>setSign(e.target.value)} className="w-full bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-white/10">
            {SIGNS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-indigo-200/80 mb-1">Scope</label>
          <select value={scope} onChange={(e)=>setScope(e.target.value)} className="w-full bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-white/10">
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" disabled={loading} className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-2 rounded-lg transition-colors">
            {loading ? 'Fetching...' : 'Get Horoscope'}
          </button>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  )
}
