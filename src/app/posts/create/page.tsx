"use client"

import { createPost } from "@/actions"
import { useFormState } from "react-dom"

export default function Create() {
    const [createFormState,createPostAction] = useFormState(createPost,{message : ""})
    
   return (
    <section className="mt-20">
        <h2 className="text-center text-3xl font-bold uppercase">Create Post</h2>
        <p className="text-center text-xl font-medium text-gray-600">create your own new post now</p>
        {
            createFormState.message && <p className="text-center bg-red-600 text-white py-1 mt-4">{createFormState.message}</p>
        }
        <form className="mt-6" action={createPostAction}>
            <div className="mb-4">
            <label className="text-lg font-medium text-gray-600" htmlFor="title">Title</label>
            <input className="block focus:none outline-none border-2 border-gray-600 w-full p-2" type="text" name="title" id="title"/>
            </div>
            <div>
                <label className="text-lg font-medium text-gray-600" htmlFor="description">description</label>
                <textarea rows={8} className="block focus:none outline-none border-2 border-gray-600 w-full p-2" name="description" id="description"></textarea>
            </div>
            <button className="bg-black text-white text-center py-4 w-full mt-4 text-lg font-bold" type="submit">Post</button>
        </form>
    </section>
   )
}