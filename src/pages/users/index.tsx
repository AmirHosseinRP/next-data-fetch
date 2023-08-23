import Link from "next/link";

const userList = "https://randomuser.me/api/?results=100";

interface User {
  name: {
    first: string;
    last: string;
  };
}

interface UsersProps {
  users: User[];
}

export default function UsersPage({ users }: UsersProps) {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(function (user, index) {
          return (
            <li key={index}>
              <Link
                href={`/users/${user.name.first}`}
              >{`${user.name.first}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(userList);
  const data = await response.json();
  const users = data.results;

  return {
    props: { users },
  };
}
