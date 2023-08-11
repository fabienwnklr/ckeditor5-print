import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import ckeditor5Icon from '../theme/icons/ckeditor.svg';

export default class Print extends Plugin {
	public static get pluginName() {
		return 'Print' as const;
	}

	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Add the "printButton" to feature components.
		editor.ui.componentFactory.add( 'printButton', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Print' ),
				icon: ckeditor5Icon,
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				model.change( () => {
					const $printFrame = document.createElement( 'iframe' );

					$printFrame.srcdoc = `
					<html>
						<head>
							<title>${ document.title }</title>
							<link rel="stylesheet" href="" type="text/css">
						</head>
						<body class="ck-content">
							${ '' }
						<script>window.addEventListener( 'DOMContentLoaded', () => { window.print(); } );</script></body>
					</html>
					`;
				} );

				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
