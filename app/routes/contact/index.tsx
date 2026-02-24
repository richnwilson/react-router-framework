import type { Route } from './+types'

// Example of posting a form to backend with validation
// import { Form } from 'react-router'
// export async function action({ request }: Route.ActionArgs) {
//   const formData = await request.formData()
//   const name = formData.get('name')
//   // Typescript converts to email type
//   const email = formData.get('email') as string
//   const message = formData.get('message') as string
//   const subject = formData.get('subject') as string

//   // Error validation
//   // Typescript will look for object where keys are strings and values are strings
//   const errors: Record<string, string> = {}

//   if (!name) errors.name = 'Name is required'
//   if (!email) {
//     errors.email = 'Email is required'
//   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     errors.email = 'Invalid email format'
//   }
//   if (!subject) errors.subject = 'Submit is required'
//   if (!message) errors.message = 'Message is required'
//   if (Object.keys(errors).length > 0) {
//     return { errors }
//   }

//   const data = {
//     name,
//     email,
//     message,
//     subject,
//   }
//   // Could make server call to update database or trigger email
//   return { message: 'Form submitted successfully', data }
// }

const ContactPage = () => {
  return (
    <div className='max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 text-center'>
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        Contact Me
      </h2>
      <form
        action='https://formspree.io/f/mgolrajy'
        method='POST'
        className='space-y-6 text-left'
      >
        <div>
          <label
            htmlFor='name'
            className='block-text-sm font-medium text-gray-300'
          >
            Full Name
          </label>
          <input
            type='text'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            id='name'
            name='name'
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block-text-sm font-medium text-gray-300'
          >
            Email
          </label>
          <input
            type='email'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            id='email'
            name='email'
          />
        </div>
        <div>
          <label
            htmlFor='subject'
            className='block-text-sm font-medium text-gray-300'
          >
            Subject
          </label>
          <input
            type='text'
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            id='subject'
            name='subject'
          />
        </div>
        <div>
          <label
            htmlFor='message'
            className='block-text-sm font-medium text-gray-300'
          >
            Message
          </label>
          <textarea
            className='w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100'
            id='message'
            name='message'
          ></textarea>
        </div>
        <button className='w-full bg-blue-600 text-white py-2 rounded-lg bg-blue-800 hover:bg-blue-700 cursor-pointer'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ContactPage
