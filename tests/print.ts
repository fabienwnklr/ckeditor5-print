import { expect } from 'chai';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import Print from '../src/print';

describe( 'Print', () => {
	it( 'should be named', () => {
		expect( Print.pluginName ).to.equal( 'Print' );
	} );

	describe( 'init()', () => {
		let domElement: HTMLElement, editor: ClassicEditor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Print
				],
				toolbar: [
					'printButton'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load Print', () => {
			const myPlugin = editor.plugins.get( 'Print' );

			expect( myPlugin ).to.be.an.instanceof( Print );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'printButton' ) ).to.equal( true );
		} );

		it( 'should add iframe after clicking the icon', () => {
			const icon = editor.ui.componentFactory.create( 'printButton' );

			icon.fire( 'execute' );

			const iframe = document.getElementById( 'ckeditor_print_iframe' ) as HTMLIFrameElement;

			expect( iframe ).not.to.be.null;

			document.querySelector( 'print-preview-app' )?.shadowRoot?.querySelector( '#sidebar' )
				?.shadowRoot?.querySelector( 'print-preview-button-strip' )
				?.shadowRoot?.querySelector( '.controls cr-button:last-child' )
				?.dispatchEvent( new Event( 'click' ) );
		} );
	} );
} );
