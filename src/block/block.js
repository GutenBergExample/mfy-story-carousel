/**
 * BLOCK: story-carousel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import EditBlock from './components/Block';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { __ } = wp.i18n;

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
	title: __( 'Story Carousel' ), // Block title.
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
	edit: function( props ) {
		const {
			attributes: { align, copy, heading, linkText, linkUrl, stories },
			setAttributes,
		} = props;
		return (
			<EditBlock
				align={ align }
				copy={ copy }
				heading={ heading }
				linkText={ linkText }
				linkUrl={ linkUrl }
				setAttributes={ setAttributes }
				stories={ stories }
			/>
		);
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
