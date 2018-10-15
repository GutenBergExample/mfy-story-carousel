const { Component } = wp.element;
const { MediaUpload, RichText, URLInputButton } = wp.editor;
const { __ } = wp.i18n;

// Import SVGs
import AddImage from 'react-svg-loader!../svgs/file-picture-add.svg';
import Remove from 'react-svg-loader!../svgs/remove-2.svg';

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
		const {
			block,
			idx,
			stories,
			onRemoveStory,
			setStoryAttributes,
		} = this.props;
		const { storyText, storyImage, storyLinkText, storyLinkUrl } = stories[ idx ];

		const text = (
			<div className={ block( 'story-text' ).toString() }>
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
			<div className={ block( 'overlay' ).toString() }>
				<div className={ block( 'overlay-text' ).toString() }>
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
						className={ block( 'button-add-image' ).toString() }
						onClick={ open }
						title={ __( 'Upload or Select Image' ) }
					>
						<AddImage className={ block( 'icon-add-image' ).toString() } />
					</button>
				) }
				value={ storyImage }
			/>
		);

		const deleteButton = (
			<button
				className={ block( 'button-remove' ).toString() }
				onClick={ () => onRemoveStory( idx ) }
				title={ __( 'Remove Story' ) }
			>
				<Remove className={ block( 'icon-remove' ).toString() } />
			</button>
		);

		return (
			<div
				className={ block( 'story-container' ).toString() }
				style={ { backgroundImage: `url(${ storyImage })` } }
			>
				<div className={ block( 'story' ).toString() }>
					{ text }
					{ link }
					{ imageButton }
					{ deleteButton }
				</div>
			</div>
		);
	}
}
