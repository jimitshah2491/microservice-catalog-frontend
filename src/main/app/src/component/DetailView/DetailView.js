import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './DetailView.css';

const DetailView = (serviceDetails) => {
  let detailHtml = [];
  let allKeys = Object.keys(serviceDetails);
  for(var i=0;i<allKeys.length;i++){
    var key = allKeys[i];
    detailHtml.push(
      <div key={i}>
        <div className="fieldKey">{key}</div>
        <div className="fieldValue">{serviceDetails[key]}</div>
      </div>
    );
  }
  return(
    <div>{detailHtml}</div>
  );
}

export default DetailView;
