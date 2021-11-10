import React from "react";
import useSWR from "swr";
import { CommentType } from "../../lib/types/commentType";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

const CommentList = ({ pid }: any) => {
  const { data, error } = useSWR(
    `${SERVER_BASE_URL}/articles/${pid}/comments`,
    fetcher
  );

  if (error) return <ErrorMessage message="Cannot load comments..." />;
  if (!data) return <LoadingSpinner />;

  const { comments } = data;

  return (
    <>
      <CommentInput />
      {comments?.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentList;
