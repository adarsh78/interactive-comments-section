import React, { useState } from "react";
import Reply from "./Reply";
import DeleteModal from "./DeleteModal";
import "./Comments.css";

const Comments = ({ comment, currentUser }) => {
  const [currentRating, setCurrentRating] = useState(comment.score);
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState(comment.replies || []);
  const [replyText, setReplyText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [replyToDeleteById, setReplyToDeleteById] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [replyToEditId, setReplyToEditId] = useState(null);

  const incrementRating = () => {
    setCurrentRating((prevRating) => prevRating + 1);
  };

  const decrementRating = () => {
    setCurrentRating((prevRating) => (prevRating > 0 ? prevRating - 1 : 0));
  };

  const toggleReply = () => {
    setIsReply((prev) => !prev);
  };

  const handleReply = (replyingTo, replyText) => {
    if (!replyText) return;

    const newReply = {
      id: reply.length + 5,
      content: replyText,
      createdAt: "just now",
      score: 0,
      replyingTo: replyingTo,
      user: currentUser,
    };

    setReply((prevReplies) => [...prevReplies, newReply]);
    setReplyText("");
    setIsReply(false);
  };

  const handleDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setReplyToDeleteById(id);
  };

  const handleDelete = () => {
    setReply((prevReplies) =>
      prevReplies.filter((rep) => rep.id !== replyToDeleteById)
    );
    setDeleteModalOpen(false);
  };

  const handleEditReply = (id) => {
    const replyToEdit = reply.find((r) => r.id === id);
    if (replyToEdit) {
      setEditableText(replyToEdit.content);
      setReplyToEditId(id);
      setIsEditing(true);
    }
    console.log("I am edit");
  };

  const handleEditSubmit = () => {
    if (replyToEditId === null) return;

    setReply(
      reply.map((rep) =>
        rep.id === replyToEditId ? { ...rep, content: editableText } : rep
      )
    );
    setIsEditing(false);
    setEditableText("");
    setReplyToEditId(null);
  };

  return (
    <>
      {deleteModalOpen && <div className="overlay"></div>}
      <main>
        <div className="w-[340px] lg:w-[700px] m-auto bg-white rounded-md p-4 mb-5">
          <div className="lg:flex lg:gap-6">
            <div className="lg:flex hidden flex-col items-center justify-between  bg-[color:hsl(228,33%,97%)] py-2 w-[80px] h-[100px] rounded-md">
              <img
                src="./images/icon-plus.svg"
                alt="icon-plus"
                className="hover:cursor-pointer"
                onClick={incrementRating}
              />
              <span className="text-[color:hsl(238,40%,52%)] font-medium">
                {currentRating}
              </span>
              <img
                src="./images/icon-minus.svg"
                alt="icon-minus"
                className="hover:cursor-pointer"
                onClick={decrementRating}
              />
            </div>

            <div>
              <div className="lg:flex lg:justify-between lg:items-center">
                <div className="flex items-center gap-4">
                  <img src={comment.user.image.png} alt="" width={45} />
                  <h1 className="text-[color:hsl(212,24%,26%)] font-medium">
                    {comment.user.username}
                  </h1>
                  <p className="text-[color:hsl(211,10%,45%)]">
                    {comment.createdAt}
                  </p>
                </div>

                <div className="lg:flex hidden items-center gap-2 hover:opacity-50">
                  <img src="./images/icon-reply.svg" alt="icon-reply" />
                  <p
                    onClick={toggleReply}
                    className="text-[color:hsl(238,40%,52%)] font-medium cursor-pointer"
                  >
                    Reply
                  </p>
                </div>
              </div>

              <p className="text-[color:hsl(211,10%,45%)] text-[16px] mt-5">
                {comment.content}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex lg:hidden items-center justify-between py-2 px-4 bg-[color:hsl(228,33%,97%)] w-[100px] rounded-md">
              <img
                src="./images/icon-plus.svg"
                alt="icon-plus"
                className="hover:cursor-pointer"
                onClick={incrementRating}
              />
              <span className="text-[color:hsl(238,40%,52%)] font-medium">
                {currentRating}
              </span>
              <img
                src="./images/icon-minus.svg"
                alt="icon-minus"
                className="hover:cursor-pointer"
                onClick={decrementRating}
              />
            </div>

            <div className="flex items-center gap-2 lg:hidden hover:opacity-50">
              <img src="./images/icon-reply.svg" alt="icon-reply" />
              <p
                onClick={toggleReply}
                className="text-[color:hsl(238,40%,52%)] font-medium cursor-pointer"
              >
                Reply
              </p>
            </div>
          </div>
        </div>

        {isReply && (
          <div className="w-[340px] lg:w-[700px] m-auto bg-white rounded-md p-4 mb-5">
            <textarea
              type="text"
              placeholder="Add a comment..."
              className="w-[100%] border border-[color:hsl(223,19%,85%)] rounded h-auto pt-4 pl-5 pb-12 cursor-pointer hover:border-[1px] hover:border-[color:hsl(238,40%,52%)]"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
            />
            <div className="flex items-center justify-between mt-7">
              <img src={currentUser.image.png} alt="" width={45} />
              <button
                onClick={() => handleReply(comment.user.username, replyText)}
                className="bg-[color:hsl(238,40%,52%)] text-white font-medium px-8 py-3 rounded-md text-xl cursor-pointer hover:opacity-50"
              >
                REPLY
              </button>
            </div>
          </div>
        )}

        {reply.map((rep) => (
          <Reply
            key={rep.id}
            reply={rep}
            currentUser={currentUser}
            handleDeleteModal={handleDeleteModal}
            handleReply={handleReply}
            isEditing={isEditing}
            editableText={editableText}
            setEditableText={setEditableText}
            handleEditSubmit={handleEditSubmit}
            handleEditReply={handleEditReply}
            replyToEditId={replyToEditId}
          />
        ))}
      </main>

      {deleteModalOpen && (
        <DeleteModal
          handleDelete={handleDelete}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}

      {comment.id == 2 && (
        <div className="w-[340px] lg:w-[700px] m-auto bg-white rounded-md p-4 mb-5">
          <textarea
            type="text"
            placeholder="Add a comment..."
            className="w-[100%] border border-[color:hsl(223,19%,85%)] rounded h-auto pt-4 pl-5 pb-12 cursor-pointer hover:border-[1px] hover:border-[color:hsl(238,40%,52%)]"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={3}
          />
          <div className="flex items-center justify-between mt-7">
            <img src={currentUser.image.png} alt="" width={45} />
            <button
              onClick={() => handleReply(comment.user.username, replyText)}
              className="bg-[color:hsl(238,40%,52%)] text-white font-medium px-8 py-3 rounded-md text-xl cursor-pointer hover:opacity-50"
            >
              REPLY
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
