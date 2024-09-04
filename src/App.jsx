import React, { useState } from "react";
import commentsData from "../data.json";
import Comments from "./Components/Comments";

const App = () => {
  const [data, setData] = useState(commentsData.comments);
  const [currentUser, setCurrentUser] = useState(commentsData.currentUser);

  return (
    <>
      <div className="my-8">
        {data.map((da) => (
          <Comments
            key={da.id}
            comment={da}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default App;
