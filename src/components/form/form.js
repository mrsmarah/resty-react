import React from 'react';
import './form.scss';

class Form extends React.Component {
  history=[];
  constructor(props) {
    super(props);
    this.state = { method: '', url: '', body:''};
    if(!JSON.parse(localStorage.getItem('history'))){
      localStorage.setItem('history', JSON.stringify(this.history));
    }
  }
  //watch the change of the url input
  handleUrl = (e) => {
    const url = e.target.value;
    this.setState({ url });
  };
  //watch the radio button change
  handleMethod = (e) => {
    const method = e.target.value;
    this.setState({ method });
  };
  //watch the body text area input
  handleBody = (e) => {
    const body = e.target.value;
    const bodyData = JSON.parse(body);
    this.setState({ body:{bodyData} });
  };
  
  //when submit the form
  handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    // if there is any props coming from history 
    if(this.props.method && this.props.url && this.props.body.bodyData){
      let method = this.props.method;
      let url = this.props.url;
      let body = this.props.body.bodyData;
      this.state.method = method;
      this.state.url = url;
      this.state.body = {data: JSON.parse(body)};
    }
    else if(this.props.method && this.props.url){
      let method = this.props.method;
      let url = this.props.url;
      this.state.method = method;
      this.state.url = url;
    }
    console.log('METHOD',this.state.method);
    //fetch data coming from history if any , or fetch data coming from the form directly
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
      this.history = JSON.parse(localStorage.getItem('history'));
      this.history.push({url:url, method: method, response: data });
      localStorage.setItem('history', JSON.stringify(this.history));
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
      // if(localStorage){
      this.history = JSON.parse(localStorage.getItem('history'));
      this.history.push({url:url, method: method, response: data });

      // }

      localStorage.setItem('history', JSON.stringify(this.history));
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
      this.history = JSON.parse(localStorage.getItem('history'));
      this.history.push({url:url, method: method, response: raw });
      localStorage.setItem('history', JSON.stringify(this.history));
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
            <input className="input" name="urlInput" type="url" placeholder="Enter URL" onChange={this.handleUrl} />
            <button type="submit">GO!</button>
          </div>
               
          <div className="div">
            <span className="method"><input className="methodGet"  type="radio" name="method" value="get"onClick={this.handleMethod}/>GET</span>
            <span className="method" ><input type="radio" name="method" value="post"onClick={this.handleMethod}/>POST</span>
            <span className="method"><input type="radio" name="method" value="put" onClick={this.handleMethod}/>PUT</span>
            <span className="method"><input type="radio" name="method" value="delete"onClick={this.handleMethod}/>DELETE</span>
          </div>

          <textarea placeholder="Body" name="requestBody" onChange={this.handelBody}></textarea>

        </form>
      </>
    );
  }

}
  
export default Form;
