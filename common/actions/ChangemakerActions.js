import types from '../constants/ActionTypes'
import WebAPIUtils from '../utils/WebAPIUtils'

export function readAll() {
	let promise = WebAPIUtils.getAllChangemakers();
	return {
		types: [
			types.READ_ALL_CHANGEMAKERS_REQUEST,
			types.READ_ALL_CHANGEMAKERS_SUCCESS,
			types.READ_ALL_CHANGEMAKERS_ERROR
		],
		promise
	};
}

export function getFeaturedChangemakers() {
	let promise = WebAPIUtils.getFeaturedChangemakers();
	return {
		types: [
			types.GET_FEATURED_CHANGEMAKERS_REQUEST,
			types.GET_FEATURED_CHANGEMAKERS_SUCCESS,
			types.GET_FEATURED_CHANGEMAKERS_ERROR
		],
		promise
	};
}

export function getChangemakerById({changemakerId}) {
	return {
		types: [
			types.GET_CHANGEMAKER_BY_ID_REQUEST,
			types.GET_CHANGEMAKER_BY_ID_SUCCESS,
			types.GET_CHANGEMAKER_BY_ID_ERROR
		],
		changemakerId,
		promise: WebAPIUtils.getChangemakerById(changemakerId)
	};
}

export function supportChangemaker(changemakerId) {
	return {
		type: types.SUPPORT_CHANGEMAKER,
		changemakerId
	};
}

export function readAllUpdatesByUserId(id) {
	let promise = WebAPIUtils.getAllUpdatesByUserId(id);
	return {
		promise
	}
}
