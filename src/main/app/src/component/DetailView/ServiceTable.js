import React from 'react';

import './DetailView.css';
/**
 * Renders the table
 */
const ServiceTable = (props) => {
  const { keyVal, tableData } = props;
  debugger;
  let trs = [];
  trs = tableData.map((url, i)=>{
    if(i===0) {
      return <tr>
               <td rowSpan={tableData.length} className="fieldKeyTable"> {keyVal} </td>
               <td className="fieldValueTable"><a>{url}</a></td>
             </tr>;
    } else {
      return <tr>
              <td className="fieldValueTable"><a>{url}</a></td>
             </tr>;
      }
  })

  return (
    <div>
      <table className="serviceTable">
        {trs}
      </table>
    </div>
  );
}

ServiceTable.displayName = 'ServiceTable'

export default ServiceTable;
