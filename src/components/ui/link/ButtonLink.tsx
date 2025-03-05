import Link from "next/link";

type Props = {
  name: string;
  url: string;
  classCustom?: string;
};
export const ButtonLink = ({ name, url, classCustom }: Props) => {
  return (
    <Link
      href={url}
      className={` ${classCustom} rounded-md border p-3 text-center hover:bg-gray-100 transition-colors hover:cursor-pointer capitalize`}
    >
      {name}
    </Link>
  );
};
