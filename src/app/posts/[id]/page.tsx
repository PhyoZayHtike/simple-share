import { db } from "@/db"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface PostDetailsInterface {
    params : {
        id : string
    }
}
export default async function PostDetails (props : PostDetailsInterface) {
    const id = parseInt(props.params.id)
    const post = await db.post.findFirst({
        where : {id}
    })
    if(!post){
        return notFound()
    }

    const deletePost = async () => {
        "use server"
        await db.post.delete({
            where : {id}
        })
        revalidatePath("/")
        redirect('/')
    }
    return (
        <section>
            <div className="flex justify-between mb-2 flex-col md:flex-row">
            <h1 className="text-3xl  uppercase font-extrabold tracking-wider mb-2">{post?.title}</h1>
            <div className="space-x-3">
                <Link className="text-white bg-black p-3" href={`/posts/${post.id}/edit`}>Edit</Link>
                <form className="inline" action={deletePost}>
                <button className="text-white bg-black p-2">Delete</button>
                </form>
            </div>
            </div>
            <p className="font-medium tracking-wider">{post?.description}</p>
        </section>
    )
}

export const generateStaticParams = async () => {
       const posts = await db.post.findMany()

       return posts.map(post => {
        return {
            id : post.id.toString()
        }
       })
}