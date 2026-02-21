import type { Route } from './+types/index'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Friendly Dev' },
    { name: 'description', content: 'Custom website development' },
  ]
}

export default function Home() {
  return <>HomePage</>
}
