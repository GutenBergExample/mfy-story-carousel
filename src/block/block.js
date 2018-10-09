/**
 * BLOCK: story-carousel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Button, PanelBody } = wp.components;
const {
	BlockAlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	URLInputButton,
} = wp.editor;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n;

import { block } from 'bem-cn';
import { toWordsOrdinal } from 'number-to-words';
import dcopy from 'deep-copy';
import pluralize from 'pluralize';
import reorder from 'array-rearrange';
import Sortable from 'react-sortablejs';
import titleCase from 'title-case';

import { Stories } from './components/Stories';

// ########  ######## ##     ##
// ##     ## ##       ###   ###
// ##     ## ##       #### ####
// ########  ######   ## ### ##
// ##     ## ##       ##     ##
// ##     ## ##       ##     ##
// ########  ######## ##     ##

const b = block( 'story-carousel' );

// import StoryCarouselSlide from './carousel-story';

import DragHandle from 'react-svg-loader!./svgs/ic-drag-handle.svg';

//    ###    ######## ######## ########  #### ########  ##     ## ######## ########  ######
//   ## ##      ##       ##    ##     ##  ##  ##     ## ##     ##    ##    ##       ##    ##
//  ##   ##     ##       ##    ##     ##  ##  ##     ## ##     ##    ##    ##       ##
// ##     ##    ##       ##    ########   ##  ########  ##     ##    ##    ######    ######
// #########    ##       ##    ##   ##    ##  ##     ## ##     ##    ##    ##             ##
// ##     ##    ##       ##    ##    ##   ##  ##     ## ##     ##    ##    ##       ##    ##
// ##     ##    ##       ##    ##     ## #### ########   #######     ##    ########  ######

const blockAttributes = {
	align: {
		type: 'string',
	},
	copy: {
		type: 'string',
	},
	heading: {
		type: 'string',
	},
	linkText: {
		type: 'string',
	},
	linkUrl: {
		type: 'string',
	},
	stories: {
		type: 'array',
		default: [],
		query: {
			storyText: {
				type: 'string',
			},
			storyImage: {
				type: 'string',
			},
			storyLinkText: {
				type: 'string',
			},
			storyLinkUrl: {
				type: 'string',
			},
		},
	},
};

// ########  ##        #######   ######  ##    ##
// ##     ## ##       ##     ## ##    ## ##   ##
// ##     ## ##       ##     ## ##       ##  ##
// ########  ##       ##     ## ##       #####
// ##     ## ##       ##     ## ##       ##  ##
// ##     ## ##       ##     ## ##    ## ##   ##
// ########  ########  #######   ######  ##    ##

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-story-carousel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'story-carousel - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'story-carousel — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	attributes: blockAttributes,

	getEditWrapperProps: attributes => {
		const { align } = attributes;
		if (
			'left' === align ||
			'right' === align ||
			'wide' === align ||
			'full' === align
		) {
			return { 'data-align': align };
		}
	},

	// ######## ########  #### ########
	// ##       ##     ##  ##     ##
	// ##       ##     ##  ##     ##
	// ######   ##     ##  ##     ##
	// ##       ##     ##  ##     ##
	// ##       ##     ##  ##     ##
	// ######## ########  ####    ##

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {object} props The properties of the block
	 *
	 * @returns {string} HTML used when editing the block
	 */
	edit: class extends Component {
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

		componentDidUpdate( prevProps ) {
			console.log( 'component did update' );
			const storyContainers = this.getStoryContainers();
			if ( prevProps.attributes.stories.length !== storyContainers.length ) {
				this.setState( { storyContainers }, () => {
					this.activateStoryContainer( storyContainers.length - 1 );
				} );
			}
		}

		render() {
			const { attributes, setAttributes } = this.props;
			const { align, copy, heading, linkText, linkUrl, stories } = attributes;

			return (
				<Fragment>
					<BlockControls>
						<BlockAlignmentToolbar
							value={ align }
							onChange={ nextAlign => {
								setAttributes( { align: nextAlign } );
							} }
						/>
					</BlockControls>
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
								{ stories.map( ( story, idx ) => (
									<li
										className={ b( 'sorting-slide' ).toString() }
										key={ idx }
										data-id={ idx }
									>
										<span className={ b( 'sorting-drag-handle' ).toString() }>
											<DragHandle
												className={ b( 'sorting-drag-handle-icon' ).toString() }
											/>
										</span>
										<span className={ b( 'sorting-story-text' ).toString() }>
											{ story.storyText && 0 < story.storyText.length ?
												story.storyText :
												`${ titleCase( toWordsOrdinal( idx + 1 ) ) } Story` }
										</span>
									</li>
								) ) }
							</Sortable>
							<Button onClick={ this.onAddStory }>Add Story</Button>
						</PanelBody>
					</InspectorControls>
					<div className={ b() }>
						<Stories
							stories={ stories }
							onRemoveStory={ this.onRemoveStory }
							onNextStory={ this.onNextStory }
							onPrevStory={ this.onPrevStory }
							setStoryAttributes={ this.setStoryAttributes }
						/>
						<div className={ b( 'info' ).toString() }>
							<RichText
								className={ b( 'heading' ).toString() }
								onChange={ nextHeading => {
									setAttributes( {
										heading: nextHeading,
									} );
								} }
								placeholder="Heading"
								tagName="h2"
								value={ heading }
							/>
							<RichText
								className={ b( 'copy' ).toString() }
								onChange={ nextCopy => {
									setAttributes( {
										copy: nextCopy,
									} );
								} }
								placeholder="Copy"
								value={ copy }
							/>
							<RichText
								className={ b( 'link' ).toString() }
								onChange={ nextLinkText => {
									setAttributes( {
										linkText: nextLinkText,
									} );
								} }
								placeholder="Link text"
								value={ linkText }
							/>
							<URLInputButton
								onChange={ nextLinkUrl => {
									setAttributes( { linkUrl: nextLinkUrl } );
								} }
								url={ linkUrl }
							/>
						</div>
					</div>
				</Fragment>
			);
		}

		//  ######  ##     ##  ######  ########  #######  ##     ##
		// ##    ## ##     ## ##    ##    ##    ##     ## ###   ###
		// ##       ##     ## ##          ##    ##     ## #### ####
		// ##       ##     ##  ######     ##    ##     ## ## ### ##
		// ##       ##     ##       ##    ##    ##     ## ##     ##
		// ##    ## ##     ## ##    ##    ##    ##     ## ##     ##
		//  ######   #######   ######     ##     #######  ##     ##

		activateStoryContainer( idx ) {
			const { storyContainers } = this.state;
			console.log( { storyContainers } );
			storyContainers.forEach( ( storyContainer, _idx ) => {
				console.log( { storyContainer, idx, _idx } );
				storyContainer.style.display = idx === _idx ? 'block' : 'none';
			} );
			this.setState( { activeIdx: idx }, () => {
				console.log( `State has been updated activeIdx = ${ idx }` );
			} );
		}

		getStoryContainers() {
			return document.querySelectorAll( `.${ b( 'story-container' ).toString() }` );
		}

		nextStoryContainerIdx() {
			const { activeIdx, storyContainers } = this.state;
			if ( 'undefined' === typeof activeIdx ) {
				console.log( 'bailing, next id = 0' );
				return 0;
			}
			const maybeNext = activeIdx + 1;
			console.log( { maybeNext } );
			return storyContainers.length <= maybeNext ? 0 : maybeNext;
		}

		onAddStory() {
			const {
				attributes: { stories },
				setAttributes,
			} = this.props;
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
			console.log( 'going to next story' );
			this.activateStoryContainer( this.nextStoryContainerIdx() );
		}

		onPrevStory() {
			console.log( 'going to prev story' );
			this.activateStoryContainer( this.prevStoryContainerIdx() );
		}

		onRemoveStory( idx ) {
			const {
				attributes: { stories },
				setAttributes,
			} = this.props;
			setAttributes( {
				stories: stories.filter( ( story, _idx ) => _idx !== idx ),
			} );
		}

		prevStoryContainerIdx() {
			const { activeIdx, storyContainers } = this.state;
			if ( 'undefined' === typeof activeIdx ) {
				console.log( 'bailing, prev id = 0' );
				return 0;
			}
			const maybePrev = activeIdx - 1;
			console.log( { maybePrev } );
			return 0 <= maybePrev ? maybePrev : storyContainers.length - 1;
		}

		setStoryAttributes( idx, nextAttributes ) {
			const {
				attributes: { stories },
				setAttributes,
			} = this.props;
			setAttributes( {
				stories: stories.map( ( story, _idx ) => {
					if ( _idx !== idx ) {
						return story;
					}
					return { ...story, ...nextAttributes };
				} ),
			} );
		}
	},

	//  ######     ###    ##     ## ########
	// ##    ##   ## ##   ##     ## ##
	// ##        ##   ##  ##     ## ##
	//  ######  ##     ## ##     ## ######
	//       ## #########  ##   ##  ##
	// ##    ## ##     ##   ## ##   ##
	//  ######  ##     ##    ###    ########

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {object} props The properties of the block
	 *
	 * @returns {string} The HTML used when rendering the block
	 */
	save: function() {
		return (
			<div>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>story-carousel</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>
					.
				</p>
			</div>
		);
	},
} );
