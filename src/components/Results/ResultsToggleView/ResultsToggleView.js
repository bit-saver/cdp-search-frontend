import React from 'react';
import { func, string } from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './ResultsToggleView.css';
import '../../../assets/styles/tooltip.css';

const ResultsToggleView = props => (
  <div className="results_toggleView">
    <span tooltip="Gallery View">
      <Icon
        name="grid layout"
        data-view="gallery"
        onClick={ props.toggle }
        className={ props.currentView === 'gallery' ? 'active' : '' }
      />
    </span>
    <span tooltip="List View">
      <Icon
        name="list"
        data-view="list"
        onClick={ props.toggle }
        className={ props.currentView === 'list' ? 'active' : '' }
      />
    </span>
  </div>
);

ResultsToggleView.propTypes = {
  toggle: func,
  currentView: string
};

export default ResultsToggleView;
