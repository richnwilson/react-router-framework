import type { Route } from './+types/details'
import type { Project } from '~/types'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router'
import axios from 'axios'

export async function clientLoader({
  request,
  params,
}: Route.clientLoaderArgs): Promise<Project> {
  const { data = null } = await axios(
    `${import.meta.env.VITE_API}/projects/${params.id}`,
  )
  if (data === null) throw new Response('Project not found', { status: 404 })
  return data
}

export function HydrateFallback() {
  return <div>Loading .....</div>
}
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData
  return (
    <>
      <Link
        to='/projects/'
        className='flex items-center text-blue-400 hover:text-blue-500 mb-6 transition'
      >
        <FaArrowLeft className='mr-2'>Back to Projects</FaArrowLeft>
      </Link>
      <div className='grid gap-8 md:grid-cols-2 items-start'>
        <div>
          <img
            src={project.image}
            alt={project.title}
            className='w-full rounded-lg shadow-md'
          />
          <h1 className='text-3xl font-bold text-blue-400 mb-4'>
            {project.title}
          </h1>
        </div>
      </div>
    </>
  )
}

export default ProjectDetailsPage
