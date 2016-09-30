import React, { Component } from 'react';
import { Link } from 'react-router';

import Breadcrumbs from './../components/breadcrumbs';


export default class NoMatch extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <p>We couldn't find that Route. <Link to="/">Go Home</Link></p>
          </div>
        </div>
      </div>
    )
  }
}
