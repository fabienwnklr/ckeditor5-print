import type { Print } from './index';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ Print.pluginName ]: Print;
	}
}
