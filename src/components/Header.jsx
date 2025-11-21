import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Celestial Vibes
        </h1>
      </div>
      <p className="text-indigo-200/90 max-w-2xl mx-auto">
        Get your daily horoscope, discover your zodiac sign from your birthday, and browse saved readings.
      </p>
    </header>
  )
}
