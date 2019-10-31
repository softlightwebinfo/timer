import React, { PureComponent } from "react";

export class Flex extends PureComponent {
  render() {
    return (
      <div className={ "Flex" }>
        { this.props.children }
      </div>
    )
  }
}
