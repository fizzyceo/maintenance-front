import React from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../Components/Common/BreadCrumb";

const PageContent = ({ children }) => {
  return (
    <main className="page-content">
      <Container fluid>
        {children}
      </Container>
    </main>
  );
};
export default PageContent;
