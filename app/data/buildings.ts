export interface Building {
  id: string
  name: string
  role: string
  description: string
  status: 'Online' | 'Offline' | 'Busy'
  route: string
  color: string
  glowColor: string
  region: {
    left: string
    top: string
    width: string
    height: string
  }
  tooltipDir: 'up' | 'down'
}

export const buildings: Building[] = [
  {
    id: 'manager',
    name: 'Command Vanta',
    role: 'Manager',
    description:
      'Central command for Agenthusiast. Command Vanta receives Director objectives, breaks them into tasks, assigns work across the team, tracks progress, and keeps the full pipeline moving from research to build to promotion.',
    status: 'Online',
    route: '/manager',
    color: '#00d4ff',
    glowColor: 'rgba(0, 212, 255, 0.4)',
    region: { left: '35%', top: '8%', width: '22%', height: '52%' },
    tooltipDir: 'down',
  },
  {
    id: 'website-builder',
    name: 'Webby Works',
    role: 'Website Builder',
    description:
      'Builds and maintains the website storefront layer of the ecosystem. Handles site structure, product pages, storefront updates, and the web experience that connects buyers to Agenthusiast products and automations.',
    status: 'Online',
    route: '/website-builder',
    color: '#00ff88',
    glowColor: 'rgba(0, 255, 136, 0.4)',
    region: { left: '17%', top: '26%', width: '25%', height: '32%' },
    tooltipDir: 'down',
  },
  {
    id: 'marketer',
    name: 'Signal Rush',
    role: 'Marketing',
    description:
      'Runs low-cost growth and customer acquisition. Handles organic promotion, platform visibility, audience building, community targeting, and conversion-focused campaigns across TikTok, Reddit, Pinterest, Etsy, and Fiverr.',
    status: 'Online',
    route: '/marketer',
    color: '#cc44ff',
    glowColor: 'rgba(204, 68, 255, 0.4)',
    region: { left: '58%', top: '26%', width: '22%', height: '32%' },
    tooltipDir: 'down',
  },
  {
    id: 'designer',
    name: 'Dreamframe',
    role: 'Designer',
    description:
      'Produces the visuals buyers see first. Creates AI-generated product art, listing thumbnails, mockups, banners, and brand assets optimized for storefront clicks and platform specs.',
    status: 'Online',
    route: '/designer',
    color: '#00ffcc',
    glowColor: 'rgba(0, 255, 204, 0.4)',
    region: { left: '79%', top: '5%', width: '21%', height: '45%' },
    tooltipDir: 'down',
  },
  {
    id: 'researcher',
    name: 'Data Specter',
    role: 'Researcher',
    description:
      'Tracks what is selling right now and finds verified product opportunities. Monitors trends, top sellers, competition levels, and early niche signals so the team builds from real market demand instead of guesswork.',
    status: 'Online',
    route: '/researcher',
    color: '#4488ff',
    glowColor: 'rgba(68, 136, 255, 0.4)',
    region: { left: '15%', top: '60%', width: '29%', height: '32%' },
    tooltipDir: 'up',
  },
  {
    id: 'coder',
    name: 'Codeforge',
    role: 'Coder',
    description:
      'Builds the automation engine behind Agenthusiast. Creates scripts, listing pipelines, image processors, store sync tools, and API integrations that let the ecosystem scale instead of relying on manual work.',
    status: 'Online',
    route: '/coder',
    color: '#ff8844',
    glowColor: 'rgba(255, 136, 68, 0.4)',
    region: { left: '58%', top: '60%', width: '24%', height: '32%' },
    tooltipDir: 'up',
  },
]
