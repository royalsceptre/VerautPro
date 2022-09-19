import React from "react";
import CommonHeader from "../components/Header/CommonHeader";

class PublicLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CommonHeader></CommonHeader>
        <main>{this.props.children}</main>
      </React.Fragment>
    );
  }
}
export default PublicLayout;
