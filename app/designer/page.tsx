import AgentPage from '@/app/components/AgentPage'
import { buildings } from '@/app/data/buildings'

export default function DesignerPage() {
  const building = buildings.find((b) => b.id === 'designer')!
  return <AgentPage building={building} />
}
