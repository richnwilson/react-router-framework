import ReactMarkdown from 'react-markdown'
import type { Route } from './+types'
import type { PostMeta } from '~/types'
import { Link } from 'react-router'
import axios from 'axios'

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params
  const { data = [] } = await axios(
    `${import.meta.env.VITE_API}/posts-meta-only`,
  )

  if (data.length === 0) throw new Response('No data found', { status: 404 })
  const postMeta = data.find((post: PostMeta) => post.slug === slug)
  if (!postMeta) throw new Response('No post found', { status: 404 })

  const markdown = await import(`../../posts/${slug}.md?raw`)

  return { postMeta, markdown: markdown.default }
}

type BlogDetailsPageProps = {
  loaderData: { postMeta: PostMeta; markdown: string }
}

const BlogDetailsPage = ({ loaderData }: BlogDetailsPageProps) => {
  const { postMeta, markdown } = loaderData
  return (
    <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
      <h1 className='text-3xl font-bold text-blue-400 mb-2'>
        {postMeta.title}
      </h1>
      <p className='text-sm text-gray-400 mb-6'>
        {new Date(postMeta.date).toLocaleDateString()}
      </p>
      <div className='prose prose-invert max-w-none mb-12'>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <Link
        to='/blog'
        className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
      >
        Back to Posts →
      </Link>
    </div>
  )
}

export default BlogDetailsPage
