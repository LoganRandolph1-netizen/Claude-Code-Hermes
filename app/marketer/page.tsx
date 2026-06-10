import AgentPage from '@/app/components/AgentPage'
import { buildings } from '@/app/data/buildings'

export default function MarketerPage() {
  const building = buildings.find((b) => b.id === 'marketer')!
  return <AgentPage building={building} />
}
