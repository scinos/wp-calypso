import classNames from 'classnames';
import { useStoreItemInfoContext } from '../context/store-item-info-context';
import { FeaturedItemCard } from '../featured-item-card';
import { FeaturesList } from '../features-list';
import { HeroImage } from '../hero-image';
import { ItemPrice } from '../item-price';
import { MoreInfoLink } from '../more-info-link';
import { MostPopularProps } from '../types';

import './style-most-popular.scss';

export const MostPopular: React.FC< MostPopularProps > = ( {
	className,
	heading,
	items,
	onClickMoreInfoFactory,
	siteId,
} ) => {
	const wrapperClassName = classNames( 'jetpack-product-store__most-popular', className );

	const {
		getCheckoutURL,
		getCtaLabel,
		getOnClickPurchase,
		isIncludedInPlan,
		isIncludedInPlanOrSuperseded,
		isMultisiteCompatible,
		isMultisite,
		isOwned,
		isPlanFeature,
		isSuperseded,
		isDeprecated,
		isUserPurchaseOwner,
	} = useStoreItemInfoContext();

	return (
		<div className={ wrapperClassName }>
			<h3 className="jetpack-product-store__most-popular--heading">{ heading }</h3>
			<div className="jetpack-product-store__most-popular--items">
				{ items.map( ( item ) => {
					const isItemOwned = isOwned( item );
					const isItemSuperseded = isSuperseded( item );
					const isItemDeprecated = isDeprecated( item );
					const isItemIncludedInPlanOrSuperseded = isIncludedInPlanOrSuperseded( item );
					const isItemIncludedInPlan = isIncludedInPlan( item );
					const isMultiSiteIncompatible = isMultisite && ! isMultisiteCompatible( item );

					const isCtaDisabled =
						isMultiSiteIncompatible ||
						( ( isItemOwned || isItemIncludedInPlan ) && ! isUserPurchaseOwner( item ) );

					const ctaLabel = getCtaLabel( item );

					const hideMoreInfoLink =
						isItemDeprecated || isItemOwned || isItemIncludedInPlanOrSuperseded;

					const price = (
						<ItemPrice
							isMultiSiteIncompatible={ isMultiSiteIncompatible }
							isIncludedInPlan={ isItemIncludedInPlan }
							isOwned={ isItemOwned }
							item={ item }
							siteId={ siteId }
						/>
					);

					const description = (
						<p>
							<span>{ item.featuredDescription }</span>
							<br />

							{ ! hideMoreInfoLink && (
								<MoreInfoLink item={ item } onClick={ onClickMoreInfoFactory( item ) } />
							) }
						</p>
					);

					const ctaAsPrimary = ! ( isItemOwned || isPlanFeature( item ) || isItemSuperseded );

					return (
						<div key={ item.productSlug } className="jetpack-product-store__most-popular--item">
							<FeaturedItemCard
								ctaAsPrimary={ ctaAsPrimary }
								ctaHref={ getCheckoutURL( item ) }
								ctaLabel={ ctaLabel }
								description={ description }
								hero={ <HeroImage item={ item } /> }
								isCtaDisabled={ isCtaDisabled }
								onClickCta={ getOnClickPurchase( item ) }
								price={ price }
								title={ item.displayName }
							/>
							<FeaturesList item={ item } />
						</div>
					);
				} ) }
			</div>
		</div>
	);
};