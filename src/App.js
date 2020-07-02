
import React from 'react';
import './App.scss';
import Form from './components/form/form';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Results from './components/results/results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Headers:{}, Response:{} };
  }

  handleForm = (data) => {
    this.setState({ Headers: {'Content-Type': 'application/x-www-form-urlencoded' }, Response:{data} });
  };

  render() {
    return (
      <>
        <Header />
        <Form  handler={this.handleForm} />
        <Results response={this.state.Response} headers={this.state.Headers} />
        <Footer />
      </>
    );
  }

}

export default App;
