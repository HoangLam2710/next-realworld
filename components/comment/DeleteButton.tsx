import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import trigger from "swr";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

const DeleteButton = ({ commentId }: any) => {
  const { data: currentUser } = useSWR("user", storage);
  const user = useRouter();
  const {
    query: { pid },
  } = user;

  const handleDelete = async (commentId: any) => {
    await axios.delete(
      `${SERVER_BASE_URL}/articles/${pid}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Token ${currentUser?.token}`,
        },
      }
    );

    trigger(`${SERVER_BASE_URL}/articles/${pid}/comments`);
  };

  return (
    <span className="mod-options">
      <i className="ion-trash-a" onClick={() => handleDelete(commentId)} />
    </span>
  );
};

export default DeleteButton;
