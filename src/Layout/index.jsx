import React from "react";
import CommonHeader from "../components/Header/CommonHeader";
import SearchHeaderGlobal from "../components/SearchHeader/SearchHeaderGlobal";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CommonHeader></CommonHeader>
        <SearchHeaderGlobal></SearchHeaderGlobal>
        <main>{this.props.children}</main>       
      </React.Fragment>
    );
  }
}
export default Layout;
