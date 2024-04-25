import { deleteUser } from "@/app/lib/actions";
import { fetchUsers } from "@/app/lib/data";
import { Pagination, Search, usersStyle } from "@/app/ui/dashboard";
import Image from "next/image";
import Link from "next/link";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);
  return (
    <div className={usersStyle.container}>
      <div className={usersStyle.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={usersStyle.addButton}>Add New</button>
        </Link>
      </div>
      <table className={usersStyle.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={usersStyle.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={usersStyle.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "active" : "passive"}</td>
              <td>
                <div className={usersStyle.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button
                      className={`${usersStyle.button} ${usersStyle.view}`}
                    >
                      View
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" value={user.id} name="id" />
                    <button
                      className={`${usersStyle.button} ${usersStyle.delete}`}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};
export default UsersPage;
