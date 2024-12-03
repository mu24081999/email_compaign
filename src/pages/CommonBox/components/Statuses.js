import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserRepliesApi } from "../../../redux/services/unibox.";
import Heading from "../../../components/Heading";

const Statuses = () => {
  const dispatch = useDispatch();
  const { token, user_id } = useSelector((state) => state.auth);
  const getReplies = () => {
    dispatch(getUserRepliesApi(token, user_id));
  };
  return (
    <div>
      <div>
        <ul className="font-semibold text-sm ps-5 py-2 space-y-2">
          <li
            className="list-item list-disc cursor-pointer hover:text-gray-300 transition-colors duration-200"
            onClick={() => getReplies()}
          >
            Sent
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Statuses;
