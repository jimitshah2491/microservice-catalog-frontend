import React from 'react';

import './DetailView.css';

/**
 *
 * @param {[type]} serviceDetails
 */
const DetailView = (serviceDetails) => {
  let detailHtml = [];
  let data = serviceDetails.serviceDetails;
  for(let i=0;i<data.length-1;i+=2){
    if(data[i+1] === null) {
      continue;
    }
    detailHtml.push(<div key={i}>
                        <div className="fieldKey">{data[i]}</div>
                        <div className="fieldValue">{data[i+1]}</div>
                      </div>);
  }
  return(
    <div>{detailHtml}</div>
  );
}

export default DetailView;
