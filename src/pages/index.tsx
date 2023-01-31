import { trpc } from "~/lib/shared/trpc";

export default function Home() {
  const hello = trpc.user.getHello.useQuery();
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  console.log(hello.data);
  return (
    <>
      <h1>Home</h1>
      <h1>{hello.data.message}</h1>
    </>
  );
}
