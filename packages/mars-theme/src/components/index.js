import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import { useTransition, animated } from "react-spring";
import Switch from "@frontity/components/switch";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Page404 from "./page404.js";
import Loading from "./loading";

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

const Theme = ({ state }) => {
  const transitions = useTransition(state.router.link, link => link, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  return (
    <>
      <Head>
        <title>{state.frontity.title}</title>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>
      <Global styles={globalStyles} />
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
                  <Page404 when={data.is404} />
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
