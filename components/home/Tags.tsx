import { useCallback } from "react";
import useSWR from "swr";

import { usePageDispatch } from "../../lib/context/PageContext";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import CustomLink from "../common/CustomLink";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";

const Tags = () => {
  const setPage = usePageDispatch();
  const handleClick = useCallback(() => {
    setPage(0);
  }, [setPage]);
  const { data, error } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher);

  if (error) return <ErrorMessage message="Cannot load popular tags ..." />;
  if (!data) return <LoadingSpinner />;

  const { tags } = data;

  return (
    <div className="tag-list">
      {tags.map((tag: any) => (
        <CustomLink
          key={tag}
          href={`/?tag=${tag}`}
          as={`/?tag=${tag}`}
          className="tag-default tag-pill"
        >
          <span onClick={handleClick}>{tag}</span>
        </CustomLink>
      ))}
    </div>
  );
};

export default Tags;
