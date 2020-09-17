import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import { Row, Col, Nav, Container } from 'react-bootstrap'

//import docsA from './../docs/myApostroph/fr.md!raw';
import docsF from './../docs/myFreelance/fr.js';

const AVAILABLE_DOCS = [
  {
    id: 'myApostroph',
    data: require('./../docs/myApostroph/fr.md')
  },
  {
    id: 'myFreelance',
    data: docsF
  }
];

class DocsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, data: "" };
  }

  componentDidMount() {
    if (this.props.match.params) {
      if (this.props.match.params.docId) {
        this.fetchDoc(this.props.match.params.docId);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params) {
      if (this.props.match.params.docId) {
        if (this.props.match.params.docId !== prevProps.match.params.docId) {
          this.fetchDoc(this.props.match.params.docId);
        }
      }
    }
  }

  render() {
    const { loading, data } = this.state;

    return (
      <Container>
        { loading ? null : <ReactMarkdown source={data} /> }
      </Container>
    );
  }

  fetchDoc(docId) {
    const doc = AVAILABLE_DOCS.find(e => e.id === docId);

    if (doc) {
        fetch(doc.data).then(response => {
          response.text().then(content => {
            console.log(content);
              this.setState({ loading: false, data: content });
          });
        });
    }
  }
}

export default DocsPage;
