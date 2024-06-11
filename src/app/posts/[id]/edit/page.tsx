"use client";
import { getOldPost, updatePost } from "@/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface EditPageInterface {
  params: {
    id: string;
  };
}
export default function EditPage(props: EditPageInterface) {
  const [oldPost, setOldPost] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);
  const id = parseInt(props.params.id);
  const [editFormState, editFormAction] = useFormState(updatePost, {
    message: "",
    id,
  });


  const getOldData = async () => {
    const post = await getOldPost(id);
    setOldPost(post);
  };
  useEffect(() => {
    getOldData();
  }, []);

  return (
    <section className="mt-20">
      <h2 className="text-center text-3xl font-bold uppercase">Update Post</h2>
      <p className="text-center text-xl font-medium text-gray-600">
        update your own post now
      </p>
      {editFormState.message && (
        <p className="text-center bg-red-600 text-white py-1 mt-4">
          {editFormState.message}
        </p>
      )}
      <form className="mt-6" action={editFormAction}>
        <div className="mb-4">
          <label className="text-lg font-medium text-gray-600" htmlFor="title">
            Title
          </label>
          <input
            className="block focus:none outline-none border-2 border-gray-600 w-full p-2"
            type="text"
            name="title"
            id="title"
            defaultValue={oldPost?.title}
          />
        </div>
        <div>
          <label
            className="text-lg font-medium text-gray-600"
            htmlFor="description"
          >
            description
          </label>
          <textarea
            defaultValue={oldPost?.description}
            rows={8}
            className="block focus:none outline-none border-2 border-gray-600 w-full p-2"
            name="description"
            id="description"
          ></textarea>
        </div>
        <button
          className="bg-black text-white text-center py-4 w-full mt-4 text-lg font-bold"
          type="submit"
        >
          Update
        </button>
      </form>
    </section>
  );
}
