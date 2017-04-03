import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Table } from 'react-bootstrap/lib';
import { LinkContainer } from 'react-router-bootstrap';

import SearchBox from '../../component/SearchBox/SearchBox'
import './DataView.css';
import DetailView from '../../component/DetailView/DetailView';
import {fetchMicroservices} from '../../redux/modules/catalog';

import FontAwesome from 'react-fontawesome';

// CatalogDataView is Smart component
const CatalogDataView = (props) => {
    const { dispatch, catalogData, loading } = props;
    let open = false;
    var initHeight = 120;
    var intval = null;

    if(catalogData.length === 0){
      dispatch(fetchMicroservices);
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

  const header = [{title:"Title", description:"Description", url:"URL", edit:"Edit"}];

  const handleArrowClick = (event) => {
    let classes = event.target.classList;
    let classToAdd = 'fa-caret-down';
    if(classes.contains('fa-caret-down')){
      classToAdd = 'fa-caret-up';
    }
    classes.remove('fa-caret-down','fa-caret-up');
    classes.add(classToAdd);
    let element = event.target.closest('tr').nextSibling;
    slideToggle(element);
  }

  // tableData stores the microservices catalog data
  let tableData = [];

  // populate tableData
  tableData = catalogData.map((dataItem)=>{
    debugger;
    let serviceDetailsArr = [
      {title: dataItem.catalog.title},
      {description: dataItem.catalog.description},
      {url: dataItem.catalog.url},
      {email: dataItem.catalog.email}
    ];
    return [
      <tr>
        <td> {dataItem.catalog.title} </td>
        <td> {dataItem.catalog.description}</td>
        <td> {dataItem.catalog.url}</td>
        <td>
          <LinkContainer to={{ pathname: '/addService', query: { id: dataItem.id } }}>
            <FontAwesome title="Edit" name="pencil-square-o" className="fa-lg" />
          </LinkContainer>
        </td>
        <td onClick={handleArrowClick.bind(this)} > <FontAwesome title="Expand/Collapse" className="caret-down" name="caret-down" size="lg" /> </td>
      </tr>,
      <tr className="details">
        <td colSpan="4">
          <DetailView serviceDetails={serviceDetailsArr}/>
        </td>
      </tr>
    ];
  }, this)

  // return the virtual DOM
  return (
    <div className="Div-container">
      <SearchBox />
      {
        loading === "LOADING" && catalogData.length<=0 &&
        <FontAwesome name="pulse fa-spinner" className="fa-4x" />
      }
      {
        loading === "LOADED" && catalogData.length>0 &&
        <Table responsive hover className="Data">
          <thead>
            {
              header.map((entry,idx) => (
                <tr key={idx}>
                  <th>{entry.title}</th>
                    <th>{entry.description}</th>
                  <th>{entry.url}</th>
                  <th>{entry.edit}</th>
                  <th></th>
                </tr>
              ))
            }
          </thead>
          { catalogData.length > 0 &&
            <tbody>
              { tableData }
            </tbody>
          }
        </Table>
      }
    </div>
  );
}

/**
 * Maps the Redux store state into props.
 *
 * @property  {Object} state  - The state from the Redux store.
 */
const mapStateToProps = (state) => {
  debugger;
  return{
    catalogData : state.catalog.catalogData,
    loading : state.catalog.loading
  }
}

export default connect(mapStateToProps)(CatalogDataView);
