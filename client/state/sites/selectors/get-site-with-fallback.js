import { getCurrentUserSiteCount } from 'calypso/state/current-user/selectors';
import getPrimarySiteId from 'calypso/state/selectors/get-primary-site-id';
import { getSite } from 'calypso/state/sites/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';

/**
 * Gets currently selected site or, if that isn't available and the user has
 * just one site, returns the user's primary site as a fallback
 *
 * @param {Object} state Global state tree
 * @returns {?Object} Site
 */
export default function getSelectedSiteWithFallback( state ) {
	let siteId = getSelectedSiteId( state );
	if ( ! siteId && 1 === getCurrentUserSiteCount( state ) ) {
		siteId = getPrimarySiteId( state );
	}
	return getSite( state, siteId );
}
