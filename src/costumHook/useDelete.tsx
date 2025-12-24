import { useState } from "react";

const useDelete = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const open = (id: number) => {
    if (openId !== null) {
      setOpenId(null);
      setTimeout(() => {
        setOpenId(id);
      }, 150);
    } else {
      setOpenId(id);
    }
  };
  const close = () => {
    setOpenId(null);
  };
  return { openId, open, close };
};

export default useDelete;
