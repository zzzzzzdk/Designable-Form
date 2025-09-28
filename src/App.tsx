import {
  createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from './packages/designable-core';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// 导入无界微前端相关工具和钩子
import { useKeepAliveRouter } from './hooks/useKeepAliveRouter';
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  IDesignerComponents,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@/packages/designable-react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import koKR from 'antd/locale/ko_KR';
import { useTheme } from './theme/ThemeContext.tsx';
import {
  ArrayCards,
  ArrayTable,
  Field,
  Form,
  Input,
  NumberPicker,
  Password,
  Rate,
  Card,
  FormGrid,
  Space,
  Slider,
  Text,
  Select,
  TreeSelect,
  Cascader,
  Transfer,
  Checkbox,
  Radio,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  ObjectContainer,
  FormTab,
  FormCollapse,
  FormLayout,
  MyCustom,
  FormPlate,
  FormVehicleModel,
  ImgZoom,
  CheckableTag,
  YisaMap,
  FormButton,
} from '@/packages/designable-formily-antd';
import {
  SettingsForm,
  setNpmCDNRegistry,
} from '@/packages/designable-react-settings-form';
import { transformToSchema } from '@/packages/designable-formily-transformer';
// import { FormLayout } from '@formily/antd-v5';
import {
  PreviewWidget,
  MarkupSchemaWidget,
  ActionsWidget,
  SchemaEditorWidget,
  LogoWidget,
  ErrorBoundary,
  // createEnhancedComponent,
  // ComponentValidationRules
} from '@/widgets';

setNpmCDNRegistry();

function App() {
  useKeepAliveRouter('designable-app');
  
  // 使用React Router的useLocation钩子获取当前路由
  

  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handler(_ctx: any) {
              console.log(
                JSON.stringify(transformToSchema(engine.getCurrentTree())),
              );
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  // const handleSave = () => {
  //   console.log(JSON.stringify(transformToSchema(engine.getCurrentTree())));
  // };

  const getLocal = (key: string) => {
    const localObj = {
      'zh-cn': zhCN,
      'en-us': enUS,
      'ko-kr': koKR,
    };
    return localObj[key as keyof typeof localObj];
  };

  //   // 创建增强版组件
  // const EnhancedInput = createEnhancedComponent('Input', Input, ComponentValidationRules.Input);
  // const EnhancedSelect = createEnhancedComponent('Select', Select, ComponentValidationRules.Select);
  // const EnhancedSwitch = createEnhancedComponent('Switch', Switch, ComponentValidationRules.Switch);
  // const EnhancedRate = createEnhancedComponent('Rate', Rate, ComponentValidationRules.Rate);

  const components: IDesignerComponents = {
    Form,
    Field,
    Input,
    Rate,
    NumberPicker,
    Password,
    ArrayCards,
    ArrayTable,
    Card,
    FormGrid,
    Space,
    Slider,
    Text,
    Select,
    TreeSelect,
    Cascader,
    Transfer,
    Checkbox,
    Radio,
    DatePicker,
    TimePicker,
    Upload,
    Switch,
    ObjectContainer,
    FormTab,
    FormCollapse,
    FormLayout,
    MyCustom,
    FormPlate,
    FormVehicleModel,
    ImgZoom,
    CheckableTag,
    YisaMap,
    FormButton
  };

  // 定义应用渲染内容
  const renderAppContent = () => (
    <ConfigProvider locale={getLocal(GlobalRegistry.getDesignerLanguage())} theme={useTheme().themeConfig}>
      <Designer engine={engine} theme={useTheme().theme}>
        <StudioPanel
          logo={<LogoWidget />}
          actions={<ActionsWidget />}
          theme={useTheme().theme}
          // actions={[
          //   <Button key="save-button" onClick={handleSave}>
          //     保存
          //   </Button>,
          // ]}
        >
          <CompositePanel>
            <CompositePanel.Item title="panels.Component" icon="Component">
              <ResourceWidget
                title="业务组件"
                sources={[
                  // MyCustom,
                  FormPlate,
                  FormVehicleModel,
                  ImgZoom,
                  CheckableTag,
                  YisaMap,
                  FormButton,
                ]}
              />
              <ResourceWidget
                title="输入控件"
                sources={[
                  Input,
                  Password,
                  NumberPicker,
                  Rate,
                  Slider,
                  Select,
                  TreeSelect,
                  Cascader,
                  Transfer,
                  Checkbox,
                  Radio,
                  DatePicker,
                  DatePicker.RangePicker,
                  TimePicker,
                  TimePicker.RangePicker,
                  Upload,
                  Switch,
                  ObjectContainer,
                  // MyCustom,
                ]}
              />
              <ResourceWidget
                title="布局组件"
                sources={[
                  Card,
                  FormGrid,
                  FormTab,
                  FormLayout,
                  FormCollapse,
                  Space,
                ]}
              />
              <ResourceWidget
                title="自增组件"
                sources={[ArrayCards, ArrayTable]}
              />
              <ResourceWidget title="展示组件" sources={[Text]} />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <Workspace id="form">
            <WorkspacePanel>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget
                  use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
                />
              </ToolbarPanel>
              <ViewportPanel style={{ height: '100%' }}>
                <ViewPanel type="DESIGNABLE">
                  {() => (
                    <ErrorBoundary>
                      <ComponentTreeWidget components={components} />
                    </ErrorBoundary>
                  )}
                </ViewPanel>
                <ViewPanel type="JSONTREE" scrollable={false}>
                  {(tree, onChange) => (
                    // <div
                    //   dangerouslySetInnerHTML={{
                    //     __html: JSON.stringify(transformToSchema(tree)),
                    //   }}
                    // ></div>
                    <ErrorBoundary>
                      <SchemaEditorWidget tree={tree} onChange={onChange} />
                    </ErrorBoundary>
                  )}
                </ViewPanel>
                <ViewPanel type="MARKUP" scrollable={false}>
                  {(tree) => (
                    <ErrorBoundary>
                      <MarkupSchemaWidget tree={tree} />
                    </ErrorBoundary>
                  )}
                </ViewPanel>
                <ViewPanel type={`PREVIEW`}>
                  {(tree) => (
                    <ErrorBoundary>
                      <PreviewWidget tree={tree} />
                    </ErrorBoundary>
                  )}
                </ViewPanel>
              </ViewportPanel>
            </WorkspacePanel>
          </Workspace>
          <SettingsPanel title="panels.PropertySettings">
            <ErrorBoundary>
              <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
            </ErrorBoundary>
          </SettingsPanel>
        </StudioPanel>
      </Designer>
    </ConfigProvider>
  );
  
  // 直接渲染应用内容
  return renderAppContent();
}

export default App;
