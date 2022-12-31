import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {Fragment} from 'react'
import {signOut, useSession} from "next-auth/react"

const navigation = [
    {name: 'خانه', href: '/', current: false},
    {name: 'ویرایشگر آنلاین', href: '/editor', current: true},
    {name: 'راهنمای مارک داون', href: '/mark-down', current: false},
    {name: 'اتصال به گیت‌هاب', href: '/repos', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Nav() {

    const {data: session} = useSession()

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    {/*<p className='text-white'>مارک‌داون</p>*/}
                                    <img
                                        className="block h-12 w-auto lg:hidden"
                                        src="/images/logo.png"
                                        alt="ویرایشگر مارک داون ام داون"
                                    />
                                    <img
                                        className="hidden h-12 w-auto lg:block"
                                        src="/images/logo.png"
                                        alt="ویرایشگر مارک داون ام داون"
                                    />
                                </div>
                                <div className="hidden sm:mr-6 sm:block">
                                    <div className="flex pt-2 space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 ml-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:mr-6 sm:pr-0">

                                {
                                    session &&
                                    <div className='flex flex-row items-center'>
                                        {/*<p className='pt-2 ml-2 text-white'>{session.user.name}</p>*/}
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button
                                                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={session.user.image}
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {/*<Menu.Item>*/}
                                                    {/*    {({active}) => (*/}
                                                    {/*        <a*/}
                                                    {/*            href="#"*/}
                                                    {/*            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                                                    {/*        >*/}
                                                    {/*            Your Profile*/}
                                                    {/*        </a>*/}
                                                    {/*    )}*/}
                                                    {/*</Menu.Item>*/}
                                                    {/*<Menu.Item>*/}
                                                    {/*    {({active}) => (*/}
                                                    {/*        <a*/}
                                                    {/*            href="#"*/}
                                                    {/*            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                                                    {/*        >*/}
                                                    {/*            Settings*/}
                                                    {/*        </a>*/}
                                                    {/*    )}*/}
                                                    {/*</Menu.Item>*/}
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <a onClick={signOut}
                                                               href="#"
                                                               className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >خروج از حساب کاربری</a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                }
                                {
                                    !session &&

                                    <Link href='/api/auth/signin'
                                          className="inline-block px-5 py-2 mx-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-0">ورود
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}