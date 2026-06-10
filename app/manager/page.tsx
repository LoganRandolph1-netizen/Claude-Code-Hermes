import AgentPage from '@/app/components/AgentPage'
import { buildings } from '@/app/data/buildings'

export default function ManagerPage() {
  const building = buildings.find((b) => b.id === 'manager')!
  return <AgentPage building={building} />
}
