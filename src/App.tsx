import {
  createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from './packages/designable-core';
import { useEffect, useMemo } from 'react';
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
} from '@/packages/designable-formily-antd';
import {
  SettingsForm,
  setNpmCDNRegistry
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
} from '@/widgets'

setNpmCDNRegistry();

function App() {
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

  useEffect(() => {
    GlobalRegistry.setDesignerLanguage('zh-cn');
  }, []);

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
  };

  return (
    <ConfigProvider theme={useTheme().themeConfig}>
      <Designer engine={engine}>
        <StudioPanel
        logo={<LogoWidget />} actions={<ActionsWidget />}
          // actions={[
          //   <Button key="save-button" onClick={handleSave}>
          //     保存
          //   </Button>,
          // ]}
        >
          <CompositePanel>
            <CompositePanel.Item title="panels.Component" icon="Component">
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
                  MyCustom,
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
                <ViewPanel type="JSONTREE"  scrollable={false}>
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
}

export default App;
