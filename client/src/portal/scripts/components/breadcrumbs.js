import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const Breadcrumbs = ({paths}) => {
  let activePath = paths.pop();
  return (
    <ol className="breadcrumb">
      {paths.map((c, idx) => (
        <li key={idx} className="breadcrumb-item">
          <Link to={c.path || ''} onlyActiveOnIndex={true} activeClassName="active" className="a--ui-kit">{c.name}</Link>
        </li>
      ))}
      <li className="breadcrumb-item">{activePath.name}</li>
    </ol>
  );
};

Breadcrumbs.propTypes = {
  props: PropTypes.shape({
    paths: PropTypes.array.isRequired
  })
};

export default Breadcrumbs;
