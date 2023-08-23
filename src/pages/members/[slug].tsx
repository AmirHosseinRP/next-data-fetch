const userList = "https://api.github.com/users";

interface User {
  id: number;
  login: string;
}

export default function UserDetailPage({ user }: { user: User }) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      <p>ID: {user.id}</p>
      <p>Login: {user.login}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch(userList);
  const data = await response.json();
  const users = data;

  const paths = users.map(function (user: any) {
    return {
      params: { slug: user.login },
    };
  });

  return {
    paths,
    fallback: false, // Set to false to return a 404 for invalid paths
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const response = await fetch(userList);
  const data = await response.json();
  const users = data;
  const user = users.find(function (u: any) {
    return u.login === params.slug;
  });

  return {
    props: { user },
  };
}
