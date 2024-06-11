import { db } from "@/db";
import Link from "next/link";

// export const dynamic = "force-dynamic"
export default async function Home() {
  const posts = await db.post.findMany({orderBy : {id: "desc"}})
  
  return (
    <>
    {
      posts.length == 0 && <p className="text-center my-36">No Data</p>
    }
    <section className="grid grid-cols-1  md:grid-cols-2 gap-3">
      {
        posts.map(post => {
          return(
            <div className="border border-black p-3" key={post.id}>
              <h4 className="font-bold uppercase text-2xl tracking-wider mb-2">{post.title}</h4>
              <Link className="p-1 bg-black text-white text-sm font-medium rounded" href={`/posts/${post.id}`}>Read More</Link>
              <p className="mt-2 tracking-widest font-mono">{post.description.substring(0,200)}...</p>
            </div>
          )
        })
      }
    </section>
    </>
  );
}
