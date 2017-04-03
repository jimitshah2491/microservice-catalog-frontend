import React from 'react';

import './DetailView.css';

/**
 * Component to display all fields of a microservice
 * @param {[type]} serviceDetails [description]
 */
const DetailView = (serviceDetails) => {
  let detailHtml = [];
  let data = serviceDetails.serviceDetails;
  let i=0;
  for(i=0;i<data.length;i++){
    let keys = Object.keys(data[i]);
    if(data[i][keys[0]] !== null){
      detailHtml.push(<div key={i}>
                          <div className="fieldKey">{keys[0]}</div>
                          <div className="fieldValue">{data[i][keys[0]]}</div>
                      </div>);
    }
  }
  return(
    <div>{detailHtml}</div>
  );
}

DetailView.displayName = 'DetailView';

export default DetailView;
