import React, { Fragment, useMemo, useState } from 'react';
import cls from 'classnames';
import { Modal, Button, Tabs, Input, Select, App } from 'antd';
import { Form } from '@formily/core';
import { observable } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import {
  usePrefix,
  useTheme,
  TextWidget,
  useCssInJs,
} from '@/packages/designable-react';
import { DataSettingPanel } from './DataSettingPanel';
import { TreePanel } from './TreePanel';
import { transformDataToValue, transformValueToData } from './shared';
import { IDataSourceItem, ITreeDataSource } from './types';
import { genDataSourceSetterStyle } from './styles';

// import './styles.less'
export interface IDataSourceSetterProps {
  className?: string;
  style?: React.CSSProperties;
  onChange: (dataSource: IDataSourceItem[]) => void;
  value: IDataSourceItem[];
  allowTree?: boolean;
  allowExtendOption?: boolean;
  defaultOptionValue?: {
    label: string;
    value: any;
  }[];
  effects?: (form: Form<any>) => void;
}

// 动态数据配置的内存形态（仅在对话框中使用）
interface IDynamicConfigState {
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
}

export const DataSourceSetter: React.FC<IDataSourceSetterProps> = observer(
  (props) => {
    const { message: messageApi } = App.useApp();
    const {
      className,
      value = [],
      onChange,
      allowTree = true,
      allowExtendOption = true,
      defaultOptionValue,
      effects = () => {},
    } = props;
    const theme = useTheme();
    const prefix = usePrefix('data-source-setter');
    const { hashId, wrapSSR } = useCssInJs({
      prefix,
      styleFun: genDataSourceSetterStyle,
    });
    const [modalVisible, setModalVisible] = useState(false);
    // Tab: static | dynamic
    const [mode, setMode] = useState<'static' | 'dynamic'>(() => {
      // 如果传入的值里带有 __dynamic__ 标记，则默认进入动态
      if (Array.isArray(value) && value[0] && (value as any)[0]?.__dynamic__) {
        return 'dynamic';
      }
      return 'static';
    });
    const [dynamicConfig, setDynamicConfig] = useState<IDynamicConfigState>(
      () => {
        const maybe =
          (Array.isArray(value) && (value as any)[0]?.__dynamic__) || {};
        return {
          url: maybe.url || '',
          method: (maybe.method as any) || 'GET',
          path: maybe.path || 'data',
          labelKey: maybe.labelKey || 'label',
          valueKey: maybe.valueKey || 'value',
          childrenKey: maybe.childrenKey || 'children',
          headers: maybe.headers || {},
          query: maybe.query || {},
          body: maybe.body || undefined,
          bodyType: (maybe.bodyType as any) || 'json',
        };
      },
    );

    const treeDataSource: ITreeDataSource = useMemo(
      () =>
        observable({
          dataSource: transformValueToData(value),
          selectedKey: '',
        }),
      [value, modalVisible],
    );
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    return wrapSSR(
      <Fragment>
        <Button block onClick={openModal}>
          <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
        </Button>
        <Modal
          title={
            <TextWidget token="SettingComponents.DataSourceSetter.configureDataSource" />
          }
          width="70%"
          style={{ padding: 10 }}
          transitionName=""
          maskTransitionName=""
          open={modalVisible}
          onCancel={closeModal}
          onOk={() => {
            if (mode === 'dynamic') {
              // 表单验证，确保接口地址必填
              if (!dynamicConfig.url || dynamicConfig.url.trim() === '') {
                messageApi.error('接口地址不能为空');
                return;
              }

              // 以特殊标记形态存入 enum，供预览时解析
              const payload: any = [
                {
                  __dynamic__: {
                    url: dynamicConfig.url,
                    method: dynamicConfig.method,
                    path: dynamicConfig.path,
                    labelKey: dynamicConfig.labelKey,
                    valueKey: dynamicConfig.valueKey,
                    childrenKey: dynamicConfig.childrenKey,
                    headers: dynamicConfig.headers,
                    query: dynamicConfig.query,
                    body: dynamicConfig.body,
                    bodyType: dynamicConfig.bodyType,
                  },
                  // 添加默认的value和label属性，避免TreeSelect组件警告
                  value: '__dynamic_node__',
                  label: '动态数据源',
                },
              ];
              onChange(payload);
              closeModal();
              return;
            }
            onChange(transformDataToValue(treeDataSource.dataSource));
            closeModal();
          }}
          okText="确定"
          cancelText="取消"
        >
          <div
            className={`${cls(prefix, className, hashId)} ${cls(
              prefix + '-' + theme,
              hashId,
            )}`}
          >
            <Tabs
              activeKey={mode}
              onChange={(key) => setMode(key as 'static' | 'dynamic')}
              items={[
                {
                  key: 'static',
                  label: (
                    <TextWidget token="SettingComponents.DataSourceSetter.staticTab" />
                  ),
                },
                {
                  key: 'dynamic',
                  label: (
                    <TextWidget token="SettingComponents.DataSourceSetter.dynamicTab" />
                  ),
                },
              ]}
            />
            {mode === 'static' ? (
              <div className={`${cls(prefix + '-layout', hashId)}`}>
                <div className={`${cls(prefix + '-layout-item left', hashId)}`}>
                  <TreePanel
                    defaultOptionValue={defaultOptionValue || []}
                    allowTree={allowTree}
                    treeDataSource={treeDataSource}
                  ></TreePanel>
                </div>
                <div
                  className={`${cls(prefix + '-layout-item right', hashId)}`}
                >
                  <DataSettingPanel
                    allowExtendOption={allowExtendOption}
                    treeDataSource={treeDataSource}
                    effects={effects}
                  ></DataSettingPanel>
                </div>
              </div>
            ) : (
              <div className={`${cls(prefix + '-layout-item right', hashId)}`}>
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    flexDirection: 'column',
                    padding: 12,
                  }}
                >
                  <label>
                    <span>
                      <em>* </em>
                      <TextWidget token="SettingComponents.DataSourceSetter.url" />
                    </span>
                    <Input
                      placeholder="https://api.xxx.com/list"
                      value={dynamicConfig.url}
                      onChange={(e) =>
                        setDynamicConfig({
                          ...dynamicConfig,
                          url: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span>
                      <TextWidget token="SettingComponents.DataSourceSetter.method" />
                    </span>
                    <Select
                      value={dynamicConfig.method}
                      options={[
                        { label: 'GET', value: 'GET' },
                        { label: 'POST', value: 'POST' },
                        { label: 'PUT', value: 'PUT' },
                        { label: 'DELETE', value: 'DELETE' },
                      ]}
                      onChange={(val) =>
                        setDynamicConfig({
                          ...dynamicConfig,
                          method: val as any,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span>
                      <TextWidget token="SettingComponents.DataSourceSetter.path" />
                    </span>
                    <Input
                      placeholder="data/list"
                      value={dynamicConfig.path}
                      onChange={(e) =>
                        setDynamicConfig({
                          ...dynamicConfig,
                          path: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span>
                      <TextWidget token="SettingComponents.DataSourceSetter.labelKey" />
                    </span>
                    <Input
                      placeholder="label"
                      value={dynamicConfig.labelKey}
                      onChange={(e) =>
                        setDynamicConfig({
                          ...dynamicConfig,
                          labelKey: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span>
                      <TextWidget token="SettingComponents.DataSourceSetter.valueKey" />
                    </span>
                    <Input
                      placeholder="value"
                      value={dynamicConfig.valueKey}
                      onChange={(e) =>
                        setDynamicConfig({
                          ...dynamicConfig,
                          valueKey: e.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span>
                      <TextWidget token="SettingComponents.DataSourceSetter.childrenKey" />
                    </span>
                    <Input
                      placeholder="children"
                      value={dynamicConfig.childrenKey}
                      onChange={(e) =>
                        setDynamicConfig({
                          ...dynamicConfig,
                          childrenKey: e.target.value,
                        })
                      }
                    />
                  </label>
                  {/* <label>
										<span>
											<TextWidget token="SettingComponents.DataSourceSetter.headers" />
										</span>
										<Input.TextArea
											rows={3}
											placeholder={'{"Authorization": "Bearer ..."}'}
											value={JSON.stringify(dynamicConfig.headers || {}, null, 2)}
											onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
												try {
													const v = e.target.value ? JSON.parse(e.target.value) : {};
													setDynamicConfig({ ...dynamicConfig, headers: v });
												} catch {
													// ignore parse error
												}
											}}
										/>
									</label>
									<label>
										<span>
											<TextWidget token="SettingComponents.DataSourceSetter.query" />
										</span>
										<Input.TextArea
											rows={3}
											placeholder={'{"page":1,"size":20}'}
											value={JSON.stringify(dynamicConfig.query || {}, null, 2)}
											onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
												try {
													const v = e.target.value ? JSON.parse(e.target.value) : {};
													setDynamicConfig({ ...dynamicConfig, query: v });
												} catch {
													// ignore parse error
												}
											}}
										/>
									</label>
									<label>
										<span>
											<TextWidget token="SettingComponents.DataSourceSetter.bodyType" />
										</span>
										<Select
											style={{ width: 200 }}
											value={dynamicConfig.bodyType}
											options={[
												{ label: <TextWidget token="SettingComponents.DataSourceSetter.bodyType_json" />, value: 'json' },
												{ label: <TextWidget token="SettingComponents.DataSourceSetter.bodyType_form" />, value: 'form' },
											]}
											onChange={(val) => setDynamicConfig({ ...dynamicConfig, bodyType: val as any })}
										/>
									</label>
									<label>
										<span>
											<TextWidget token="SettingComponents.DataSourceSetter.body" />
										</span>
										<Input.TextArea
											rows={4}
											placeholder='{"status":1}'
											value={dynamicConfig.body ? (typeof dynamicConfig.body === 'string' ? dynamicConfig.body : JSON.stringify(dynamicConfig.body, null, 2)) : ''}
											onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
												let v: any = e.target.value;
												if (dynamicConfig.bodyType === 'json') {
													try { v = v ? JSON.parse(v) : undefined; } catch {
														// ignore parse error
													}
												}
												setDynamicConfig({ ...dynamicConfig, body: v });
											}}
										/>
									</label> */}
                </div>
              </div>
            )}
          </div>
        </Modal>
      </Fragment>,
    );
  },
);
