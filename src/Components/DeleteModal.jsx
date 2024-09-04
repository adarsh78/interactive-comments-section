import React from "react";

const DeleteModal = ({ handleDelete, setDeleteModalOpen }) => {
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className="fixed top-[10rem] left-[2.35rem] lg:left-[37rem] z-50">
        <div className="w-[300px] mx-auto bg-white rounded-md p-5">
          <h2 className="text-[color:hsl(212,24%,26%)] font-medium">
            Delete Comment
          </h2>
          <p className="text-[13px] text-[color:hsl(211,10%,45%)] my-2">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className="flex items-center justify-between gap-4 mt-4">
            <button
              onClick={handleDeleteModalClose}
              className="text-sm w-[100%] bg-[color:hsl(211,10%,45%)] text-white font-medium py-2 rounded-md cursor-pointer"
            >
              NO, CANCEL
            </button>
            <button
              onClick={handleDelete}
              className="text-sm w-[100%] bg-[color:hsl(358,79%,66%)] text-white font-medium py-2 rounded-md cursor-pointer"
            >
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
