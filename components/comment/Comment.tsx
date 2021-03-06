import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";
import CustomImage from "../common/CustomImage";
import CustomLink from "../common/CustomLink";
import Maybe from "../common/Maybe";
import DeleteButton from "./DeleteButton";

const CommentContainer = styled.div`
  position: relative;
  display: block;
  margin-bottom: 0.75rem;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 0.25rem;
  box-shadow: none !important;
`;

const CommentCardBlock = styled.div`
  padding: 1.25rem;
  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const CommentContent = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

const CommentFooter = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  border-top: 1px solid #e5e5e5;
  border-radius: 0 0 0.25rem 0.25rem;
  padding: 0.75rem 1.25rem;
  box-shadow: none !important;
  background: #f5f5f5;

  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;

const CommentAuthorLink = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const CommentAuthorImage = styled(CustomImage)`
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border-radius: 30px;
  border: 0;
`;

const CommentDate = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  color: #bbb;
`;

const Comment = ({ comment }: any) => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const canModify =
    isLoggedIn && currentUser?.username === comment?.author?.username;

  return (
    <CommentContainer>
      <CommentCardBlock>
        <CommentContent>{comment.body}</CommentContent>
      </CommentCardBlock>
      <CommentFooter>
        <CommentAuthorLink>
          <CustomLink
            href="/profile/[pid]"
            as={`/profile/${comment.author.username}`}
          >
            <CommentAuthorImage
              src={comment.author.image}
              alt="Comment author's profile image"
            />
          </CustomLink>
        </CommentAuthorLink>
        &nbsp;
        <CommentAuthorLink>
          <CustomLink
            href="/profile/[pid]"
            as={`/profile/${comment.author.username}`}
            className="comment-author"
          >
            {comment.author.username}
          </CustomLink>
        </CommentAuthorLink>
        <CommentDate>{new Date(comment.createdAt).toDateString()}</CommentDate>
        <Maybe test={canModify}>
          <DeleteButton commentId={comment.id} />
        </Maybe>
      </CommentFooter>
    </CommentContainer>
  );
};

export default Comment;
