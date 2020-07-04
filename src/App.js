
import React from 'react';
import { Route } from 'react-router-dom';
import Form from './components/form/form';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Results from './components/results/results';
import History from './components/history/history';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Headers:{}, Response:{}, loading:false };
  }
  // will recieve response and headers from the form submit ,then pass them to result component
  handleForm = (data,headers) => {
    this.setState({ Headers: {headers}, Response:{data} });
  };

  // recieving the url ,method ,data from the history click ,then pass them to form component
  handleRerunHistory = (method , url, data) => {
    let bodyData = JSON.stringify(data);
    this.setState({ method, url, body:{bodyData} });
  };


  render() {
    return (
      <>
        <Header />

        <Route exact path="/">
          <Form handler={this.handleForm} method={this.state.method} url={this.state.url} body={this.state.body}  />
          <Results response={this.state.Response} headers={this.state.Headers} loading={this.state.loading} />
        </Route>

        <Route exact path="/history">
          <History runHandler={this.handleRerunHistory} />
        </Route>

        <Footer />
      </>
    );
  }

}

export default App;
