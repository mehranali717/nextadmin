"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./pagination.module.css";
const Pagination = ({count}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const page = searchParams.get("page") || 1;
  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 2;
  const hasPre = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;
  const handlePageChange = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathName}?${params}`);
  };
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPre}
        onClick={() => handlePageChange("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handlePageChange("next")}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
