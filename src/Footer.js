import React from "react";

function Footer({ items }) {
  let itemCount = items.length;

  let itemCheckedCount = items.filter((item) => item.checked).length;

  return (
    <div>
      <p>
        You have {itemCount} item in your list, and you already completed{" "}
        {itemCheckedCount} amount of items
      </p>
    </div>
  );
}

export default Footer;
