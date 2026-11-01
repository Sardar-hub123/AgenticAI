import { useState } from 'react'
import './App.css'

type IconName =
  | 'grid'
  | 'plus'
  | 'folder'
  | 'agents'
  | 'book'
  | 'chat'
  | 'search'
  | 'bell'
  | 'settings'
  | 'pause'
  | 'play'
  | 'cube'
  | 'layers'
  | 'arrow'
  | 'clock'
  | 'check'
  | 'spark'
  | 'chevron'
  | 'close'
  | 'send'
  | 'filter'
  | 'external'
  | 'menu'
  | 'person'
  | 'code'

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    plus: 'M12 5v14M5 12h14',
    folder: 'M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    agents: 'M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M17 11h6',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
    chat: 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z',
    search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.4-4.4',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
    settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.6 2.8-.2-.1a1.7 1.7 0 0 0-1.8.2l-.2.1h-3.2l-.1-.2a1.7 1.7 0 0 0-1.5-1.1h-.3l-2.8-1.6.1-.2a1.7 1.7 0 0 0-.2-1.8l-.1-.2v-3.2l.2-.1a1.7 1.7 0 0 0 1.1-1.5v-.3l1.6-2.8.2.1a1.7 1.7 0 0 0 1.8-.2l.2-.1h3.2l.1.2a1.7 1.7 0 0 0 1.5 1.1h.3l2.8 1.6-.1.2a1.7 1.7 0 0 0 .2 1.8l.1.2v3.2z',
    pause: 'M8 5h3v14H8zM15 5h3v14h-3z',
    play: 'm7 4 13 8-13 8z',
    cube: 'm12 3 9 5-9 5-9-5 9-5zM3 8v9l9 5 9-5V8M12 13v9',
    layers: 'm12 3 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    clock: 'M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
    check: 'm5 12 4 4L19 6',
    spark: 'm12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3zM19 14l1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14z',
    chevron: 'm9 18 6-6-6-6',
    close: 'M18 6 6 18M6 6l12 12',
    send: 'm22 2-7 20-4-9-9-4 20-7zM22 2 11 13',
    filter: 'M4 7h16M7 12h10M10 17h4',
    external: 'M14 3h7v7M10 14 21 3M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6',
    menu: 'M4 6h16M4 12h16M4 18h16',
    person: 'M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
    code: 'm8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16',
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}

type ViewName = 'Command Center' | 'Projects' | 'Agents' | 'Knowledge' | 'Assistant'
type Project = {
  id: string
  name: string
  client: string
  version: string
  budget: string
  timeline: string
  status: string
  tasks: number
}

const initialProjects: Project[] = [
  {
    id: 'AIW-002',
    name: 'Field Inspection app',
    client: 'Contoso Utilities',
    version: 'v1.0',
    budget: '236 h budget',
    timeline: '6 weeks',
    status: 'In build',
    tasks: 7,
  },
  {
    id: 'AIW-001',
    name: 'Vendor onboarding portal',
    client: 'Northwind Traders',
    version: 'v2.1',
    budget: '184 h budget',
    timeline: '5 weeks',
    status: 'Design review',
    tasks: 5,
  },
]

const agents = [
  { name: 'Dataverse dev', role: 'Data model & security', color: 'green', initials: 'DV', task: 'Inspection tables and security roles', status: 'Building' },
  { name: 'Power Apps dev', role: 'Canvas app builder', color: 'pink', initials: 'PA', task: 'Offline inspector mobile app', status: 'Building' },
  { name: 'Power Automate dev', role: 'Workflow automation', color: 'blue', initials: 'AU', task: 'Repair approval flow', status: 'Reviewing' },
  { name: 'SharePoint dev', role: 'Knowledge & content', color: 'teal', initials: 'SP', task: 'Procedures library permissions', status: 'Building' },
  { name: 'SQL dev', role: 'Data migration', color: 'orange', initials: 'SQL', task: 'Migrate InspectionsDB history', status: 'Waiting for approval' },
  { name: 'Power BI dev', role: 'Analytics & reporting', color: 'yellow', initials: 'BI', task: 'Regional KPI dashboard', status: 'Queued' },
  { name: 'Copilot Studio dev', role: 'AI assistant builder', color: 'purple', initials: 'AI', task: 'Procedures Copilot', status: 'Queued' },
]

const leadership = [
  { name: 'Delivery Manager', role: 'Delivery & stakeholder coordination', color: 'blue', responsibility: 'Owns priorities, approvals and delivery health', reportsTo: 'Executive sponsor', level: 'Manager' },
  { name: 'Tech Lead', role: 'Engineering & solution architecture', color: 'purple', responsibility: 'Guides developers and reviews technical work', reportsTo: 'Delivery Manager', level: 'Team lead' },
  { name: 'QA Lead', role: 'Quality strategy & test coordination', color: 'teal', responsibility: 'Owns test coverage and release readiness', reportsTo: 'Delivery Manager', level: 'Team lead' },
]

const testers = [
  { name: 'Functional Tester', role: 'Acceptance & regression testing', color: 'orange', task: 'Validate inspection and approval workflows', status: 'Testing', reportsTo: 'QA Lead' },
  { name: 'Automation Tester', role: 'Automated quality checks', color: 'yellow', task: 'Run app smoke tests and deployment checks', status: 'Queued', reportsTo: 'QA Lead' },
]

const activity = [
  { initials: 'SP', team: 'SharePoint dev', owner: 'Tech Lead', color: 'teal', text: 'FI-06 is built in Dev: Inspection procedures', type: 'Pull request' },
  { initials: 'SP', team: 'SharePoint dev', owner: 'SharePoint dev', color: 'teal', text: 'Building FI-06 in Dev: Procedures library permissions', type: 'Note' },
  { initials: 'AU', team: 'Power Automate dev', owner: 'Tech Lead', color: 'blue', text: 'FI-04 is built in Dev: Repair approval flow', type: 'Pull request' },
  { initials: 'AU', team: 'Power Automate dev', owner: 'Power Automate dev', color: 'blue', text: 'Building FI-04 in Dev: Repair approval flow', type: 'Note' },
  { initials: 'PA', team: 'Power Apps dev', owner: 'Tech Lead', color: 'pink', text: 'FI-03 is built in Dev: Field Inspection app', type: 'Pull request' },
  { initials: 'PA', team: 'Power Apps dev', owner: 'Power Apps dev', color: 'pink', text: 'Building FI-03 in Dev: Offline inspector mobile app', type: 'Note' },
  { initials: 'DV', team: 'Dataverse dev', owner: 'Tech Lead', color: 'green', text: 'FI-01 is built in Dev: Inspection tables and security roles', type: 'Pull request' },
  { initials: 'DV', team: 'Dataverse dev', owner: 'Dataverse dev', color: 'green', text: 'Building FI-01 in Dev: Inspection tables and security roles', type: 'Note' },
]

const tasks = [
  { id: 'FI-01', name: 'Inspection tables and security roles', developer: 'Dataverse dev', builds: 'Dataverse', hours: 22 },
  { id: 'FI-02', name: 'Migrate InspectionsDB history', developer: 'SQL dev', builds: 'Held for a human (SQL)', hours: 28 },
  { id: 'FI-03', name: 'Offline inspector mobile app', developer: 'Power Apps dev', builds: 'Power Apps', hours: 78 },
  { id: 'FI-04', name: 'Repair approval flow', developer: 'Power Automate dev', builds: 'Power Automate', hours: 14 },
  { id: 'FI-05', name: 'Regional KPI dashboard', developer: 'Power BI dev', builds: 'Held for a human (Power BI)', hours: 26 },
  { id: 'FI-06', name: 'Procedures library permissions', developer: 'SharePoint dev', builds: 'SharePoint', hours: 6 },
  { id: 'FI-07', name: 'Procedures Copilot', developer: 'Copilot Studio dev', builds: 'Copilot Studio', hours: 20 },
]

const navItems: { name: ViewName; icon: IconName }[] = [
  { name: 'Command Center', icon: 'grid' },
  { name: 'Projects', icon: 'folder' },
  { name: 'Agents', icon: 'agents' },
  { name: 'Knowledge', icon: 'book' },
  { name: 'Assistant', icon: 'chat' },
]

function App() {
  const [view, setView] = useState<ViewName>('Command Center')
  const [projects, setProjects] = useState(initialProjects)
  const [activeProject, setActiveProject] = useState<Project>(initialProjects[0])
  const [projectDetailOpen, setProjectDetailOpen] = useState(false)
  const [projectTab, setProjectTab] = useState('Overview')
  const [isPaused, setIsPaused] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newClient, setNewClient] = useState('')
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [chatText, setChatText] = useState('')
  const [chatMessages, setChatMessages] = useState<string[]>([])
  const [selectedTask, setSelectedTask] = useState('')
  const [approval, setApproval] = useState<'waiting' | 'approved' | 'changes'>('waiting')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const openProject = (project: Project) => {
    setActiveProject(project)
    setProjectDetailOpen(true)
    setProjectTab('Overview')
    setApproval('waiting')
    setView('Projects')
  }

  const createProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const project: Project = {
      id: `AIW-${String(projects.length + 1).padStart(3, '0')}`,
      name: newProjectName.trim(),
      client: newClient.trim(),
      version: 'v1.0',
      budget: 'Planning',
      timeline: 'To be scoped',
      status: 'Planning',
      tasks: 0,
    }
    setProjects((current) => [...current, project])
    setNewProjectName('')
    setNewClient('')
    setShowNewProject(false)
    openProject(project)
  }

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = chatText.trim()
    if (!message) return
    setChatMessages((current) => [...current, message])
    setChatText('')
  }

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.client} ${project.id}`.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main className={`app-shell ${isDark ? 'theme-dark' : 'theme-light'}`}>
      <aside className="sidebar">
        <button className="brand" onClick={() => setView('Command Center')} aria-label="AI Workforce home">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span className="brand-copy"><strong>AI Workforce</strong><small>Power Platform delivery</small></span>
        </button>
        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.name}
              aria-label={item.name}
              title={item.name}
              className={`nav-item ${view === item.name ? 'active' : ''}`}
              onClick={() => {
                if (item.name === 'Projects') setProjectDetailOpen(false)
                setView(item.name)
              }}
            >
              <Icon name={item.icon} size={17} />
              <span>{item.name}</span>
              {item.name === 'Command Center' && <i className="online-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="builder-card">
          <span className="online-dot" />
          <div><strong>Builder online</strong><small>PC · idle</small></div>
          <span className="builder-status">●</span>
        </div>
        <div className="theme-switch" aria-label="Theme">
          <button className={isDark ? 'selected' : ''} onClick={() => setIsDark(true)}>Dark</button>
          <button className={!isDark ? 'selected' : ''} onClick={() => setIsDark(false)}>Light</button>
        </div>
        <button className="profile-button" onClick={() => notify('Signed in as Navaneeth Naik')}>
          <span className="avatar avatar-user">NN</span><span>Navaneeth Naik</span><Icon name="chevron" size={14} />
        </button>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span><Icon name="chevron" size={13} />
            <strong>{view === 'Projects' && projectDetailOpen ? activeProject.name : view}</strong>
          </div>
          <div className="topbar-actions">
            <label className="global-search">
              <Icon name="search" size={16} />
              <input aria-label="Search projects" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify('You’re all caught up')}>
              <Icon name="bell" /><span />
            </button>
            <button className="avatar avatar-user top-avatar" aria-label="Open profile">NN</button>
          </div>
        </header>

        {view === 'Command Center' && (
          <div className="command-page">
            <section className="command-heading">
              <div>
                <div className="eyebrow"><span className="live-dot" /> LIVE WORKSPACE <span className="eyebrow-divider">/</span> DELIVERY OVERVIEW</div>
                <h1>Command Center</h1>
                <p>Watch your AI workforce build Power Platform solutions in real time.</p>
              </div>
              <div className="heading-actions">
                <button className="button button-muted" onClick={() => setIsPaused(!isPaused)}>
                  <Icon name={isPaused ? 'play' : 'pause'} size={15} />{isPaused ? 'Resume' : 'Pause'}
                </button>
                <button className="button button-primary" onClick={() => setShowNewProject(true)}>
                  <Icon name="plus" size={16} /> New project
                </button>
              </div>
            </section>

            <div className="workspace-grid">
              <div className="workspace-main">
                <section className="project-ribbon panel">
                  <div className="ribbon-head">
                    <div className="ribbon-title"><span className="status-pulse" /> COMMAND CENTER <span className="status-tag">{isPaused ? 'Paused' : 'In build'}</span></div>
                    <button className="text-button" onClick={() => { setProjectDetailOpen(false); setView('Projects') }}>All projects <Icon name="arrow" size={14} /></button>
                  </div>
                  <div className="project-pills">
                    {projects.slice(0, 3).map((project) => (
                      <button key={project.id} className={`project-pill ${project.id === activeProject.id ? 'chosen' : ''}`} onClick={() => openProject(project)}>
                        <span className="project-id">{project.id}</span>{project.name}<Icon name="chevron" size={13} />
                      </button>
                    ))}
                  </div>
                  <div className="build-progress">
                    {['Scope', 'Plan', 'Design', 'Build', 'Review', 'Test', 'Deliver'].map((step, index) => (
                      <div className={`progress-step ${index < 3 ? 'complete' : ''} ${index === 3 ? 'current' : ''}`} key={step}>
                        <span className="progress-line"><i /></span><small>{step}</small>
                      </div>
                    ))}
                  </div>
                  <div className="ribbon-footer"><span>Step <b>4/7</b></span><i /> Developers building in Dev <span className="ribbon-live"><span className="live-dot" /> Live</span></div>
                </section>

                <section className="workfloor panel">
                  <div className="floor-toolbar">
                    <div><div className="floor-label"><span className="live-dot" /> WORKFORCE FLOOR</div><small className="floor-subtitle">Team structure and live assignment status</small></div>
                    <div className="floor-controls">
                      <button className="icon-button fullscreen-button" aria-label="Toggle full screen" onClick={() => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()}><Icon name="external" size={15} /></button>
                    </div>
                  </div>
                  <div className="floor-board" aria-label="Interactive team hierarchy">
                    <div className="floor-project-label"><span><b>{activeProject.id}</b>{activeProject.name}</span><small>{agents.length + testers.length + leadership.length} people · {agents.length} developers · {testers.length} testers</small></div>
                    <button className="floor-person manager-floor-card" onClick={() => { setView('Agents'); setSelectedTask(leadership[0].name) }}>
                      <span className="floor-person-icon manager-icon"><Icon name="person" size={19} /></span>
                      <span className="floor-person-copy"><small>DELIVERY MANAGER</small><strong>{leadership[0].name}</strong><em>{leadership[0].responsibility}</em></span>
                      <span className="floor-report-tag">Leadership</span>
                    </button>
                    <div className="floor-org-connector" aria-hidden="true" />
                    <div className="floor-lead-row">
                      {leadership.slice(1).map((person) => (
                        <button className="floor-person lead-floor-card" key={person.name} onClick={() => { setView('Agents'); setSelectedTask(person.name) }}>
                          <span className={`floor-person-icon color-${person.color}`}><Icon name="person" size={17} /></span>
                          <span className="floor-person-copy"><small>{person.name === 'QA Lead' ? 'QUALITY LEAD' : 'ENGINEERING LEAD'}</small><strong>{person.name}</strong><em>{person.responsibility}</em></span>
                          <span className="floor-report-tag">Reports to manager</span>
                        </button>
                      ))}
                    </div>
                    <div className="floor-team-connector" aria-hidden="true"><span /><i /><span /></div>
                    <div className="floor-team-row">
                      <section className="floor-team-zone">
                        <div className="floor-zone-heading"><span className="floor-zone-icon dev-zone-icon"><Icon name="code" size={15} /></span><span><strong>Development</strong><small>Reports to Tech Lead</small></span><b>{agents.length}</b></div>
                        <div className="floor-member-grid">
                          {agents.map((agent) => (
                            <button className="floor-member" key={agent.name} onClick={() => { setView('Agents'); setSelectedTask(agent.name) }} aria-label={`${agent.name}: ${agent.status}. ${agent.task}`}>
                              <span className={`floor-member-icon color-${agent.color}`}><Icon name="code" size={13} /></span>
                              <span className="floor-member-copy"><strong>{agent.name}</strong><small>{agent.task}</small><em><i className={`floor-status-dot ${agent.status === 'Building' || agent.status === 'Reviewing' ? 'status-active' : ''}`} />{agent.status}</em></span>
                            </button>
                          ))}
                        </div>
                      </section>
                      <section className="floor-team-zone qa-zone">
                        <div className="floor-zone-heading"><span className="floor-zone-icon qa-zone-icon"><Icon name="check" size={15} /></span><span><strong>Quality assurance</strong><small>Reports to QA Lead</small></span><b>{testers.length}</b></div>
                        <div className="floor-member-grid qa-member-grid">
                          {testers.map((tester) => (
                            <button className="floor-member" key={tester.name} onClick={() => { setView('Agents'); setSelectedTask(tester.name) }} aria-label={`${tester.name}: ${tester.status}. ${tester.task}`}>
                              <span className={`floor-member-icon color-${tester.color}`}><Icon name="check" size={13} /></span>
                              <span className="floor-member-copy"><strong>{tester.name}</strong><small>{tester.task}</small><em><i className={`floor-status-dot ${tester.status === 'Testing' ? 'status-active' : ''}`} />{tester.status}</em></span>
                            </button>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="activity-panel panel">
                <div className="panel-title-row"><div><h2>Activity</h2><p>Live updates from your team</p></div><button className="icon-button" aria-label="Filter activity" onClick={() => notify('Showing all activity')}><Icon name="filter" size={16} /></button></div>
                <div className="activity-list">
                  {activity.map((item, index) => (
                    <button className="activity-item" key={`${item.team}-${index}`} onClick={() => notify(`${item.type}: ${item.text}`)}>
                      <span className={`activity-avatar color-${item.color}`}>{item.initials}</span>
                      <span className="activity-copy"><span><b className={`text-${item.color}`}>{item.team}</b><i> · {item.owner}</i></span><strong>{item.text}</strong><small>{item.type} <span>·</span> just now</small></span>
                    </button>
                  ))}
                </div>
                <button className="activity-footer" onClick={() => { setProjectDetailOpen(false); setView('Projects') }}>View project updates <Icon name="arrow" size={14} /></button>
              </aside>
            </div>
          </div>
        )}

        {view === 'Projects' && (
          <div className="content-page projects-page">
            <div className="page-heading">
              <div><div className="eyebrow">DELIVERY / PROJECTS</div><h1>{projectDetailOpen ? activeProject.name : 'Projects'}</h1><p>{projectDetailOpen ? `${activeProject.client} · ${activeProject.version} · ${activeProject.budget} · ${activeProject.timeline} · solution FieldInspect` : 'Track delivery from scope to deployment.'}</p></div>
              <div className="heading-actions">
                <button className="button button-muted" onClick={() => notify('Design review link copied')}><Icon name="spark" size={15} /> Design review</button>
                <button className="button button-muted" onClick={() => notify('Stage preview is ready')}><Icon name="cube" size={15} /> Watch on stage</button>
              </div>
            </div>
            {!projectDetailOpen ? (
              <section className="panel projects-list-panel">
                <div className="panel-title-row"><div><h2>Your projects</h2><p>{filteredProjects.length} projects in this workspace</p></div><button className="button button-primary" onClick={() => setShowNewProject(true)}><Icon name="plus" size={16} /> New project</button></div>
                {filteredProjects.map((project) => <button key={project.id} className="project-list-row" onClick={() => openProject(project)}><span className="project-icon"><Icon name="cube" /></span><span><b>{project.name}</b><small>{project.id} · {project.client}</small></span><span className="project-list-status">{project.status}</span><Icon name="chevron" size={16} /></button>)}
              </section>
            ) : (
              <>
                <section className="approval-card panel">
                  <div className="approval-topline"><span className="eyebrow">REAL BUILD IN DEV</span><span className={`approval-status ${approval}`}>{approval === 'waiting' ? 'Waiting for you' : approval === 'approved' ? 'Design approved' : 'Changes requested'}</span></div>
                  <h2>{approval === 'waiting' ? 'Approve the design to start building' : approval === 'approved' ? 'Design approved — build is ready' : 'Design changes requested'}</h2>
                  <p className="approval-description">{approval === 'waiting' ? 'Nothing exists in Dev yet. When you approve, every developer agent builds its own part for real, and the office only shows a task as done once it exists.' : approval === 'approved' ? 'Your approval is recorded. Developer agents can now start building their assigned solution components.' : 'Your feedback has been recorded for the Tech Lead to review before build starts.'}</p>
                  <div className="task-table-wrap">
                    <table className="task-table">
                      <thead><tr><th>TASK</th><th>DEVELOPER</th><th>BUILDS</th><th>EST.</th></tr></thead>
                      <tbody>{tasks.map((task) => <tr key={task.id} className={selectedTask === task.id ? 'selected-row' : ''} onClick={() => setSelectedTask(task.id)}><td><span className="task-code">{task.id}</span> {task.name}</td><td>{task.developer}</td><td>{task.builds}</td><td>{task.hours} h</td></tr>)}</tbody>
                    </table>
                  </div>
                  <div className="approval-form">
                    <label>PM email (gets access when it’s built)<input type="email" defaultValue="demo@example.com" /></label>
                    <label>Boss email (gets access when it’s built)<input type="email" defaultValue="demo@example.com" /></label>
                  </div>
                  <div className="approval-actions">
                    <div className="build-on"><span>Build on</span><button className="choice-selected" onClick={() => notify('Build target set to My PC')}>My PC</button><button onClick={() => notify('Build target set to Cloud')}>Cloud</button></div>
                    <button className="button button-primary approve-button" onClick={() => { setApproval('approved'); notify('Design approved — build started') }}><Icon name="spark" size={15} /> Approve design &amp; build</button>
                  </div>
                  <div className="change-request">
                    <label htmlFor="design-notes">Or ask the Tech Lead for design changes</label>
                    <textarea id="design-notes" placeholder="e.g. Use SharePoint for documents instead of Dataverse files; add an approval for orders over $5,000" />
                    <button className="button button-muted" onClick={() => { setApproval('changes'); notify('Design change request sent to Tech Lead') }}>Request design changes</button>
                  </div>
                </section>
                <nav className="project-tabs" aria-label="Project sections">
                  {['Overview', 'Task board 7', 'Test cases 0', 'Client', 'Changes', 'Messages 11'].map((tab) => <button key={tab} onClick={() => setProjectTab(tab.split(' ')[0])} className={projectTab === tab.split(' ')[0] ? 'active' : ''}>{tab}</button>)}
                </nav>
                {projectTab === 'Overview' ? (
                  <div className="overview-grid">
                    <section className="panel overview-card"><h3>Boss scope</h3><p>Offline inspection app, approvals, regional KPI dashboard, SQL history migration and a procedures Copilot for Contoso Utilities.</p><h3>Risks</h3><ul><li>Offline sync conflicts</li><li>Historic data quality in InspectionsDB</li><li>Approvals need clear escalation rules</li></ul></section>
                    <section className="panel overview-card stories-card"><div className="panel-title-row"><div><h3>User stories</h3></div><span className="story-count">0/7 accepted</span></div>{['Inspector completes a checklist offline', 'Inspector attaches photos and GPS', 'Supervisor approves a repair', 'Regional lead views KPI trends'].map((story, index) => <div className="story-row" key={story}><span className="story-icon"><Icon name={index < 2 ? 'check' : 'clock'} size={15} /></span><span><b>{story}</b><small>{index < 2 ? 'Apps · Works with no signal · Syncs when back online' : 'Planned · Approval and reporting workflow'}</small></span><span className="planned-tag">Planned</span></div>)}</section>
                  </div>
                ) : (
                  <section className="panel tab-content"><div className="tab-content-icon"><Icon name={projectTab === 'Task' ? 'layers' : projectTab === 'Messages' ? 'chat' : 'folder'} size={22} /></div><div><h3>{projectTab}</h3><p>{projectTab === 'Task' ? 'Seven delivery tasks are tracked across the project team.' : projectTab === 'Test' ? 'Test cases will appear here as the team defines acceptance criteria.' : projectTab === 'Client' ? 'Client contacts and communication preferences for this delivery.' : projectTab === 'Changes' ? 'Design decisions and change requests are recorded here.' : 'Project conversations and delivery notes are collected here.'}</p></div></section>
                )}
              </>
            )}
          </div>
        )}

        {view === 'Agents' && (
          <div className="content-page">
            <div className="page-heading org-page-heading"><div><div className="eyebrow">WORKFORCE / ORGANIZATION</div><h1>Team hierarchy</h1><p>Everyone in one view, from delivery leadership to developers and testers.</p></div><button className="button button-primary" onClick={() => notify('Agent configuration opened')}><Icon name="plus" size={16} /> Configure agent</button></div>
            <section className="org-hierarchy" aria-label="Workforce reporting hierarchy">
              <div className={`org-manager-card panel ${selectedTask === leadership[0].name ? 'agent-card-selected' : ''}`}>
                <button className="org-compact-person" onClick={() => setSelectedTask(leadership[0].name)}>
                  <span className="org-person-avatar color-blue"><Icon name="person" size={18} /></span>
                  <span><small>DELIVERY MANAGER</small><strong>{leadership[0].name}</strong></span>
                </button>
                <span className="org-person-responsibility">{leadership[0].responsibility}</span>
              </div>
              <div className="org-connector" aria-hidden="true" />
              <div className="org-lead-grid">
                {leadership.slice(1).map((person) => (
                  <button className={`org-compact-person org-lead-card panel ${selectedTask === person.name ? 'agent-card-selected' : ''}`} key={person.name} onClick={() => setSelectedTask(person.name)}>
                    <span className={`org-person-avatar color-${person.color}`}><Icon name="person" size={17} /></span>
                    <span><small>{person.name === 'QA Lead' ? 'QUALITY LEAD' : 'ENGINEERING LEAD'}</small><strong>{person.name}</strong><em>{person.role}</em></span>
                    <span className="org-person-parent">Reports to <b>Delivery Manager</b></span>
                  </button>
                ))}
              </div>
              <div className="org-branch-connectors" aria-hidden="true"><span /><i /><span /></div>
              <div className="org-specialist-columns">
                <section className="org-specialist-group developer-group panel">
                  <div className="org-team-heading"><div><h2>Developers <span className="org-count">{agents.length}</span></h2><p>Reports to Tech Lead</p></div><Icon name="code" size={17} /></div>
                  <div className="org-member-grid developer-members">
                    {agents.filter((agent) => `${agent.name} ${agent.task}`.toLowerCase().includes(search.toLowerCase())).map((agent) => (
                      <button key={agent.name} className={`org-member-card ${selectedTask === agent.name ? 'selected' : ''}`} onClick={() => setSelectedTask(agent.name)} title={`${agent.name} — ${agent.task}`}>
                        <span className={`org-member-icon color-${agent.color}`}><Icon name="code" size={14} /></span>
                        <span className="org-member-copy"><strong>{agent.name}</strong><small>{agent.status}</small></span>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="org-specialist-group tester-group panel">
                  <div className="org-team-heading"><div><h2>Testers <span className="org-count">{testers.length}</span></h2><p>Reports to QA Lead</p></div><Icon name="check" size={17} /></div>
                  <div className="org-member-grid tester-members">
                    {testers.filter((tester) => `${tester.name} ${tester.task}`.toLowerCase().includes(search.toLowerCase())).map((tester) => (
                      <button key={tester.name} className={`org-member-card ${selectedTask === tester.name ? 'selected' : ''}`} onClick={() => setSelectedTask(tester.name)} title={`${tester.name} — ${tester.task}`}>
                        <span className={`org-member-icon color-${tester.color}`}><Icon name="check" size={14} /></span>
                        <span className="org-member-copy"><strong>{tester.name}</strong><small>{tester.status}</small></span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          </div>
        )}

        {view === 'Knowledge' && (
          <div className="content-page">
            <div className="page-heading"><div><div className="eyebrow">WORKFORCE / KNOWLEDGE</div><h1>Knowledge library</h1><p>Shared standards, rate cards and delivery guidance for every agent.</p></div><button className="button button-primary" onClick={() => notify('Choose a file to add to the library')}><Icon name="plus" size={16} /> Add knowledge</button></div>
            <section className="panel knowledge-hero"><div className="knowledge-hero-icon"><Icon name="book" size={24} /></div><div><span className="eyebrow">SHARED WORKSPACE</span><h2>One source of truth for your AI workforce</h2><p>Agents use these approved documents when planning and building project deliverables.</p></div><span className="knowledge-count">12 <small>documents</small></span></section>
            <div className="knowledge-grid">{[
              { icon: 'book' as const, title: 'Power Platform standards', text: 'Architecture patterns, naming and environment strategy', meta: '4 documents · Updated today', color: 'blue' },
              { icon: 'layers' as const, title: 'Solution design templates', text: 'Approved project and implementation templates', meta: '3 documents · Updated yesterday', color: 'purple' },
              { icon: 'clock' as const, title: 'Rate cards & estimates', text: 'Effort estimates and delivery planning guidance', meta: '2 documents · Updated Oct 22', color: 'orange' },
              { icon: 'check' as const, title: 'Security & governance', text: 'Data policies, access requirements and review checklist', meta: '3 documents · Updated Oct 20', color: 'green' },
            ].map((item) => <button className="knowledge-card panel" key={item.title} onClick={() => notify(`${item.title} opened`)}><span className={`knowledge-card-icon color-${item.color}`}><Icon name={item.icon} size={20} /></span><h3>{item.title}</h3><p>{item.text}</p><small>{item.meta}</small><Icon name="chevron" size={16} /></button>)}</div>
          </div>
        )}

        {view === 'Assistant' && (
          <div className="content-page assistant-page">
            <div className="page-heading"><div><div className="eyebrow">WORKFORCE / COPILOT</div><h1>Workforce assistant</h1><p>Ask about project progress, agent activity or your delivery plan.</p></div></div>
            <section className="assistant-panel panel">
              <div className="assistant-welcome"><span className="assistant-orb"><Icon name="spark" size={24} /></span><h2>How can I help with your delivery?</h2><p>I can summarize progress, explain blockers or help you plan the next step.</p></div>
              <div className="suggestion-row">{['Summarize the field inspection project', 'What is blocking delivery?', 'Show me this week’s activity'].map((suggestion) => <button key={suggestion} onClick={() => setChatMessages((current) => [...current, suggestion])}>{suggestion}<Icon name="arrow" size={13} /></button>)}</div>
              <div className="chat-history">{chatMessages.map((message, index) => <div className="chat-message" key={`${message}-${index}`}><span className="avatar avatar-user">NN</span><div><b>You</b><p>{message}</p><small>Assistant response will appear here when connected.</small></div></div>)}</div>
              <form className="assistant-input" onSubmit={sendMessage}><input aria-label="Message the workforce assistant" placeholder="Ask anything about your workforce..." value={chatText} onChange={(event) => setChatText(event.target.value)} /><button className="button button-primary" aria-label="Send message" type="submit"><Icon name="send" size={17} /></button></form>
              <small className="assistant-note">AI responses can be inaccurate. Verify important delivery decisions with your team.</small>
            </section>
          </div>
        )}
      </section>

      {showNewProject && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowNewProject(false) }}>
          <form className="new-project-modal panel" onSubmit={createProject}>
            <div className="modal-header"><div><span className="eyebrow">DELIVERY WORKSPACE</span><h2>Create a project</h2></div><button type="button" className="icon-button" aria-label="Close dialog" onClick={() => setShowNewProject(false)}><Icon name="close" /></button></div>
            <p>Start a new Power Platform delivery and bring your specialist agents together.</p>
            <label>Project name<input autoFocus required value={newProjectName} onChange={(event) => setNewProjectName(event.target.value)} placeholder="e.g. Field Inspection app" /></label>
            <label>Client or organization<input required value={newClient} onChange={(event) => setNewClient(event.target.value)} placeholder="e.g. Contoso Utilities" /></label>
            <div className="modal-actions"><button type="button" className="button button-muted" onClick={() => setShowNewProject(false)}>Cancel</button><button className="button button-primary" type="submit"><Icon name="plus" size={15} /> Create project</button></div>
          </form>
        </div>
      )}
      {toast && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={14} /></span>{toast}</div>}
    </main>
  )
}

export default App
