import { withStorageKey } from '@automattic/state-utils';
import {
	ACTIVE_PROMOTIONS_RECEIVE,
	ACTIVE_PROMOTIONS_REQUEST,
	ACTIVE_PROMOTIONS_REQUEST_SUCCESS,
	ACTIVE_PROMOTIONS_REQUEST_FAILURE,
} from 'calypso/state/action-types';
import { combineReducers, withSchemaValidation } from 'calypso/state/utils';
import { itemsSchema } from './schema';

/**
 * ActivePromotions `Reducer` function
 * root state -> state.activePromotions.items =>
 * [ '', '', '', ... '' ]
 *
 * @param {Object} state - current state
 * @param {Object} action - activePromotions action
 * @returns {Object} updated state
 */
export const items = withSchemaValidation( itemsSchema, ( state = [], action ) => {
	switch ( action.type ) {
		case ACTIVE_PROMOTIONS_RECEIVE:
			return [ ...action.activePromotions ];
	}

	return state;
} );

/**
 * `Reducer` function which handles request/response actions
 * to/from WP REST-API
 *
 * @param {Object} state - current state
 * @param {Object} action - activePromotions action
 * @returns {Object} updated state
 */
export const requesting = ( state = false, action ) => {
	switch ( action.type ) {
		case ACTIVE_PROMOTIONS_REQUEST:
			return true;

		case ACTIVE_PROMOTIONS_REQUEST_SUCCESS:
		case ACTIVE_PROMOTIONS_REQUEST_FAILURE:
			return false;
	}

	return state;
};

/**
 * `Reducer` function which handles ERROR REST-API response actions
 *
 * @param {Object} state - current state
 * @param {Object} action - activePromotions action
 * @returns {Object} updated state
 */
export const error = ( state = false, action ) => {
	switch ( action.type ) {
		case ACTIVE_PROMOTIONS_REQUEST:
		case ACTIVE_PROMOTIONS_REQUEST_SUCCESS:
			return false;

		case ACTIVE_PROMOTIONS_REQUEST_FAILURE:
			return true;
	}

	return state;
};

const combinedReducer = combineReducers( {
	items,
	requesting,
	error,
} );

const activePromotionsReducer = withStorageKey( 'activePromotions', combinedReducer );
export default activePromotionsReducer;
