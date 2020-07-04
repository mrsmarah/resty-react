import React from 'react';
import { Link } from 'react-router-dom';

class History extends React.Component{
  constructor(props){
    super(props);
    this.state = {history:[]};
    this.handlerClick = this.handlerClick.bind(this);
  }
  //after rendering
  componentDidMount(){
    const history = JSON.parse(localStorage.getItem('history'));
    console.log(history);
    this.setState({history});
  }

  // getting the method, url, data from the input , on click do this then pass them to the parent app
  handlerClick(e) {
    let array = e.target.value.split('  ');
    console.log(array);
    if (array[5]) {
      let method = array[1];
      let url = array[3];
      let data = array[5];
      this.props.runHandler(method,url,data);
    }
    else {
      let method = array[1];
      let url = array[3];
      this.props.runHandler(method,url); 
    }
  }

  //function that will put the method,url,body from the local storage in an input to access them on click
  getDataLocal() {
    let LocalStorage = JSON.parse(localStorage.getItem('history'));
   
    if (LocalStorage) {
      return LocalStorage.map((item, i) => {
        if (item.body) { ////replace the input in a button and li 
          let body = JSON.stringify(item.body);
          return <li key={i} >
            <input type='text' onClick={this.handlerClick} value={`method:  ${item.method}  url:  ${item.url}  body:  ${body}`} />
          </li>;
        }
        else {
          return <li key={i}>
            <input type='text'  onClick={this.handlerClick} value={`method:  ${item.method}  url:  ${item.url}`} />
          </li>;
        }
      });
    }
  }

  render(){
    return(
      <>
        <p>Choose your history then hit GO!</p>
        <ul>
          <Link to="/">{this.getDataLocal()}</Link>
        </ul>
      </>
    );
  }

}

export default History;


//<div><pre>"Response":{JSON.stringify(query.response,null,2)}</pre></div>
// {
//     this.state.history.map((query,i) => {
//         this.key = i;
//         return (<li key={this.key}>
//           <span id="methodHis">{query.method}</span> <span id="urlHis">{query.url}</span>
//           <Link to="/">{this.getDataLocal()}</Link>Run!
//         </li>);
//       })
//     }