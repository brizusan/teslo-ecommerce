import Link from "next/link";
import { ReactElement } from "react";

type Props = {
  href: string;
  classCustom?: string;
  icon: ReactElement;
  name: string;
  onCloseMenu?: () => void;
};
export const SideBarLink = ({
  href,
  classCustom,
  icon,
  name,
  onCloseMenu,
}: Props) => {
  return (
    <Link
      onClick={onCloseMenu}
      className={` ${classCustom} flex gap-4 items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all`}
      href={href}
    >
      {icon}
      <span className="text-lg">{name}</span>
    </Link>
  );
};
