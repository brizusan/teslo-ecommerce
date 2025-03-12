"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
  currentPage: number;
};

export const Pagination = ({ totalPages, currentPage }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const arrayPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      return `${pathname}`; //   href="/kid";
    }

    if (+pageNumber > totalPages) {
      // Next >
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          {currentPage > 1 && (
            <Link
              href={createPageUrl(currentPage - 1)}
              className=" relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-500  focus:shadow-none"
            >
              Previous
            </Link>
          )}

          {arrayPages.map((page, index) => (
            <li key={index} className="page-item">
              <Link
                href={createPageUrl(page)}
                className={clsx(
                  "relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none mx-1",
                  {
                    "bg-blue-500 text-white": page === currentPage,
                  }
                )}
              >
                {page}
              </Link>
            </li>
          ))}

          {currentPage < totalPages && (
            <Link
              href={createPageUrl(currentPage + 1)}
              className=" relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            >
              Next
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};
