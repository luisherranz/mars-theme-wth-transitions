import React from "react";
import { connect } from "frontity";

const Link = ({ actions, link, className, children }) => {
  const onClick = event => {
    // Do nothing if it's an external link
    if (link.startsWith("http")) return;

    event.preventDefault();
    // Set the router to the new url.
    actions.router.set(link);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <a href={link} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default connect(Link);
