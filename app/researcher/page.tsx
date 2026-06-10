import AgentPage from '@/app/components/AgentPage'
import { buildings } from '@/app/data/buildings'

export default function ResearcherPage() {
  const building = buildings.find((b) => b.id === 'researcher')!
  return <AgentPage building={building} />
}
