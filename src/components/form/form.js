import React from 'react';
import './form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { method: '', url: ''};
  }
  handleUrl = (e) => {
    const url = e.target.value;
    this.setState({ url });
  };
  
  handleMethod = (e) => {
    const method = e.target.value;
    this.setState({ method });
  };

   handleSubmit = async (e) => {
     e.preventDefault();
     e.target.reset();
     if (this.state.url && this.state.method) {
       const url = this.state.url;
       const method = this.state.method;
       const raw = await fetch(url, {method: method} );
       const data = await raw.json();
       this.props.handler(data);
     }else{
       alert('missing information');
     }
   };
   // const response = await fetch(url, {
   //   method: 'POST', 
   //   headers: {'Content-Type': 'application/json'},
   // });

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

         </form>
       </>
     );
   }

}
  

  

  



export default Form;


// <div className="results">
// <h3 className ="methodOutput">{this.state.request.method}</h3>  
// <h3 className="urlOutput">{this.state.request.url} </h3>
// </div>
