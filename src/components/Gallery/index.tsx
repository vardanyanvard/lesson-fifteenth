import { BASE_URL } from "../../lib/constantst";
import { IPost } from "../../lib/types";

interface IProps {
  posts: IPost[];
}
export const Gallery: React.FC<IProps> = ({ posts }) => {
  return (
    <>
      {/* <p>you have {posts.length} posts</p> */}
      <div className="list">
        {posts.map((post) => (
          <div key={post.id}>
            <img src={BASE_URL + post.picture} />
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};
