import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import { menu } from "../../setting";

export class Header extends PureComponent {
  render() {
    return (
      <header className={ "Header" }>
        <nav>
          { menu.map((menu, index) => (
            <Link key={ menu.name } to={ menu.to }>
              { menu.name }
            </Link>
          )) }
        </nav>
      </header>
    )
  }
}
