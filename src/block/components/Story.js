const { Component } = wp.element;
const { MediaUpload, RichText, URLInputButton } = wp.editor;
const { __ } = wp.i18n;

// Import SVGs
import AddImageIcon from 'react-svg-loader!../svgs/file-picture-add.svg';
import RemoveIcon from 'react-svg-loader!../svgs/remove-2.svg';
import styled from 'styled-components';

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

		const StyledImageButtonWrapper = styled.div`
			button {
				background-color: blue;
				border: 0;
				height: auto;
				padding: 0;
				width: 2rem;
			}
		`;

		const StyledDeleteButtonWrapper = styled.div`
			button {
				background-color: red;
				border: 0;
				height: auto;
				padding: 0;
				width: 2rem;
			}
		`;

		return (
			<div>
				<div>
					{ text }
					{ link }
					<StyledImageButtonWrapper>
						<MediaUpload
							onSelect={ nextStoryImage => {
								const { sizes } = nextStoryImage;
								if ( sizes && sizes.full.url ) {
									setStoryAttributes( idx, { storyImage: sizes.full.url } );
								}
							} }
							render={ ( { open } ) => (
								<button onClick={ open } title={ __( 'Upload or Select Image' ) }>
									<AddImageIcon />
								</button>
							) }
							value={ storyImage }
						/>
					</StyledImageButtonWrapper>
					<StyledDeleteButtonWrapper>
						<button
							onClick={ () => onRemoveStory( idx ) }
							title={ __( 'Remove Story' ) }
						>
							<RemoveIcon />
						</button>
					</StyledDeleteButtonWrapper>
				</div>
			</div>
		);
	}
}
