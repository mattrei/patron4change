import 'isomorphic-fetch';
import axios from 'axios';

export default class {

	static getAllChangemakers() {
		return axios('/api/changemakers').then(res => {
			return res.data;
		});
	}

	static getChangemakerById(id) {
		return axios(`/api/changemakers/${id}`).then(res => {
			return res.data;
		});
	}

	static getAllUpdatesByUserId(id) {
		return axios('/api/changemakers/' + id + '/updates').then(res => {
			return res.data;
		});
	}

	static getFeaturedChangemakers(){
		return axios('/api/changemakers/featured').then(res => {
			return res.data;
		});
	}

	static getBackingsByChangemakerId(id) {
		return axios('/api/changemakers/' + id + '/backings').then(res => {
			return res.data;
		});
	}

	static search(term) {
		if (!term) {
			return Promise.resolve([]);
		}
    return axios(`/api/search?q=${term}`).then(res => {
			return res.data;
		});
	}
}
