import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Table extends PureComponent {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    style: PropTypes.object,
  };

  generateCol(item, col) {
    if (col.type === "text") {
      return item[col.key];
    }
    if (col.type === "component") {
      return React.cloneElement(item[col.key]);
    }
    return item[col.key];
  }

  render() {
    return (
      <table className={ "Table" } style={ this.props.style }>
        <thead>
        <tr>
          { this.props.columns.map((col, index) => (
            <th key={ col.key }>{ col.name }</th>
          )) }
        </tr>
        </thead>
        <tbody>
        { this.props.rows.map((item, index) => (
          <tr key={ item.id }>
            {
              this.props.columns.map((col, colIndex) => (
                <td key={ col.key }>{ this.generateCol(item, col) }</td>
              ))
            }
          </tr>
        )) }
        </tbody>
      </table>
    )
  }
}
