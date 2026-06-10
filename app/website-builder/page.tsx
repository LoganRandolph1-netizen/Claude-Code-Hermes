import AgentPage from '@/app/components/AgentPage'
import { buildings } from '@/app/data/buildings'

export default function WebsiteBuilderPage() {
  const building = buildings.find((b) => b.id === 'website-builder')!
  return <AgentPage building={building} />
}
