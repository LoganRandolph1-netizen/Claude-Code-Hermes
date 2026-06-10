import AgentPage from '@/app/components/AgentPage'
import { buildings } from '@/app/data/buildings'

export default function CoderPage() {
  const building = buildings.find((b) => b.id === 'coder')!
  return <AgentPage building={building} />
}
