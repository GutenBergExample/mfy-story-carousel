import { block } from 'bem-cn';

import { Story } from './Story';

import ArrowLeft from 'react-svg-loader!../svgs/arrow-left.svg';
import ArrowRight from 'react-svg-loader!../svgs/arrow-right.svg';

const b = block( 'story-carousel' );

export const Stories = ( {
	onNextStory,
	onPrevStory,
	onRemoveStory,
	setStoryAttributes,
	stories,
} ) => {
	if ( 0 === stories.length ) {
		return;
	}

	return (
		<div className={ b( 'stories-container' ).toString() }>
			<div className={ b( 'stories' ).toString() }>
				{ stories.map( ( story, idx ) => (
					<Story
						key={ idx }
						idx={ idx }
						stories={ stories }
						setStoryAttributes={ setStoryAttributes }
						onRemoveStory={ onRemoveStory }
					/>
				) ) }
			</div>
			<div className={ b( 'buttons' ).toString() }>
				<button className={ b( 'prev-button' ).toString() } onClick={ onPrevStory }>
					<ArrowLeft className={ b( 'prev-icon' ).toString() } />
				</button>
				<button className={ b( 'next-button' ).toString() } onClick={ onNextStory }>
					<ArrowRight className={ b( 'next-icon' ).toString() } />
				</button>
			</div>
		</div>
	);
};
