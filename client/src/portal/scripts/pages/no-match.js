import React, { Component } from 'react';
import { Link } from 'react-router';


export default class NoMatch extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <p>We couldn't find that Route. <Link to="/">Go Home</Link></p>
        </div>
      </div>
    )
  }
}
