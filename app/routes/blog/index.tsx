import type { Route } from './+types'
import type { PostMeta } from '~/types'
import { Link } from 'react-router'
import axios from 'axios'

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const { data = [] } = await axios(
    `${import.meta.env.VITE_API}/posts-meta-only`,
  )
  return { posts: data }
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData
  return (
    <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl text-white font-bold mb-8'>📝 Blog</h2>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((i) => (
          <article
            className='bg-gray-800 p-6 rounded-lg shadow mb-4'
            key={i.slug}
          >
            <h3 className='text-2xl font-semibold text-blue-400'>{i.title}</h3>
            <p className='text-sm text-gray-400 mb-2'>
              {new Date(i.date).toLocaleDateString()}
            </p>
            <p className='text-gray-300 mb-4'>{i.excerpt}</p>
            <Link
              to={`/blog/${i.slug}`}
              className='text-blue-300 text-sm hover:underline'
            >
              Read more →
            </Link>
          </article>
        ))
      )}
    </div>
  )
}

export default BlogPage
