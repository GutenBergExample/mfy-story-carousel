const { Component } = wp.element;

import classnames from 'classnames';
// import swiper from 'swiper';

export default class Save extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {
		const {
			align,
			block,
			copy,
			heading,
			linkText,
			linkUrl,
			stories,
		} = this.props;
		return (
			<div className={ classnames( block(), align ) }>
				<div className={ block( 'info' ).toString() }>
					<h2 className={ block( 'heading' ).toString() }>{ heading }</h2>
					<div className={ block( 'copy' ).toString() }>{ copy }</div>
					<a className={ block( 'link' ).toString() } href={ linkUrl }>
						{ linkText }
					</a>
				</div>
				<div className={ block( 'stories-container' ).toString() }>
					<div className={ block( 'stories' ).toString() }>
						{ 0 < stories.length &&
							stories.map(
								(
									{ storyImage, storyLinkText, storyLinkUrl, storyText },
									idx
								) => {
									return (
										<div
											className={ block( 'story-container' ).toString() }
											key={ idx }
											style={ { backgroundImage: `url(${ storyImage })` } }
										>
											<div className={ block( 'story' ).toString() }>
												<div className={ block( 'story-text' ).toString() }>
													{ storyText }
												</div>
												<div className={ block( 'overlay' ).toString() }>
													<div className={ block( 'overlay-text' ).toString() }>
														{ /* <a href={ storyLinkUrl }>{ storyLinkText }</a> */ }
														<a href={ storyLinkUrl }>{ 'Did This Error' }</a>
													</div>
												</div>
											</div>
										</div>
									);
								}
							) }
					</div>
					{ 1 < stories.length && (
						<div className={ block( 'buttons' ).toString() }>
							<button className={ block( 'prev-button' ).toString() }>
								{ /* <ArrowLeft className={ block( 'prev-icon' ).toString() } /> */ }
								<span className={ block( 'prev-icon' ).toString() }>&lt;</span>
							</button>
							<button className={ block( 'next-button' ).toString() }>
								{ /* <ArrowRight className={ block( 'next-icon' ).toString() } /> */ }
								<span className={ block( 'next-icon' ).toString() }>&gt;</span>
							</button>
						</div>
					) }
				</div>
			</div>
		);
	}
}
