import React, { ReactNode, FC } from "react";

interface Props {
  children: ReactNode;
}

const StickyTop: FC<Props> = ({ children }) => {
  return (
    <div className="sticky top-0 z-10 w-full">
      {children}
    </div>
  );
};

export default StickyTop;