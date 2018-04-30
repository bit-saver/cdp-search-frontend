import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from 'semantic-ui-react';
import Breadcrumbs from '../../Breadcrumbs';
import config from '../../../config';
import './PrivacyPage.css';

class PrivacyPage extends Component {
  componentWillMount() {
    const cachedPrivacy = sessionStorage.getItem( 'PrivacyPage' );
    if ( cachedPrivacy ) {
      this.setState( { markdown: cachedPrivacy } );
      return;
    }

    fetch( config.PRIVACY_URL )
      .then( response => response.text() )
      .then( text => this.onFetchResult( text ) );
  }

  componentDidMount() {
    window.scrollTo( 0, 0 );
  }

  onFetchResult = ( text ) => {
    sessionStorage.setItem( 'PrivacyPage', text );
    this.setState( {
      markdown: text
    } );
  }

  render() {
    if ( this.state ) {
      const { markdown } = this.state;
      return (
        <section className="privacy">
          <Breadcrumbs />
          <Header as="h1">Privacy Policy</Header>
          <ReactMarkdown source={ markdown } />
        </section>
      );
    }
    return <div />;
  }
}

export default PrivacyPage;