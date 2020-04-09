import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import { useTransition, animated } from "react-spring";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";

const Theme = ({ state }) => {
  const transitions = useTransition(state.router.link, (link) => link, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>
      {transitions.map(({ item, props, key }) => {
        const data = state.source.get(item);
        return (
          <animated.div key={key} style={props}>
            <Absolute>
              <Body>
                <Switch>
                  <Loading when={data.isFetching} />
                  <List when={data.isArchive} />
                  <Post when={data.isPostType} />
                  <PageError when={data.isError} />
                </Switch>
              </Body>
            </Absolute>
          </animated.div>
        );
      })}
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1f38c5;
`;

const Absolute = styled.div`
  position: absolute;
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
