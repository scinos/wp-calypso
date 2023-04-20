import { __ } from '@wordpress/i18n';
import { useCallback, useState } from 'react';
import FacebookPostIcon from '../icons';
import defaultAvatar from './default-avatar.png';
import type { FacebookUser } from '../../types';

import './styles.scss';

const FacebookPostHeader: React.FC< { user?: FacebookUser } > = ( { user } ) => {
	const [ avatarSrc, setAvatarSrc ] = useState< string >( user?.avatarUrl || defaultAvatar );
	const onImageError = useCallback( () => {
		if ( avatarSrc !== defaultAvatar ) {
			setAvatarSrc( defaultAvatar );
		}
	}, [ avatarSrc ] );

	return (
		<div className="facebook-preview__post-header">
			<div className="facebook-preview__post-header-content">
				<img
					className="facebook-preview__post-header-avatar"
					src={ avatarSrc }
					alt=""
					onError={ onImageError }
				/>
				<div>
					<div className="facebook-preview__post-header-name">
						{ user?.displayName ||
							// translators: name of a fictional Facebook User
							__( 'Anonymous User', 'facebook-preview' ) }
					</div>
					<div className="facebook-preview__post-header-share">
						<span className="facebook-preview__post-header-time">
							{
								// translators: temporal indication of when a post was published
								__( 'Just now', 'facebook-preview' )
							}
						</span>
						<span className="facebook-preview__post-header-dot" aria-hidden="true">
							·
						</span>
						<FacebookPostIcon name="public" />
					</div>
				</div>
			</div>
			<div className="facebook-preview__post-header-more"></div>
		</div>
	);
};

export default FacebookPostHeader;