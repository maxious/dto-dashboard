import React from 'react';
import { Link } from 'react-router';


const Breadcrumbs = ({crumbs}) => {
  const depth = crumbs.length;
  return (
    <ul>
      {crumbs.map((c, idx) => (
        <li key={idx}>
          <Link to={c.path || ''} onlyActiveOnIndex={true} activeClassName="breadcrumb-active" >{c.name}</Link>
          {(idx + 1) < depth && '\u2192'}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
