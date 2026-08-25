'use client'

import { useState } from 'react'
import { Bell, CalendarDays, ClipboardCheck, LayoutDashboard, Menu, MoreHorizontal, PlaneTakeoff, ShieldCheck, UsersRound, X } from 'lucide-react'

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Roster', icon: CalendarDays },
  { label: 'Flights', icon: PlaneTakeoff },
  { label: 'Crew', icon: UsersRound },
  { label: 'Qualifications', icon: ClipboardCheck },
  { label: 'CrewSafe', icon: ShieldCheck },
  { label: 'Annual Leave', icon: CalendarDays },
  { label: 'Attendance', icon: ClipboardCheck },
  { label: 'Notifications', icon: Bell },
]

export default function CrewServices() {
  const [active, setActive] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [attendanceOpen, setAttendanceOpen] = useState(false)

  const choose = (label: string) => {
    setActive(label)
    setMobileOpen(false)
  }

  return (
    <div className="crew-app">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><span /></div><div><b>avio group.</b><small>CrewServices</small></div></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav aria-label="Main navigation">{nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => choose(label)}><Icon size={18} /><span>{label}</span></button>)}</nav>
        <div className="sidebar-bottom"><div className="support-card"><ShieldCheck size={18} /><div><b>CrewSafe status</b><span>Ready to connect</span></div><i /></div><button className="profile"><span className="avatar avatar-navy">AG</span><span><b>avio group.</b><small>Operations workspace</small></span><MoreHorizontal size={18} /></button></div>
      </aside>
      {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></button><div><p className="eyebrow">AVIO GROUP. / OPERATIONS</p><h1>{active}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="Notifications"><Bell size={19} /></button><div className="top-user"><span className="avatar">AG</span><span><b>avio group.</b><small>Operations workspace</small></span></div></div></header>
        <div className="page-body">
          <section className="welcome-row"><div><p className="date-line">CREWSERVICES WORKSPACE</p><h2>Welcome to CrewServices.</h2><p className="muted">Connect your crew and flight data to get started.</p></div><button className="primary-btn" onClick={() => setAttendanceOpen(true)}><ClipboardCheck size={17} /> Open attendance register</button></section>
          <section className="empty-dashboard" aria-label="Dashboard setup"><div className="empty-icon"><ShieldCheck size={24} /></div><h3>Your dashboard is ready</h3><p>Add your operational data to see crew, flights, roster, and attendance information here.</p><button className="text-btn" onClick={() => choose('Crew')}>Set up crew data</button></section>
          <section className="dashboard-grid"><article className="panel empty-panel"><div className="panel-heading"><div><p className="section-kicker">OPERATIONS</p><h3>Today&apos;s flights</h3></div><button className="text-btn" onClick={() => choose('Flights')}>Add flight data</button></div><div className="panel-empty-copy"><PlaneTakeoff size={22} /><span>No flights added yet.</span></div></article><article className="panel empty-panel"><div className="panel-heading"><div><p className="section-kicker">MY ROSTER</p><h3>Roster</h3></div><button className="text-btn" onClick={() => choose('My Roster')}>Set up roster</button></div><div className="panel-empty-copy"><CalendarDays size={22} /><span>No roster entries yet.</span></div></article></section>
          <section className="lower-grid"><article className="panel empty-panel"><div className="panel-heading"><div><p className="section-kicker">PEOPLE</p><h3>Crew directory</h3></div><button className="text-btn" onClick={() => choose('Crew')}>Add crew</button></div><div className="panel-empty-copy"><UsersRound size={22} /><span>No crew members added yet.</span></div></article></section>
        </div>
      </main>
      {attendanceOpen && <div className="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="attendance-title"><button className="modal-scrim" aria-label="Close attendance register" onClick={() => setAttendanceOpen(false)} /><div className="modal"><div className="modal-header"><div><p className="section-kicker">ATTENDANCE</p><h2 id="attendance-title">Attendance register</h2><p className="muted">Add a flight before recording attendance.</p></div><button className="icon-btn" onClick={() => setAttendanceOpen(false)} aria-label="Close"><X size={19} /></button></div><div className="panel-empty-copy"><ClipboardCheck size={22} /><span>No flights available for attendance.</span></div></div></div>}
    </div>
  )
}

export { nav }
