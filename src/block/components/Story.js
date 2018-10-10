const { Component } = wp.element;
const { MediaUpload, RichText, URLInputButton } = wp.editor;
const { __ } = wp.i18n;

import { block } from 'bem-cn';

// Import SVGs
import AddImage from 'react-svg-loader!../svgs/file-picture-add.svg';
import Remove from 'react-svg-loader!../svgs/remove-2.svg';

const b = block( 'story-carousel' );

/**
 * Story Component
 */
export default class Story extends Component {
	/**
	 * @param {Object} props - The properties of the component
	 */
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {
		const { idx, stories, onRemoveStory, setStoryAttributes } = this.props;
		const { storyText, storyImage, storyLinkText, storyLinkUrl } = stories[ idx ];

		const text = (
			<div className={ b( 'story-text' ).toString() }>
				<RichText
					onChange={ nextStoryText => {
						setStoryAttributes( idx, { storyText: nextStoryText } );
					} }
					placeholder={ 'Story Text' }
					value={ storyText }
				/>
			</div>
		);

		const link = (
			<div className={ b( 'overlay' ).toString() }>
				<div className={ b( 'overlay-text' ).toString() }>
					<RichText
						onChange={ nextStoryLinkText => {
							setStoryAttributes( idx, {
								storyLinkText: nextStoryLinkText,
							} );
						} }
						placeholder={ 'Story Link Text' }
						tagName="span"
						value={ storyLinkText }
					/>
					<URLInputButton
						onChange={ nextStoryLinkUrl => {
							setStoryAttributes( idx, { storyLinkUrl: nextStoryLinkUrl } );
						} }
						url={ storyLinkUrl }
					/>
				</div>
			</div>
		);

		const imageButton = (
			<MediaUpload
				onSelect={ nextStoryImage => {
					const { sizes } = nextStoryImage;
					if ( sizes && sizes.full.url ) {
						setStoryAttributes( idx, { storyImage: sizes.full.url } );
					}
				} }
				render={ ( { open } ) => (
					<button
						className={ b( 'button-add-image' ).toString() }
						onClick={ open }
						title={ __( 'Upload or Select Image' ) }
					>
						<AddImage className={ b( 'icon-add-image' ).toString() } />
					</button>
				) }
				value={ storyImage }
			/>
		);

		const deleteButton = (
			<button
				className={ b( 'button-remove' ).toString() }
				onClick={ () => onRemoveStory( idx ) }
				title={ __( 'Remove Story' ) }
			>
				<Remove className={ b( 'icon-remove' ).toString() } />
			</button>
		);

		return (
			<div
				className={ b( 'story-container' ).toString() }
				style={ { backgroundImage: `url(${ storyImage })` } }
			>
				<div className={ b( 'story' ).toString() }>
					{ text }
					{ link }
					{ imageButton }
					{ deleteButton }
				</div>
			</div>
		);
	}
}
