import React from 'react';

import './DetailView.css';

/**
 * Component to display all fields of a microservice
 * @param {[type]} serviceDetails [description]
 */
const DetailView = (serviceDetails) => {  
  let detailHtml = [];
  let data = serviceDetails;
  let keys = Object.keys(data);
  for(let i=0;i<keys.length;i++){
    if(data[keys[0]] !== null){
      detailHtml.push(<div key={i}>
                          <div className="fieldKey">{keys[i]}</div>
                          <div className="fieldValue">{data[keys[i]]}</div>
                      </div>);
    }
  }
  return(
    <div className="DetailView">{detailHtml}</div>
  );
}

DetailView.displayName = 'DetailView';

export default DetailView;
