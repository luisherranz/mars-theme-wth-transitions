import React from "react";
import { connect } from "frontity";

const Link = ({
  state,
  actions,
  link,
  className,
  children,
  "aria-current": ariaCurrent,
}) => {
  const onClick = (event) => {
    // Do nothing if it's an external link
    if (link.startsWith("http")) return;

    event.preventDefault();
    // Set the router to the new url.
    actions.router.set(link);

    // Scroll the page to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // if the menu modal is open, close it so it doesn't block rendering
    if (state.theme.isMobileMenuOpen) {
      actions.theme.closeMobileMenu();
    }
  };

  return (
    <a
      href={link}
      onClick={onClick}
      className={className}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  );
};

export default connect(Link);
