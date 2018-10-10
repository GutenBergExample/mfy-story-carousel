// const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockAlignmentToolbar, BlockControls } = wp.editor;

import { block } from 'bem-cn';

import Stories from './Stories';
import Info from './Info';

const b = block( 'story-carousel' );

export default class StoryCarousel extends Component {
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
					<Info
						copy={ copy }
						heading={ heading }
						linkText={ linkText }
						linkUrl={ linkUrl }
						setAttributes={ setAttributes }
					/>
					<Stories setAttributes={ setAttributes } stories={ stories } />
				</div>
			</Fragment>
		);
	}
}
