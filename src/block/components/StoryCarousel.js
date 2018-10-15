// const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockAlignmentToolbar, BlockControls } = wp.editor;

import Stories from './Stories';
import Info from './Info';

export default class StoryCarousel extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {
		const {
			block,
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
				<div className={ block() }>
					<Info
						block={ block }
						copy={ copy }
						heading={ heading }
						linkText={ linkText }
						linkUrl={ linkUrl }
						setAttributes={ setAttributes }
					/>
					<Stories
						block={ block }
						setAttributes={ setAttributes }
						stories={ stories }
					/>
				</div>
			</Fragment>
		);
	}
}
