import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Table } from 'react-bootstrap/lib';

import './DataView.css';
import DetailView from '../../component/DetailView/DetailView';
import {fetch} from '../../redux/modules/catalog';

import FontAwesome from 'react-fontawesome';
const DataView = ( props ) => {
  const {dispatch,catalogData} = props;
  let open = false;
  var initHeight = 120;
  var intval = null;

  let filterData = [{title:'Microservice Dummy Data without Server', description:'Description for Micro Service 1', url:'http://sample1.url'}];
  let Data = catalogData;
  if(null == Data){
    Data = filterData;
    fetch("api/catalog")
    .then((response)=>{
      console.log(response);
      if(response.status === 200){
        response.json().then((data)=>{
          console.log(data);
          dispatch(fetch)
        })
      }
    })
    .catch( e => console.log(e))
  }
  else{
    filterData = Data;
  }


  const slideToggle = (element) => {
    window.clearInterval(intval);
    var mdiv = document.getElementById('mdiv');
    mdiv = element;
    if(getComputedStyle(mdiv).getPropertyValue('display') === "none"){
      open = false;
    }
    else{
      open = true;
    }
    if(open) {
      mdiv.style.visibility="hidden";
      var h = mdiv.offsetHeight;
      open = false;
      intval = setInterval(function(){
        h--;
        mdiv.style.height = h + 'px';
        if(h <= 0){
          window.clearInterval(intval);
          mdiv.style.display = 'none';
        }
      }, 1
    );

  }
  else {
    mdiv.style.display = 'block';
    mdiv.style.visibility = "visible";
    h = 0;
    open = true;
    intval = setInterval(function(){
      h++;
      mdiv.style.height = "auto";
      if(h >= initHeight)
      window.clearInterval(intval);
    }, 1
  );
}
}

const header = [{title:"Title", description:"Description", url:"URL"}];

const head =["Dummy" , "Data"];
const handleArrowClick = (event) => {
  let classes = event.target.classList;
  let classToAdd = 'fa-caret-down';
  if(classes.contains('fa-caret-down')){
    classToAdd = 'fa-caret-up';
  }
  classes.remove('fa-caret-down','fa-caret-up');
  classes.add(classToAdd);
  let element = event.target.closest('tr').nextSibling;
  {slideToggle(element)};
}

let tableData = [];
tableData = filterData.map((dataItem)=>{
  return [
    <tr>
      <td> {dataItem.title} </td>
    <td> {dataItem.description}</td>
  <td> {dataItem.url}</td>
<td onClick = {handleArrowClick.bind(this)} > <FontAwesome className="caret-down" name="caret-down" size="lg" /> </td>
</tr>,
<tr className="details">
  <DetailView serviceDetails={head}/>
</tr>
];
}
);


return (
  <div className="Div-container">
    <Table responsive hover className="Data">
      <thead>
        {
          header.map((entry,idx) => (
            <tr key={idx}>
              <th>{entry.title}</th>
            <th>{entry.description}</th>
          <th>{entry.url}</th>
        <th></th>
    </tr>
  )
)
}
</thead>
<tbody>
  {tableData}
</tbody>
</Table>
</div>
);
}

const mapStateToProps = (state) => {
  return{
    catalogData : state.catalogData
  }
}

export default connect(mapStateToProps)(DataView);
