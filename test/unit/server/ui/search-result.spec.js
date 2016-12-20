const {assert} = require('chai');

import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';
import { render } from 'enzyme';
import { SearchResultContainer } from '../../../../common/containers/SearchResultContainer'

// testing react compontent with shallow rendering
describe('<SearchResultContainer />', () => {

	const lukas = {
		id: 'lstanek',
		firstName: 'Lukas',
		lastName: 'Stanek',
		mission: 'Lukas Stanek travels',
		image: '//img.png',
		isBackedByMe: false
	};

	it('should list all search results', () => {
		const changemaker = Object.assign({}, lukas);
		const props = {
			results: Immutable.List([{
				changemaker,
				relevance: 1,
				section: null
			}]),
			dispatch: _.noop
		};
		const wrapper = render(<SearchResultContainer {...props} />)
		const searchResults = wrapper.find('.search-result-item');
		assert.equal(searchResults.length, 1);
	})

	it('should show a highlighted mission statement that matches the term', () => {
		const changemaker = Object.assign({}, lukas);
		const props = {
			results: Immutable.List([{
				changemaker,
				relevance: 1,
				section: { value: 'Lukas Stanek <em>travels</em>' }
			}]),
			dispatch: _.noop
		};
		const wrapper = render(<SearchResultContainer {...props} />);
		const searchResults = wrapper.find('.search-result-item');
		const subText = searchResults.find('.sub-text').html();
		assert.equal(subText, '... Lukas Stanek <em>travels</em> ...');
	})

	it('should show the mission statement itself if it wasn\'t mached with the term', () => {
		const changemaker = Object.assign({}, lukas);
		const props = {
			results: Immutable.List([{
				changemaker,
				relevance: 1,
				section: null
			}]),
			dispatch: _.noop
		};
		const wrapper = render(<SearchResultContainer {...props} />);
		const searchResults = wrapper.find('.search-result-item');
		const subText = searchResults.find('.sub-text').html();
		assert.equal(subText, 'Lukas Stanek travels');
	})
})
