import React from 'react';
import History from '../history/history';
import {Link} from 'react-router-dom';
import './form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { method: '', url: '', body:''};
  }
  handleUrl = (e) => {
    const url = e.target.value;
    this.setState({ url });
  };
  
  handleMethod = (e) => {
    const method = e.target.value;
    this.setState({ method });
  };

  handleBody = (e) => {
    const body = e.target.value;
    const bodyData = JSON.parse(body);
    this.setState({ body:{bodyData} });
  };

  handelHistory = (method, url, data) => {
    let historyData = JSON.stringify(data);
    this.setState({ method, url, body: { historyData } });
  };

   handleSubmit = async (e) => {
     e.preventDefault();
     e.target.reset();
     console.log('METHOD',this.state.method);
     if( (this.state.url && this.state.method==='put')||(this.state.url && this.state.method==='post')) {
       const url = this.state.url;
       const method = this.state.method;
       const dataBody =  this.state.body.bodyData;
       const raw = await fetch(url, {
         method: method,
         mode: 'cors', 
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: {
           'Content-Type': 'application/json',
         },
         redirect: 'follow',
         referrerPolicy: 'no-referrer', 
         body: JSON.stringify(dataBody),
       });
       const headers = { 'Content-Type': raw.headers.get('Content-Type') };
       const data = await raw.json();
       this.props.handler(data,headers);

     }else if(this.state.url && this.state.method==='get'){
       const url = this.state.url;
       const method = this.state.method;
       const raw = await fetch(url, {
         method: method,
         mode: 'cors', 
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: {
           'Content-Type': 'application/json',
         },
         redirect: 'follow',
         referrerPolicy: 'no-referrer', 
       });
       const headers = { 'Content-Type': raw.headers.get('Content-Type') };
       const data = await raw.json();
       this.props.handler(data,headers);
       
     }
     else if(this.state.url && this.state.method==='delete'){
       const url = this.state.url;
       const method = this.state.method;
       const raw = await fetch(url, {
         method: method,
         mode: 'cors', 
         cache: 'no-cache',
         credentials: 'same-origin',
         headers: {
           'Content-Type': 'application/json',
         },
         redirect: 'follow',
         referrerPolicy: 'no-referrer', 
       });
       this.props.handler(raw);
     }
     
     else{
       alert('missing information');
     }
   };
  
   render(){
     return (
       <>
         <form onSubmit={this.handleSubmit}>

           <div className="div">
             <input className="input" type="url" placeholder="Enter URL" onChange={this.handleUrl} />
             <button type="submit">GO!</button>
           </div>
               
           <div className="div">
             <span className="method"><input className="methodGet"  type="radio" name="method" value="get"onClick={this.handleMethod}/>GET</span>
             <span className="method" ><input type="radio" name="method" value="post"onClick={this.handleMethod}/>POST</span>
             <span className="method"><input type="radio" name="method" value="put"onClick={this.handleMethod}/>PUT</span>
             <span className="method"><input type="radio" name="method" value="delete"onClick={this.handleMethod}/>DELETE</span>
           </div>
           <textarea placeholder="Body" name="requestBody" onChange={this.handelBody}></textarea>

         </form>

         <Link to='/'>
           <History handel={this.handelHistory}/>
         </Link>
       </>
     );
   }

}
  

  

  



export default Form;


// <div className="results">
// <h3 className ="methodOutput">{this.state.request.method}</h3>  
// <h3 className="urlOutput">{this.state.request.url} </h3>
// </div>
