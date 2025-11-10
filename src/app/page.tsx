import { Card, Hero } from "@components";
import { sanityClient } from "@sanity/client";

interface Post {
  _id: string;
  title: string;
}

const POSTS_QUERY = `*[ _type == "post"]`;

export default async function Page() {
  const posts = await sanityClient.fetch(POSTS_QUERY);

  return (
    <>
      <Hero />
      <div className="py-10 px-5">
        {posts.length > 0 ? (
          posts.map((post: Post) => <Card key={post._id} title={post.title} />)
        ) : (
          <div>No posts found</div>
        )}
      </div>
    </>
  );
}
