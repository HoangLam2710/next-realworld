import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import useSWR from "swr";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";
import CustomImage from "../common/CustomImage";
import CustomLink from "../common/CustomLink";

const CommentInput = () => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const [content, setContent] = useState("");
  const [isLoading, setLoading] = useState(false);

  const hanldeChange = useCallback((e: any) => {
    setContent(e.target.value);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await axios.post(
      `${SERVER_BASE_URL}/articles/${encodeURIComponent(String(pid))}/comments`,
      JSON.stringify({
        comment: {
          body: content,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${encodeURIComponent(currentUser?.token)}`,
        },
      }
    );

    setLoading(false);
    setContent("");
  };

  if (!isLoggedIn) {
    return (
      <p>
        <CustomLink href="/user/login" as="/user/login">
          Sign in
        </CustomLink>
        &nbsp;or&nbsp;
        <CustomLink href="/user/register" as="/user/register">
          sign up
        </CustomLink>
        &nbsp;to add comments on this article.
      </p>
    );
  }

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          rows={3}
          className="form-control"
          placeholder="Write a comment ..."
          value={content}
          onChange={hanldeChange}
          disabled={isLoading}
        />
      </div>
      <div className="card-footer">
        <CustomImage
          className="comment-author-img"
          src={currentUser?.image}
          alt="Comment author's profile image"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
