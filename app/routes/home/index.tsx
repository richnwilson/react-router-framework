import type { Route } from './+types/index'
import AboutPreview from '../about/AboutPreview'
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Friendly Dev' },
    { name: 'description', content: 'Custom website development' },
  ]
}

export default function Home() {
  return <AboutPreview />
}
