import { expect } from 'chai';
import { Print as PrintDll, icons } from '../src';
import Print from '../src/print';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Print DLL', () => {
	it( 'exports Print', () => {
		expect( PrintDll ).to.equal( Print );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
