import { useQuery, useMutation } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "POST 1" },
  { id: 2, title: "POST 2" },
];

function App() {
  // QUERY
  const postsQuery = useQuery({
    queryKey: ["posts"],
    // happy path
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // sad path
    // queryFn: () => {
    //   console.log("retrying...");
    //   return Promise.reject("Something bad happened!");
    // },
  });

  // MUTATION
  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => {
        return POSTS.push({ id: 3, title: "POST 3" });
      });
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.error) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button onClick={() => newPostMutation.mutate("test")}>Add post</button>
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
