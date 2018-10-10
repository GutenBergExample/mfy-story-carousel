const { InspectorControls } = wp.editor;
const { Component, Fragment } = wp.element;
const { Button, PanelBody } = wp.components;

import { block } from 'bem-cn';

import Story from './Story';

import ArrowLeft from 'react-svg-loader!../svgs/arrow-left.svg';
import ArrowRight from 'react-svg-loader!../svgs/arrow-right.svg';

const b = block( 'story-carousel' );

import { toWordsOrdinal } from 'number-to-words';
import dcopy from 'deep-copy';
import pluralize from 'pluralize';
import reorder from 'array-rearrange';
import Sortable from 'react-sortablejs';
import titleCase from 'title-case';

import DragHandle from 'react-svg-loader!../svgs/ic-drag-handle.svg';

export default class Stories extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;

		this.state = {
			activeIdx: undefined,
			storyContainers: [],
		};

		this.activateStoryContainer = this.activateStoryContainer.bind( this );
		this.getStoryContainers = this.getStoryContainers.bind( this );
		this.nextStoryContainerIdx = this.nextStoryContainerIdx.bind( this );
		this.onAddStory = this.onAddStory.bind( this );
		this.onNextStory = this.onNextStory.bind( this );
		this.onPrevStory = this.onPrevStory.bind( this );
		this.onRemoveStory = this.onRemoveStory.bind( this );
		this.prevStoryContainerIdx = this.prevStoryContainerIdx.bind( this );
		this.setStoryAttributes = this.setStoryAttributes.bind( this );
	}

	componentDidMount() {
		this.setState( { storyContainers: this.getStoryContainers() }, () =>
			this.onNextStory()
		);
	}

	// This is mostly to "rewind" the carousel when the number of slides changes
	componentDidUpdate( prevProps ) {
		// console.log( 'component did update' );
		const storyContainers = this.getStoryContainers();
		if ( prevProps.stories.length !== storyContainers.length ) {
			this.setState( { storyContainers }, () => {
				// Go back to the first slide in the cqrousel
				this.activateStoryContainer( storyContainers.length - 1 );
			} );
		}
	}

	activateStoryContainer( idx ) {
		const { storyContainers } = this.state;
		// console.log( { storyContainers } );
		storyContainers.forEach( ( storyContainer, _idx ) => {
			// console.log( { storyContainer, idx, _idx } );
			storyContainer.style.display = idx === _idx ? 'block' : 'none';
		} );
		this.setState( { activeIdx: idx }, () => {
			// console.log( `State has been updated activeIdx = ${ idx }` );
		} );
	}

	getStoryContainers() {
		return document.querySelectorAll( `.${ b( 'story-container' ).toString() }` );
	}

	nextStoryContainerIdx() {
		const { activeIdx, storyContainers } = this.state;
		if ( 'undefined' === typeof activeIdx ) {
			// console.log( 'bailing, next id = 0' );
			return 0;
		}
		const maybeNext = activeIdx + 1;
		// console.log( { maybeNext } );
		return storyContainers.length <= maybeNext ? 0 : maybeNext;
	}

	onAddStory() {
		const { stories, setAttributes } = this.props;
		setAttributes( {
			stories: stories.concat( {
				storyText: '',
				storyImage: '',
				storyLinkText: '',
				storyLinkUrl: '',
			} ),
		} );
	}

	onNextStory() {
		// console.log( 'going to next story' );
		this.activateStoryContainer( this.nextStoryContainerIdx() );
	}

	onPrevStory() {
		// console.log( 'going to prev story' );
		this.activateStoryContainer( this.prevStoryContainerIdx() );
	}

	onRemoveStory( idx ) {
		const { stories, setAttributes } = this.props;
		setAttributes( {
			stories: stories.filter( ( story, _idx ) => _idx !== idx ),
		} );
	}

	prevStoryContainerIdx() {
		const { activeIdx, storyContainers } = this.state;
		if ( 'undefined' === typeof activeIdx ) {
			// console.log( 'bailing, prev id = 0' );
			return 0;
		}
		const maybePrev = activeIdx - 1;
		// console.log( { maybePrev } );
		return 0 <= maybePrev ? maybePrev : storyContainers.length - 1;
	}

	setStoryAttributes( idx, nextAttributes ) {
		const { stories, setAttributes } = this.props;
		const nextStories = stories.map( ( story, _idx ) => {
			if ( _idx !== idx ) {
				return story;
			}
			return { ...story, ...nextAttributes };
		} );
		setAttributes( {
			stories: nextStories,
		} );
	}

	render() {
		const { setAttributes, stories } = this.props;

		if ( 0 === stories.length ) {
			return '';
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<h2>
							{ stories.length } { pluralize( 'Story', stories.length ) }
						</h2>
						<Sortable
							className={ b( 'sorting-slides' ).toString() }
							onChange={ order => {
								// The values in the order array are strings
								// Fix it by making them integers
								const fixedOrder = order.map( num => parseInt( num, 10 ) );
								const nextStories = dcopy( stories );
								reorder( nextStories, fixedOrder );
								setAttributes( { stories: nextStories } );
							} }
							tag="ul"
						>
							{ stories.map( ( story, _idx ) => (
								<li
									className={ b( 'sorting-slide' ).toString() }
									key={ _idx }
									data-id={ _idx }
								>
									<span className={ b( 'sorting-drag-handle' ).toString() }>
										<DragHandle
											className={ b( 'sorting-drag-handle-icon' ).toString() }
										/>
									</span>
									<span className={ b( 'sorting-story-text' ).toString() }>
										{ story.storyText && 0 < story.storyText.length ?
											story.storyText :
											`${ titleCase( toWordsOrdinal( _idx + 1 ) ) } Story` }
									</span>
								</li>
							) ) }
						</Sortable>
						<Button onClick={ this.onAddStory }>Add Story</Button>
					</PanelBody>
				</InspectorControls>
				<div className={ b( 'stories-container' ).toString() }>
					<div className={ b( 'stories' ).toString() }>
						{ stories.map( ( story, idx ) => (
							<Story
								key={ idx }
								idx={ idx }
								stories={ stories }
								setAttributes={ setAttributes }
								onRemoveStory={ this.onRemoveStory }
								setStoryAttributes={ this.setStoryAttributes }
							/>
						) ) }
					</div>
					{ 1 < stories.length && (
						<div className={ b( 'buttons' ).toString() }>
							<button
								className={ b( 'prev-button' ).toString() }
								onClick={ this.onPrevStory }
							>
								<ArrowLeft className={ b( 'prev-icon' ).toString() } />
							</button>
							<button
								className={ b( 'next-button' ).toString() }
								onClick={ this.onNextStory }
							>
								<ArrowRight className={ b( 'next-icon' ).toString() } />
							</button>
						</div>
					) }
				</div>
			</Fragment>
		);
	}
}
