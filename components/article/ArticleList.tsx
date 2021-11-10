//import styled from "@emotion/styled";
import styled from "styled-components";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { usePageState } from "../../lib/context/PageContext";
import {
  usePageCountDispatch,
  usePageCountState,
} from "../../lib/context/PageCountContext";
import { DEFAULT_LIMIT, SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import Maybe from "../common/Maybe";
import Pagination from "../common/Pagination";
import ArticlePreview from "./ArticlePreview";

const EmptyMessage = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
`;

const ArticleList = () => {
  const page = usePageState();
  const pageCount = usePageCountState();
  const setPageCount = usePageCountDispatch();
  const lastIndex =
    pageCount > 480 ? Math.ceil(pageCount / 20) : Math.ceil(pageCount / 20) - 1;

  const router = useRouter();
  const { asPath, pathname, query } = router;
  const { favorite, follow, tag, pid } = query;
  const isProfilePage = pathname.startsWith(`/profile`);

  const getFetchURL = useCallback(() => {
    switch (true) {
      case !!tag:
        return `${SERVER_BASE_URL}/articles${asPath}&offset=${
          page * DEFAULT_LIMIT
        }`;
      case isProfilePage && !!favorite:
        return `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
          String(pid)
        )}&offset=${page * DEFAULT_LIMIT}`;
      case isProfilePage && !favorite:
        return `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
          String(pid)
        )}&offset=${page * DEFAULT_LIMIT}`;
      case !isProfilePage && !!follow:
        return `${SERVER_BASE_URL}/articles/feed?offset=${
          page * DEFAULT_LIMIT
        }`;
      default:
        return `${SERVER_BASE_URL}/articles?offset=${page * DEFAULT_LIMIT}`;
    }
  }, [favorite, page, tag, isProfilePage, asPath, follow, pid]);

  let fetchURL = useMemo(() => getFetchURL(), [getFetchURL]);

  const { data, error } = useSWR(fetchURL, fetcher);

  if (error) return <ErrorMessage message="Cannot load recent articles..." />;
  if (!data) return <LoadingSpinner />;

  const { articles, articlesCount } = data;
  setPageCount(articlesCount);

  if (articles?.length === 0) {
    return <EmptyMessage>No articles are here... yet.</EmptyMessage>;
  }

  return (
    <>
      {articles?.map((article: any) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <Maybe test={articlesCount && articlesCount > 20}>
        <Pagination
          total={pageCount}
          limit={20}
          pageCount={10}
          currentPage={page}
          lastIndex={lastIndex}
          fetchURL={fetchURL}
        />
      </Maybe>
    </>
  );
};

export default ArticleList;
