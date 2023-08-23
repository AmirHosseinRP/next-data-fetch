import Link from "next/link";

const userList = "https://api.github.com/users";

interface User {
  login: string;
}

interface UsersProps {
  users: User[];
}

export default function MembersPage({ users }: UsersProps) {
  return (
    <div>
      <h1>User List</h1>
      {users ? (
        <ul>
          {users.map(function (user, index) {
            return (
              <li key={index}>
                <Link href={`/members/${user.login}`}>{`${user.login}`}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        "failed to fetch"
      )}
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(userList);
  const data = await response.json();
  const users = data;

  return {
    props: { users },
  };
}
