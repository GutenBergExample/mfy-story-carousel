const { RichText, URLInputButton } = wp.editor;

import { block } from 'bem-cn';

const b = block( 'story-carousel' );

export default function Info( props ) {
	const { copy, heading, linkText, linkUrl, setAttributes } = props;

	return (
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
	);
}
