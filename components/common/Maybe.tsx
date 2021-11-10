import React from "react";

const Maybe = ({ test, children }: any) => {
  return <>{test && children}</>;
};

export default Maybe;
