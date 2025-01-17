import { createSelector } from '@automattic/state-utils';
import { get } from 'lodash';
import { mergePostEdits, normalizePostForEditing } from 'calypso/state/posts/utils';

import 'calypso/state/posts/init';

/**
 * Returns an object of edited post attributes for the site ID post ID pairing.
 *
 * @param   {Object} state  Global state tree
 * @param   {number} siteId Site ID
 * @param   {number} postId Post ID
 * @returns {Object}        Post revisions
 */
export const getPostEdits = createSelector(
	( state, siteId, postId ) => {
		const postEditsLog = get( state.posts.edits, [ siteId, postId || '' ] );
		if ( ! postEditsLog ) {
			return null;
		}

		return normalizePostForEditing( mergePostEdits( ...postEditsLog ) );
	},
	( state ) => [ state.posts.edits ]
);
