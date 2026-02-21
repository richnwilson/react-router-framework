import { useState } from 'react'
import type { Route } from './+types/index'
import axios from 'axios'
import type { Project } from '~/types'
import ProjectCard from '~/components/ProjectCard'

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const { data } = await axios.get(`${import.meta.env.VITE_API}/projects`)
  return { projects: data }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] }
  const [state, setState] = useState({ currentPage: 1 })
  const { currentPage } = state
  const projectsPerPage = 2
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const indexOfLast = currentPage * projectsPerPage
  const indexOfFirst = indexOfLast - projectsPerPage

  const currentProjects = projects.slice(indexOfFirst, indexOfLast)

  const renderPagination = () => (
    <div className='flex justify-center gap-2 mt-8'>
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          className={`px-3 py-1 cursor-pointer rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
          onClick={() => setState({ currentPage: idx + 1 })}
        ></button>
      ))}
    </div>
  )
  return (
    <>
      <h2 className='text-3xl text-white font-bold mb8'>Projects</h2>
      <div className='grid gap-6 sm:grid-cols-2'>
        {projects.length > 0 ? (
          currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
      {totalPages > 1 && renderPagination()}
    </>
  )
}

export default ProjectsPage
