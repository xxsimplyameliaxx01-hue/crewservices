'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  Plane,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PlaneTakeoff,
  Search,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react'

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Roster', icon: CalendarDays },
  { label: 'Flights', icon: PlaneTakeoff },
  { label: 'Crew', icon: UsersRound },
  { label: 'Qualifications', icon: ClipboardCheck },
  { label: 'CrewSafe', icon: ShieldCheck },
  { label: 'Annual Leave', icon: CalendarDays },
  { label: 'Attendance', icon: Clock3 },
  { label: 'Notifications', icon: Bell, count: 3 },
]

const crew = [
  { name: 'Amelia Hart', initials: 'AH', role: 'Senior Captain', base: 'EGLL', status: 'Active', qual: 'A380 / B777' },
  { name: 'Liam Chen', initials: 'LC', role: 'First Officer', base: 'EGCC', status: 'Active', qual: 'A320 / A321' },
  { name: 'Sofia Williams', initials: 'SW', role: 'Cabin Manager', base: 'EGKK', status: 'On leave', qual: 'Long haul' },
  { name: 'Noah Patel', initials: 'NP', role: 'Senior First Officer', base: 'EGLL', status: 'Active', qual: 'B787 / B777' },
]

const flights = [
  { flight: 'AVG 284', route: 'London Heathrow → New York JFK', time: '08:40', gate: 'B42', aircraft: 'A350-900', status: 'Boarding' },
  { flight: 'AVG 611', route: 'Amsterdam → Dubai', time: '10:15', gate: 'D18', aircraft: 'B777-300ER', status: 'Scheduled' },
  { flight: 'AVG 092', route: 'Singapore → London Heathrow', time: '12:30', gate: 'A07', aircraft: 'A380-800', status: 'Scheduled' },
]

function StatusPill({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-pill status-${tone}`}>{children}</span>
}

function Kpi({ label, value, detail, icon: Icon, tone }: { label: string; value: string; detail: string; icon: typeof UsersRound; tone: string }) {
  return (
    <article className="kpi-card">
      <div className={`kpi-icon ${tone}`}><Icon size={19} /></div>
      <div className="kpi-copy"><p>{label}</p><strong>{value}</strong><span>{detail}</span></div>
      <ArrowUpRight className="kpi-arrow" size={17} />
    </article>
  )
}

export default function CrewServices() {
  const [active, setActive] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [attendanceOpen, setAttendanceOpen] = useState(false)
  const [saved, setSaved] = useState(false)
  const [month, setMonth] = useState(8)
  const filteredCrew = useMemo(() => crew.filter((person) => `${person.name} ${person.role} ${person.base}`.toLowerCase().includes(query.toLowerCase())), [query])

  const choose = (label: string) => { setActive(label); setMobileOpen(false) }

  return (
    <div className="crew-app">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark"><span /></div><div><b>avio group.</b><small>CrewServices</small></div></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav aria-label="Main navigation">{nav.map(({ label, icon: Icon, count }) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => choose(label)}><Icon size={18} /><span>{label}</span>{count && <em>{count}</em>}</button>)}</nav>
        <div className="sidebar-bottom"><div className="support-card"><ShieldCheck size={18} /><div><b>CrewSafe status</b><span>All systems operational</span></div><i /></div><button className="profile"><span className="avatar avatar-navy">JT</span><span><b>Jordan Taylor</b><small>Operations team</small></span><MoreHorizontal size={18} /></button></div>
      </aside>
      {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></button><div><p className="eyebrow">AVIO GROUP. / OPERATIONS</p><h1>{active}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="Notifications" onClick={() => setNoticeOpen(!noticeOpen)}><Bell size={19} /><span className="notification-dot" /></button><div className="top-user"><span className="avatar">JT</span><span><b>Jordan Taylor</b><small>Operations team</small></span></div></div>{noticeOpen && <div className="notification-popover"><div className="popover-head"><b>Notifications</b><span>3 unread</span></div><div className="notification-line"><AlertTriangle size={16} /><span><b>Qualification expiry</b><small>Amelia Hart's A380 rating expires in 14 days.</small></span></div><div className="notification-line"><CalendarDays size={16} /><span><b>Leave request</b><small>Sofia Williams submitted a new request.</small></span></div><button onClick={() => setNoticeOpen(false)}>View all notifications</button></div>}</header>
        <div className="page-body">
          <section className="welcome-row"><div><p className="date-line">MONDAY, 24 AUGUST 2026 <span>•</span> LOCAL TIME 09:42</p><h2>Good morning, Jordan.</h2><p className="muted">Here&apos;s your operational overview for today.</p></div><button className="primary-btn" onClick={() => setAttendanceOpen(true)}><ClipboardCheck size={17} /> Open attendance register</button></section>
          <section className="kpi-grid"><Kpi label="Total crew" value="248" detail="↑ 6 this month" icon={UsersRound} tone="blue" /><Kpi label="Active today" value="186" detail="75% of total crew" icon={Activity} tone="green" /><Kpi label="Flights today" value="42" detail="4 require attention" icon={Plane} tone="amber" /></section>
          <section className="dashboard-grid"><article className="panel flights-panel"><div className="panel-heading"><div><p className="section-kicker">OPERATIONS</p><h3>Today&apos;s flights</h3></div><button className="text-btn" onClick={() => choose('Flights')}>View all <ArrowUpRight size={15} /></button></div><div className="flight-list">{flights.map((flight) => <div className="flight-row" key={flight.flight}><div className="flight-code"><span className="plane-badge"><Plane size={16} /></span><b>{flight.flight}</b></div><div className="route"><b>{flight.route}</b><span>{flight.aircraft} <span className="dot-sep">•</span> Gate {flight.gate}</span></div><time>{flight.time}</time><StatusPill tone={flight.status === 'Boarding' ? 'blue' : 'neutral'}>{flight.status}</StatusPill></div>)}</div></article><article className="panel roster-panel"><div className="panel-heading"><div><p className="section-kicker">MY ROSTER</p><h3>August 2026</h3></div><div className="month-actions"><button aria-label="Previous month" onClick={() => setMonth(Math.max(7, month - 1))}><ChevronLeft size={16} /></button><button aria-label="Next month" onClick={() => setMonth(Math.min(9, month + 1))}><ChevronRight size={16} /></button></div></div><div className="calendar"><div className="weekdays">{['M','T','W','T','F','S','S'].map((day, i) => <span key={`${day}-${i}`}>{day}</span>)}</div><div className="days">{Array.from({ length: 35 }, (_, i) => { const day = i - 5; return <span key={i} className={`${day === 24 ? 'today' : ''} ${day < 1 || day > 31 ? 'empty' : ''} ${[3, 10, 17, 28].includes(day) ? 'flight-day' : ''} ${[6, 13, 20, 27].includes(day) ? 'off-day' : ''}`}>{day > 0 && day <= 31 ? day : ''}</span> })}</div></div><div className="calendar-legend"><span><i className="legend-flight" /> Flight</span><span><i className="legend-off" /> Day off</span><span><i className="legend-training" /> Training</span></div></article></section>
          <section className="lower-grid"><article className="panel crew-panel"><div className="panel-heading"><div><p className="section-kicker">PEOPLE</p><h3>Crew directory</h3></div><button className="text-btn" onClick={() => choose('Crew')}>Manage crew <ArrowUpRight size={15} /></button></div><div className="search-box"><Search size={17} /><input aria-label="Search crew" placeholder="Search by name, role or base" value={query} onChange={(e) => setQuery(e.target.value)} />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15} /></button>}</div><div className="crew-table"><div className="table-head"><span>CREW MEMBER</span><span>ROLE</span><span>BASE</span><span>STATUS</span></div>{filteredCrew.map((person) => <div className="crew-line" key={person.name}><div className="member"><span className="avatar avatar-soft">{person.initials}</span><span><b>{person.name}</b><small>{person.qual}</small></span></div><span>{person.role}</span><span className="base-code">{person.base}</span><StatusPill tone={person.status === 'Active' ? 'green' : 'amber'}>{person.status}</StatusPill></div>)}</div></article><article className="panel actions-panel"><div className="panel-heading"><div><p className="section-kicker">MANAGEMENT</p><h3>Open actions</h3></div><button className="icon-btn small"><MoreHorizontal size={17} /></button></div><div className="action-item"><span className="action-icon amber"><Clock3 size={17} /></span><span><b>Leave requests</b><small>4 requests awaiting review</small></span><button onClick={() => choose('Annual Leave')}><ChevronRight size={17} /></button></div><div className="action-item"><span className="action-icon red"><AlertTriangle size={17} /></span><span><b>Qualifications</b><small>3 qualifications expiring soon</small></span><button onClick={() => choose('Qualifications')}><ChevronRight size={17} /></button></div><div className="action-item"><span className="action-icon blue"><FileText size={17} /></span><span><b>Pending registrations</b><small>5 crew awaiting approval</small></span><button onClick={() => choose('Management')}><ChevronRight size={17} /></button></div><div className="system-note"><Check size={16} /><span><b>All safety reports up to date</b><small>Last reviewed 08:30 today</small></span></div></article></section>
        </div>
      </main>
      {attendanceOpen && <div className="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="attendance-title"><button className="modal-scrim" aria-label="Close attendance register" onClick={() => setAttendanceOpen(false)} /><div className="modal"><div className="modal-header"><div><p className="section-kicker">ATTENDANCE / AVG 284</p><h2 id="attendance-title">Attendance register</h2><p className="muted">London Heathrow → New York JFK · 24 August 2026</p></div><button className="icon-btn" onClick={() => setAttendanceOpen(false)} aria-label="Close"><X size={19} /></button></div><div className="attendance-list">{['Amelia Hart · Senior Captain','Liam Chen · First Officer','Maya Okafor · Cabin Crew','Noah Patel · Senior First Officer'].map((name, i) => <div className="attendance-row" key={name}><span className="avatar avatar-soft">{name.split(' ').map((n) => n[0]).join('').slice(0,2)}</span><b>{name}</b><select defaultValue={i === 2 ? 'Late' : 'Present'}><option>Present</option><option>Late</option><option>Absent</option><option>Excused</option></select></div>)}</div><div className="modal-footer"><span>{saved ? 'Register saved successfully.' : '4 crew members on this flight'}</span><button className="primary-btn" onClick={() => { setSaved(true); setTimeout(() => setAttendanceOpen(false), 700) }}><Check size={17} /> Save register</button></div></div></div>}
    </div>
  )
}

export { nav }

