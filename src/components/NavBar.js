import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Log in', to: '/login' },
  { name: 'Sign up', to: '/signup' },
  { name: 'Questionnaire', to: '/announce1' },
  { name: 'Make CV', to: '/make' },
  { name: '@authenticate', to: '/authenticate' },
  { name: '@user', to: '/user' },
  { name: '@admin', to: '/admin' },
]

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow-sm ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-blue-950">
                  Octo<span className="text-red-500">CV</span>
                </Link>
              </div>

              <div className="hidden sm:block">
                <div className="ml-10 flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="rounded-md px-3 py-2 text-sm font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-blue-950 hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-white shadow-inner">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
         
          </Disclosure.Panel>
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-0.5 bg-red-500 w-full" />
          </div> 
        </>
      )}
    </Disclosure>
  )
}
