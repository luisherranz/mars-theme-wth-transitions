import React from "react";
import { connect, styled } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";

const List = ({ state, data }) => (
  <Container>
    {/* If the list is a taxonomy, we render a title. */}
    {data.isTaxonomy && (
      <Header>
        {data.taxonomy}: {state.source[data.taxonomy][data.id].name}
      </Header>
    )}

    {/* If the list is an author, we render a title. */}
    {data.isAuthor && (
      <Header>Author: {state.source.author[data.id].name}</Header>
    )}

    {/* Iterate over the items of the list. */}
    {data.items.map(({ type, id }) => {
      const item = state.source[type][id];
      // Render one Item component for each one.
      return <Item key={item.id} item={item} />;
    })}
    <Pagination />
  </Container>
);

export default connect(List);

const Container = styled.section`
  width: 800px;
  margin: 0;
  padding: 24px;
  list-style: none;
`;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;
