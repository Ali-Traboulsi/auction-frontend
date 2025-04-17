import Link from "next/link";
import React from "react";
import { IIconButton } from "../../interfaces/interfaces";

const IconButton: React.FC<IIconButton> = ({
  styles,
  clickHandler = null,
  isLink = false,
  href = "/",
  svg,
  isdisable = false,
}) => {
  if (isLink) {
    return (
      <Link href={href} className={`auc-icon-btn ${styles}`}>
        {svg}
      </Link>
    );
  }

  return (
    <button
      disabled={isdisable}
      onClick={clickHandler && clickHandler}
      className={`auc-icon-btn  ${styles}`}
    >
      {svg}
    </button>
  );
};

export default IconButton;
