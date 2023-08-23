const userList = "https://randomuser.me/api/?results=100";

interface User {
  name: {
    first: string;
    last: string;
  };
  dob: {
    date: string;
  };
}
interface UsersProps {
  results: User[];
}

export default function UserDetailPage({ user }: { user: User }) {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      <p>Name: {`${user.name.first} ${user.name.last}`}</p>
      <p>Date of Birth: {user.dob.date}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch(userList);
  const data: UsersProps = await response.json();
  const users = data.results;
  const paths = users.map(function (user) {
    return {
      params: { slug: user.name.first },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const response = await fetch(userList);
  const data = await response.json();
  const users = data.results;
  const user = users.find(function (u: any) {
    return u.name.first === params.slug;
  });

  return {
    props: { user },
  };
}
