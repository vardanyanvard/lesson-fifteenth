import { useEffect, useRef, useState } from "react";
import { handleGetPosts, handlePostCreation } from "../../../lib/api";
import { IPost } from "../../../lib/types";
import { Gallery } from "../../../components/Gallery";

export const Posts = () => {
  const [list, setList] = useState<IPost[]>([]);
  const [text, setText] = useState<string>("");
  const photo = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    if (photo.current) {
      const file = photo.current.files?.[0];
      if (file) {
        const form = new FormData();
        form.append("photo", file);
        form.append("content", text);

        handlePostCreation(form).then((response) =>
          setList([...list, response.payload as IPost])
        );
      }
    }
  };

  useEffect(() => {
    handleGetPosts().then((response) => {
      console.log(response.payload);
      setList(response.payload as IPost[]);
    });
  }, []);

  return (
    <div className="postContent">
      <h3>Posts</h3>
      <input
        type="file"
        style={{ display: "none" }}
        ref={photo}
        onChange={handleUpload}
      />
      <input
        className="form-control"
        placeholder="what's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn btn-s btn-info my-2"
        onClick={() => photo.current?.click()}
      >
        upload
      </button>
      <Gallery posts={list} />
    </div>
  );
};
