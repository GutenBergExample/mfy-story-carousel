const { RichText, URLInputButton } = wp.editor;

export default function Info( props ) {
	const { block, copy, heading, linkText, linkUrl, setAttributes } = props;

	return (
		<div className={ block( 'info' ).toString() }>
			<RichText
				className={ block( 'heading' ).toString() }
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
				className={ block( 'copy' ).toString() }
				onChange={ nextCopy => {
					setAttributes( {
						copy: nextCopy,
					} );
				} }
				placeholder="Copy"
				value={ copy }
			/>
			<RichText
				className={ block( 'link' ).toString() }
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
