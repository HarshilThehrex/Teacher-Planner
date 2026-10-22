import { useState } from 'react'
import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, BookOpen, CalendarCheck, Clock, Settings as Cog, LogOut, Menu } from 'lucide-react'
import * as auth from './auth.js'
import { DataProvider, useData } from './store.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Schedule from './pages/Schedule.jsx'
import Lessons from './pages/Lessons.jsx'
import Events from './pages/Events.jsx'
import Availability from './pages/Availability.jsx'
import Settings from './pages/Settings.jsx'

const links = [
  ['/', 'Dashboard', LayoutDashboard],
  ['/schedule', 'My Schedule', CalendarDays],
  ['/lessons', 'Lesson Planner', BookOpen],
  ['/calendar', 'Academic Calendar', CalendarCheck],
  ['/availability', 'My Availability', Clock],
  ['/settings', 'Settings', Cog],
]

function Shell({ onLogout }) {
  const [open, setOpen] = useState(false)
  const { db } = useData()
  return (
    <div className="shell">
      <header className="topbar">
        <button className="icon" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Menu size={20} /></button>
        <b>Teacher Planner</b>
      </header>
      <aside className={'sidebar' + (open ? ' open' : '')}>
        <div className="brand"><BookOpen size={20} /> Teacher Planner</div>
        <nav>
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}><Icon size={18} /> {label}</NavLink>
          ))}
          <button onClick={onLogout}><LogOut size={18} /> Logout</button>
        </nav>
        <div className="who">{db.settings.name}<small>{db.settings.email}</small></div>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/calendar" element={<Events />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(auth.getUser())
  if (!user) return <Login onLogin={setUser} />
  return <DataProvider><Shell onLogout={() => { auth.logout(); setUser(null) }} /></DataProvider>
}
