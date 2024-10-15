import React from "react";
import { useParams } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-3xl font-bold">Chat {id}</h1>
    </div>
  );
};

export default NotFoundPage;
