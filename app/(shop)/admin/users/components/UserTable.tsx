"use client";

import { updateRole } from "@/src/actions";
import { User } from "@/src/interfaces";
import clsx from "clsx";

type Props = {
  users: User[];
};

export const UserTable = ({ users }: Props) => {
  return (
    <table className="min-w-full border">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td className="flex items-center text-sm   text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <span
                className={clsx("mx-2 font-medium", {
                  "text-blue-600": user.role === "admin",
                  "text-slate-400": user.role === "user",
                })}
              >
                {user.role}
              </span>
            </td>
            <td className="text-sm text-gray-900 font-light px-6 ">
              <select
                name="role"
                id="role"
                className="text-center p-1 rounded border border-gray-300 w-[120px]"
                onChange={(e) => updateRole(user.id, e.target.value)}
              >
                <option value=" "> --- Seleccione --- </option>
                <option value="admin">Admin</option>
                <option value="user"> Usuario</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
