import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import printIcon from '../theme/icons/print.svg';
import type { PrintOptions } from '../typings/ckeditor5-print';

export default class Print extends Plugin {
	public static get pluginName() {
		return 'Print' as const;
	}

	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;
		const printOptions = editor.config.get( 'preview' ) as PrintOptions;
		const defaultOptions: PrintOptions = {
			injectCkeCSS: true
		};
		const options = { ...defaultOptions, ...printOptions };

		// Listen event for removing iframe after print
		window.addEventListener( 'message', event => {
			if ( event.data === 'removeiframe' ) {
				const $iframe = document.querySelector( '#ckeditor_print_iframe' );
				$iframe?.remove();
			}
		}, false );

		// Add the "printButton" to feature components.
		editor.ui.componentFactory.add( 'printButton', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Print' ),
				icon: printIcon,
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				model.change( () => {
					const $iframe = document.querySelector( '#ckeditor_print_iframe' );
					// If iframe exist, remove it.
					$iframe?.remove();
					const $printFrame = document.createElement( 'iframe' );
					$printFrame.id = 'ckeditor_print_iframe';

					let ckeCSS = '';
					let contentCSS = '';
					let srcCSS = '';

					if ( options?.injectCkeCSS ) {
						const ckeCss = document.querySelector(
							'style[data-cke=true]'
						);
						ckeCSS = '<style>' + ckeCss?.innerHTML + '</style>';
					}
					if ( options?.contentCSS ) {
						contentCSS = '<style>' + options.contentCSS + '</style>';
					}
					if ( options?.srcCSS ) {
						srcCSS = '<link href=' + options.srcCSS + '></style>';
					}

					const style = {
						'position': 'absolute',
						'width': '1px',
						'height': '1px',
						'margin': '-1px',
						'border': '0',
						'padding': '0',
						'white-space': 'nowrap',
						'clip-path': 'inset(100%)',
						'clip': 'rect(0 0 0 0)',
						'overflow': 'hidden'
					};

					for ( const prop in style ) {
						$printFrame.style.setProperty( prop, style[ prop as keyof typeof style ] );
					}

					document.body.appendChild( $printFrame );
					$printFrame.srcdoc = `
					<html>
						<head>
							<title>${ document.title }</title>
							${ ckeCSS }
							${ contentCSS }
							${ srcCSS }
						</head>
						<body class="ck">
							<div class="ck-content">
								${ editor.data.get() }
							</div>
							<script>
							window.addEventListener( 'DOMContentLoaded', () => { window.print(); } );
							window.addEventListener( 'afterprint', () => {
								parent.window.postMessage( 'removeiframe', '*' );
							} );
							</script>
						</body>
					</html>
					`;
				} );

				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
