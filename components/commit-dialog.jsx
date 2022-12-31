import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'

export default function CommitDialog(props) {

    function closeModal() {
        props.setIsOpen(false)
    }

    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >


                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="font-sans text-lg leading-6 text-gray-900"
                                >کامیت فایل</Dialog.Title>
                                {
                                    props.loading ?
                                        <>
                                            <p>در حال کامیت. لطفا صبر کنید...</p>
                                        </>
                                        :
                                        <>
                                            <div className="mt-2">
                                                <div className="w-full px-3 mt-4">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">نام</label>
                                                    <input
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="name" type="text" placeholder="Mahdi"/>
                                                </div>
                                                <div className="w-full px-3 mt-4">
                                                    <label
                                                        style={{fontFamily: 'Vazirmatn'}}
                                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">ایمیل</label>
                                                    <input
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-last-name" type="text" placeholder="john@doe.com"/>
                                                </div>

                                                <div className="w-full px-3 mt-4">
                                                    <label className="block text-sm font-medium text-gray-700">توضیح
                                                        کامیت</label>
                                                    <div className="mt-1">
                                            <textarea id="message" name="message" rows="3"
                                                      onChange={(event) => props.setMessage(event.target.value)}
                                                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                      placeholder="تغییرات ..."></textarea>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClose={closeModal}
                                                    onClick={props.commit}
                                                >کامیت فایل
                                                </button>
                                            </div>
                                        </>
                                }
                            </Dialog.Panel>


                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}