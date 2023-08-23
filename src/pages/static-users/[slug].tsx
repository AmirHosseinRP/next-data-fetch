import userList from "@/pages/test.json";

interface User {
  name: {
    first: string;
    last: string;
  };
  dob: {
    date: string;
  };
}

export default function StaticUserDetailPage({ user }: { user: User }) {
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
  const paths = userList.results.map(function (user: any) {
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
  const user = userList.results.find(function (u: any) {
    return u.name.first === params.slug;
  });

  return {
    props: { user },
  };
}
