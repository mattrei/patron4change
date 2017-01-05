import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SearchActions from '../actions/SearchActions';
import { fetchNeeds } from '../utils/fetchComponentData';

import Search from '../components/Search';

export class SearchContainer extends Component {

	static needs = [
	];

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		term: PropTypes.string.isRequired
	}

	constructor(props, context) {
		super(props, context);
		this.actions = bindActionCreators(SearchActions, props.dispatch);
	}

	componentDidMount() {
		fetchNeeds( SearchContainer.needs, this.props )
	}

	render() {
	  const {term} = this.props;
	  return <Search title="patron4change"
			hint="Suche nach Namen, Projekten, Bereichen ..."
			term={term}
			onSearch={this.actions.search} />;
	}
}

export default connect( (state/* , ownProps */) => ({
	term: state.search.term
}) )(SearchContainer);
