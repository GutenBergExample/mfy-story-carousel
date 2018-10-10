// const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	BlockAlignmentToolbar,
	BlockControls,
	RichText,
	URLInputButton,
} = wp.editor;

import { block } from 'bem-cn';

import Stories from './Carousel';

const b = block( 'story-carousel' );

export default class Block extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {
		const {
			align,
			copy,
			heading,
			linkText,
			linkUrl,
			setAttributes,
			stories,
		} = this.props;

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
				<div className={ b() }>
					<Stories setAttributes={ setAttributes } stories={ stories } />
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
}
