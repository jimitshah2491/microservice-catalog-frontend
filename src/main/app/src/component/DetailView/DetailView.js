import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './DetailView.css';

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

export default DetailView;
