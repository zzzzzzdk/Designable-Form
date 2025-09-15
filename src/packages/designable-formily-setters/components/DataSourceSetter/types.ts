export interface IDataSourceItem {
	label?: '';
	value?: any;
	children?: any[];
	// 当为动态数据时，使用一个占位条目携带该标记
	__dynamic__?: {
		url: string;
		method: 'GET' | 'POST' | 'PUT' | 'DELETE';
		path: string; // 例如 data/list
		labelKey: string;
		valueKey: string;
		childrenKey?: string;
		headers?: Record<string, string>;
		query?: Record<string, any>;
		body?: any;
		bodyType?: 'json' | 'form';
	};
}

export interface INodeItem {
	key: string;
	duplicateKey?: string;
	map?: { label: string; value: any }[];
	children?: INodeItem[];
}

export interface ITreeDataSource {
	dataSource: INodeItem[];
	selectedKey: string;
}
