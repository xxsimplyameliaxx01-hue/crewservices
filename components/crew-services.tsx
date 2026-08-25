'use client'

import { useState } from 'react'
import { Bell, CalendarDays, ClipboardCheck, FileText, LayoutDashboard, Menu, MoreHorizontal, PlaneTakeoff, Plus, ShieldCheck, UsersRound, X } from 'lucide-react'

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

const pageCopy: Record<string, { kicker: string; title: string; description: string; icon: typeof CalendarDays; action: string }> = {
  'My Roster': { kicker: 'ROSTER', title: 'My roster', description: 'Your assigned duties and availability will appear here.', icon: CalendarDays, action: 'Add roster entry' },
  Flights: { kicker: 'OPERATIONS', title: 'Flights', description: 'Manage flight schedules and crew assignments in one place.', icon: PlaneTakeoff, action: 'Add flight' },
  Crew: { kicker: 'PEOPLE', title: 'Crew directory', description: 'Add crew members to build your operational directory.', icon: UsersRound, action: 'Add crew member' },
  Qualifications: { kicker: 'COMPLIANCE', title: 'Qualifications', description: 'Track qualifications, certifications, and renewal dates.', icon: ClipboardCheck, action: 'Add qualification' },
  CrewSafe: { kicker: 'SAFETY', title: 'CrewSafe', description: 'Connect safety data to monitor operational readiness.', icon: ShieldCheck, action: 'Connect CrewSafe' },
  'Annual Leave': { kicker: 'OPERATIONS', title: 'Annual leave', description: 'Leave requests and team availability will appear here.', icon: CalendarDays, action: 'Request leave' },
  Attendance: { kicker: 'OPERATIONS', title: 'Attendance', description: 'Add flights and crew before recording attendance.', icon: ClipboardCheck, action: 'Add attendance' },
  Notifications: { kicker: 'WORKSPACE', title: 'Notifications', description: 'You&apos;re all caught up. New workspace updates will appear here.', icon: Bell, action: 'Notification settings' },
}

function EmptyPage({ page, onAction }: { page: string; onAction: () => void }) {
  const copy = pageCopy[page]
  const Icon = copy.icon
  return <div className="page-body"><div className="welcome-row"><div><p className="date-line">{copy.kicker}</p><h2>{copy.title}</h2><p className="muted">{copy.description}</p></div>{page !== 'Flights' && <button className="primary-btn" onClick={onAction}><Plus size={16} /> {copy.action}</button>}</div><section className="empty-dashboard page-empty"><div className="empty-icon"><Icon size={24} /></div><h3>{page === 'Notifications' ? 'No new notifications' : `${copy.title} is ready`}</h3><p>{page === 'Flights' ? 'Add a flight to view its details and access the attendance register for that specific flight.' : `${copy.description} Start by adding your first record to get started.`}</p>{page !== 'Flights' && <button className="text-btn" onClick={onAction}>{copy.action}</button>}</section></div>
}

export default function CrewServices() {
  const [active, setActive] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const choose = (label: string) => { setActive(label); setMobileOpen(false); setNotice('') }
  const action = (label: string) => setNotice(`${label} will be available when your workspace data is connected.`)

  return <div className="crew-app">
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><span /></div><div><b>avio group.</b><small>CrewServices</small></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav aria-label="Main navigation">{nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => choose(label)}><Icon size={18} /><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="support-card"><ShieldCheck size={18} /><div><b>CrewSafe status</b><span>Ready to connect</span></div><i /></div><button className="profile"><span className="avatar avatar-navy">EJ</span><span><b>Ellis James</b><small>Chairperson</small></span><MoreHorizontal size={18} /></button></div>
    </aside>
    {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></button><div><p className="eyebrow">AVIO GROUP. / OPERATIONS</p><h1>{active}</h1></div><div className="top-actions"><button className="icon-btn" aria-label="Notifications" onClick={() => choose('Notifications')}><Bell size={19} /></button><div className="top-user"><span className="avatar">EJ</span><span><b>Ellis James</b><small>Chairperson</small></span></div></div></header>
      {active === 'Dashboard' ? <div className="page-body"><section className="welcome-row"><div><p className="date-line">CREWSERVICES WORKSPACE</p><h2>Welcome to CrewServices.</h2><p className="muted">Connect your crew and flight data to get started.</p></div></section><section className="empty-dashboard"><div className="empty-icon"><ShieldCheck size={24} /></div><h3>Your dashboard is ready</h3><p>Add your operational data to see crew, flights, roster, and attendance information here.</p><button className="text-btn" onClick={() => choose('Crew')}>Set up crew data</button></section><section className="dashboard-grid"><article className="panel empty-panel"><div className="panel-heading"><div><p className="section-kicker">OPERATIONS</p><h3>Today&apos;s flights</h3></div><button className="text-btn" onClick={() => choose('Flights')}>Add flight data</button></div><div className="panel-empty-copy"><PlaneTakeoff size={22} /><span>No flights added yet.</span></div></article><article className="panel empty-panel"><div className="panel-heading"><div><p className="section-kicker">MY ROSTER</p><h3>Roster</h3></div><button className="text-btn" onClick={() => choose('My Roster')}>Set up roster</button></div><div className="panel-empty-copy"><CalendarDays size={22} /><span>No roster entries yet.</span></div></article></section><section className="lower-grid"><article className="panel empty-panel"><div className="panel-heading"><div><p className="section-kicker">PEOPLE</p><h3>Crew directory</h3></div><button className="text-btn" onClick={() => choose('Crew')}>Add crew</button></div><div className="panel-empty-copy"><UsersRound size={22} /><span>No crew members added yet.</span></div></article></section></div> : <EmptyPage page={active} onAction={() => action(pageCopy[active]?.action ?? 'This action')} />}
      {notice && <div className="toast" role="status"><FileText size={16} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={14} /></button></div>}
    </main>
  </div>
}

export { nav }
