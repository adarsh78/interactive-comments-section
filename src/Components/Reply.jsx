import React, { useState } from "react";

const Reply = ({
  reply,
  currentUser,
  handleDeleteModal,
  handleReply,
  isEditing,
  editableText,
  setEditableText,
  handleEditSubmit,
  handleEditReply,
  replyToEditId,
}) => {
  const [currentScore, setCurrentScore] = useState(reply.score);
  const [isReplying, setIsReplying] = useState(false);
  const [nestedReplyText, setNestedReplyText] = useState("");

  const incrementScore = () => {
    setCurrentScore((prevScore) => prevScore + 1);
  };

  const decrementScore = () => {
    setCurrentScore((prevScore) => Math.max(prevScore - 1, 0));
  };

  const toggleReplyInput = () => {
    setIsReplying((prev) => !prev);
  };

  const submitNestedReply = () => {
    if (!nestedReplyText) return;
    handleReply(reply.user.username, nestedReplyText);
    setNestedReplyText("");
    setIsReplying(false);
  };

  return (
    <>
      <div className="w-[340px] lg:w-[630px] m-auto bg-white rounded-md p-4 mb-5 lg:ml-[352px]">
        <div className="lg:flex lg:gap-6">
          <div className="lg:flex hidden flex-col items-center justify-between  bg-[color:hsl(228,33%,97%)] py-2 px-3 h-[100px] rounded-md">
            <img
              src="./images/icon-plus.svg"
              alt="icon-plus"
              className="hover:cursor-pointer"
              onClick={incrementScore}
            />
            <span className="text-[color:hsl(238,40%,52%)] font-medium">
              {currentScore}
            </span>
            <img
              src="./images/icon-minus.svg"
              alt="icon-minus"
              className="hover:cursor-pointer"
              onClick={decrementScore}
            />
          </div>

          <div>
            <div className="lg:flex lg:justify-between lg:items-center">
              <div className="flex items-center gap-4">
                <img src={reply.user.image.png} alt="" width={45} />
                <h1 className="text-[color:hsl(212,24%,26%)] font-medium">
                  {reply.user.username}
                </h1>
                {reply.user.username == currentUser.username && (
                  <span className="px-1 text-white rounded-sm bg-[color:hsl(238,40%,52%)]">
                    you
                  </span>
                )}
                <p className="text-[color:hsl(211,10%,45%)]">
                  {reply.createdAt}
                </p>
              </div>
              <div>
                {reply.user.username === currentUser.username ? (
                  <div className="lg:flex hidden lg:gap-7 items-center gap-2">
                    <div className="hover:opacity-50 flex items-center gap-2">
                      <img src="./images/icon-delete.svg" alt="icon-delete" />
                      <p
                        onClick={() => handleDeleteModal(reply.id)}
                        className="text-[color:hsl(358,79%,66%)] font-medium cursor-pointer"
                      >
                        Delete
                      </p>
                    </div>

                    <div className="hover:opacity-50 flex items-center gap-2">
                      <img src="./images/icon-edit.svg" alt="icon-edit" />
                      <p
                        onClick={() => handleEditReply(reply.id)}
                        className="text-[color:hsl(238,40%,52%)] font-medium cursor-pointer"
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="lg:flex hidden items-center gap-2 hover:opacity-50">
                    <img src="./images/icon-reply.svg" alt="icon-reply" />
                    <p
                      onClick={toggleReplyInput}
                      className="text-[color:hsl(238,40%,52%)] font-medium cursor-pointer"
                    >
                      Reply
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[color:hsl(211,10%,45%)] lg:w-[540px] text-[16px] mt-5">
              <span className="text-[color:hsl(238,40%,52%)] font-medium">
                @{reply.replyingTo}
              </span>{" "}
              <span className="">{reply.content}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex lg:hidden items-center justify-between py-2 px-4 bg-[color:hsl(228,33%,97%)] w-[100px] rounded-md">
            <img
              src="./images/icon-plus.svg"
              alt="icon-plus"
              className="hover:cursor-pointer"
              onClick={incrementScore}
            />
            <span className="text-[color:hsl(238,40%,52%)] font-medium">
              {currentScore}
            </span>
            <img
              src="./images/icon-minus.svg"
              alt="icon-minus"
              className="hover:cursor-pointer"
              onClick={decrementScore}
            />
          </div>

          {reply.user.username === currentUser.username ? (
            <div className="flex lg:hidden items-center gap-2">
              <div className="hover:opacity-50 flex items-center gap-2">
                <img src="./images/icon-delete.svg" alt="icon-delete" />
                <p
                  onClick={() => handleDeleteModal(reply.id)}
                  className="text-[color:hsl(358,79%,66%)] font-medium cursor-pointer"
                >
                  Delete
                </p>
              </div>

              <div className="hover:opacity-50 flex items-center gap-2">
                <img src="./images/icon-edit.svg" alt="icon-edit" />
                <p
                  onClick={() => handleEditReply(reply.id)}
                  className="text-[color:hsl(238,40%,52%)] font-medium cursor-pointer"
                >
                  Edit
                </p>
              </div>
            </div>
          ) : (
            <div className="flex lg:hidden items-center gap-2 hover:opacity-50">
              <img src="./images/icon-reply.svg" alt="icon-reply" />
              <p
                onClick={toggleReplyInput}
                className="text-[color:hsl(238,40%,52%)] font-medium cursor-pointer"
              >
                Reply
              </p>
            </div>
          )}
        </div>
      </div>

      {isReplying && (
        <div className="w-[340px] lg:w-[630px] m-auto bg-white rounded-md p-4 mb-5 lg:ml-[352px]">
          <textarea
            type="text"
            placeholder="Add a reply..."
            className="w-[100%] border border-[color:hsl(223,19%,85%)] rounded h-auto pt-4 pl-5 pb-12 cursor-pointer hover:border-[1px] hover:border-[color:hsl(238,40%,52%)]"
            value={nestedReplyText}
            onChange={(e) => setNestedReplyText(e.target.value)}
            rows={3}
          />
          <div className="flex items-center justify-between mt-7">
            <img src={currentUser.image.png} alt="" width={35} />
            <button
              onClick={submitNestedReply}
              className="bg-[color:hsl(238,40%,52%)] text-white font-medium px-6 py-2 rounded-md text-xl cursor-pointer hover:opacity-50"
            >
              REPLY
            </button>
          </div>
        </div>
      )}

      {isEditing && reply.id === replyToEditId && (
        <div className="w-[340px] lg:w-[700px] m-auto bg-white rounded-md p-4 mb-5">
          <textarea
            type="text"
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            className="w-[100%] border border-[color:hsl(223,19%,85%)] rounded h-auto pt-4 pl-5 pb-12 cursor-pointer hover:border-[1px] hover:border-[color:hsl(238,40%,52%)]"
            rows={3}
          />
          <div className="flex items-center justify-between mt-7">
            <img src={currentUser.image.png} alt="" width={35} />
            <button
              className="bg-[color:hsl(238,40%,52%)] text-white font-medium px-6 py-2 rounded-md text-xl cursor-pointer hover:opacity-50"
              onClick={handleEditSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Reply;
