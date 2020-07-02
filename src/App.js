
import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Form from './components/form/form';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Results from './components/results/results';
import History from './components/history/history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Headers:{}, Response:{}, loading:false };
  }

  handleForm = (data,headers) => {//PUT IN FORM js ///////////////////
    this.setState({ Headers: {headers}, Response:{data} });
  };

  // handelHistory = (method, url, data) => {//PUT IN FORM js ///////////////////
  //   let historyData = JSON.stringify(data);
  //   this.setState({ method, url, body: { historyData } });
  // };

  render() {
    return (
      <>
        <Header />

        <Route exact path="/">
          <Form  handler={this.handleForm} />
          <Results response={this.state.Response} headers={this.state.Headers} loading={this.state.loading} />
        </Route>

        <Route exact path="/history">
          <History />
        </Route>

        <Footer />
      </>
    );
  }

}

export default App;
