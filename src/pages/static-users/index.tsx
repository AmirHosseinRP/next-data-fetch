import userList from "@/pages/test.json";
import Link from "next/link";

interface User {
  name: {
    first: string;
    last: string;
  };
}

interface UsersProps {
  users: User[];
}

export default function StaticUsersPage({ users }: UsersProps) {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(function (user, index) {
          return (
            <li key={index}>
              <Link
                href={`/static-users/${user.name.first}`}
              >{`${user.name.first}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const users = userList.results;

  return {
    props: { users },
  };
}
