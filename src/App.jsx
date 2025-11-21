import { useState } from 'react'
import Header from './components/Header'
import SignForm from './components/SignForm'
import BirthdateDetector from './components/BirthdateDetector'
import ReadingsList from './components/ReadingsList'

function App() {
  const [current, setCurrent] = useState(null)
  const [detectedSign, setDetectedSign] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(600px_circle_at_0%_0%,rgba(99,102,241,0.08),transparent_40%),radial-gradient(600px_circle_at_100%_0%,rgba(236,72,153,0.06),transparent_40%),radial-gradient(800px_circle_at_50%_100%,rgba(59,130,246,0.05),transparent_40%)]" />
      <div className="relative max-w-5xl mx-auto px-6 py-10">
        <Header />

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
            <BirthdateDetector onDetect={(sign)=>setDetectedSign(sign)} />
            <SignForm onGet={(data)=>setCurrent(data)} />
          </div>
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 min-h-[220px]">
            <h3 className="text-lg font-semibold mb-2">Your Horoscope</h3>
            {!current ? (
              <p className="text-indigo-200/80">Pick a sign and scope to generate your reading.</p>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-indigo-300">{current.sign} • {current.scope} • {current.date}</div>
                <p className="leading-relaxed">{current.content}</p>
              </div>
            )}
            {detectedSign && (
              <p className="mt-4 text-sm text-indigo-300">Detected sign from birthdate: <span className="font-semibold text-white">{detectedSign}</span></p>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Saved Readings</h3>
          <ReadingsList selectedSign={detectedSign || (current?.sign) || ''} />
        </div>
      </div>
    </div>
  )
}

export default App
