import React from 'react';

import './DetailView.css';
import ServiceTable from './ServiceTable'

/**
 * Component to display all fields of a microservice
 * @param {[type]} serviceDetails [description]
 */
const DetailView = (serviceDetails) => {
  debugger;
  let detailHtml = [];
  let data = serviceDetails;
  let keys = Object.keys(data);
  for(let i=0; i<keys.length; i++){
    if(data[keys[i]] !== null && !(data[keys[i]] instanceof Array)){
      detailHtml.push(<div key={i}>
                          <div className="fieldKey">{keys[i]}</div>
                          <div className="fieldValue">{data[keys[i]]}</div>
                      </div>);
    }
    if(data[keys[i]] instanceof Array) {
      let tableObj = {
        keyVal: keys[i],
        tableData: data[keys[i]]
      }
      detailHtml.push(<ServiceTable {...tableObj} />)
    }
  }

  return(
    <div className="DetailView">{detailHtml}</div>
  );
}

DetailView.displayName = 'DetailView';

export default DetailView;
