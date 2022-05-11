import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 21px;
  color: gray;
`;

const index: NextPage = () => {
  return <Container>hello world</Container>;
};

export default index;
