import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Table } from 'react-bootstrap/lib';

import SearchBox from '../../component/SearchBox/SearchBox'
import './DataView.css';
import DetailView from '../../component/DetailView/DetailView';
import {fetchMicroservices} from '../../redux/modules/catalog';

import FontAwesome from 'react-fontawesome';

// All the global variables
const header = [{title:"Title", description:"Description", url:"URL"}];
const head =["Dummy" , "Data"];
let open = false;
let initHeight = 120;
let intval = null;
let filterData = [
      {title:'Microservice 1', description:'Description for Micro Service 1', url:'http://sample1.url'},
      {title:'Microservice 2', description:'Description for Micro Service 2', url:'http://sample2.url'},
      {title:'Microservice 3', description:'Description for Micro Service 3', url:'http://sample3.url'},
      {title:'Microservice 4', description:'Description for Micro Service 4', url:'http://sample4.url'},
      {title:'Microservice 5', description:'Description for Micro Service 5', url:'http://sample5.url'}
    ];

// DataView is Smart component
class DataView extends React.Component {

  // Fetch Microservice data during componentDidMount. Making AJAX is done here since re-rendering is done here.
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchMicroservices)
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.catalogData.length !== this.props.catalogData.length) {
      const { dispatch } = this.props
      dispatch(fetchMicroservices)
    }
  }

  // filters the data based on the keyword provided
  handleFilterRows(keyword) {
    keyword=keyword.trim();
    if(keyword===""){
      this.setState({filterData:filterData});
      return;
    }
    let tableData = []
    let tempData = filterData;
    tableData = tempData.map(function(dataItem){
      if(dataItem.title.toUpperCase().indexOf(keyword.toUpperCase())!==-1 || dataItem.description.toUpperCase().indexOf(keyword.toUpperCase())!==-1){
        return({
          title: dataItem.title,
          description: dataItem.description,
          url: dataItem.url
        });
      }
      else{
        return undefined;
      }
    });
    this.setState({filterData:tableData})
  }

  slideToggle(element) {
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

  handleArrowClick(event) {
    let classes = event.target.classList;
    let classToAdd = 'fa-caret-down';
    if(classes.contains('fa-caret-down')){
      classToAdd = 'fa-caret-up';
    }
    classes.remove('fa-caret-down','fa-caret-up');
    classes.add(classToAdd);
    let element = event.target.closest('tr').nextSibling;
    this.slideToggle(element);
  }

  render() {
    // Get data from props. props gets data from store
    let { catalogData, loading } = this.props;

    // tableData stores the microservices catalog data
    let tableData = [];

    // populate tableData
    tableData = catalogData.map((dataItem)=>{
      return [
        <tr>
          <td> {dataItem.title} </td>
          <td> {dataItem.description}</td>
          <td> {dataItem.url}</td>
          <td onClick={this.handleArrowClick.bind(this)} > <FontAwesome className="caret-down" name="caret-down" size="lg" /> </td>
        </tr>,
        <tr className="details">
          <td colSpan="4">
            <DetailView serviceDetails={head}/>
          </td>
        </tr>
      ];
    }, this)

    // return the virtual DOM
    return (
      <div className="Div-container">
        <SearchBox filterRows={this.handleFilterRows.bind(this)} />
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
}

/**
 * Maps the Redux store state into props.
 *
 * @property  {Object} state  - The state from the Redux store.
 */
const mapStateToProps = (state) => {
  return{
    catalogData : state.catalog.catalogData,
    loading : state.catalog.loading
  }
}

export default connect(mapStateToProps)(DataView);
