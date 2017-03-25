import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './DetailView.css';
import { Button } from 'react-bootstrap';

const DetailView = (serviceDetails) => {
  let detailHtml = [];
  let data = serviceDetails.serviceDetails;
  let i=0;
  for(i=0;i<data.length-1;i++){
    let keys = Object.keys(data[i]);
    if(keys[0] === "id" || data[i][keys[0]] === null) {
      continue;
    }
    debugger;
    detailHtml.push(<div key={i}>
                        <div className="fieldKey">{keys[0]}</div>
                        <div className="fieldValue">{data[i][keys[0]]}</div>
                    </div>);
  }
  detailHtml.push(<div className="editButton" key={i}>
                    <Button className="col-md-1 text-center" type="button" bsStyle="primary">Edit</Button>
                  </div>);
  return(
    <div>{detailHtml}</div>
  );
}

export default DetailView;
