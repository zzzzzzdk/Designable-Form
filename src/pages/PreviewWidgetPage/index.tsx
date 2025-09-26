import { useParams, useSearchParams } from 'react-router-dom';
import { PreviewWidget } from '@/widgets/PreviewWidget';
import { Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import { IFormilySchema } from '@/packages/designable-formily-transformer';

/**
 * PreviewWidgetPage - 供第三方导入的预览组件页面
 * 支持通过URL参数或查询参数接收表单设计数据
 * 支持跨系统通信传递id和查询接口参数
 */
export default function PreviewWidgetPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [schemaData, setSchemaData] = useState<IFormilySchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [queryUrl, setQueryUrl] = useState<string>('');

  useEffect(() => {
    const loadSchemaData = async () => {
      try {
        setLoading(true);

        // 从URL参数中获取查询接口
        const queryUrlParam = searchParams.get('queryUrl');
        if (queryUrlParam) {
          setQueryUrl(queryUrlParam);
        }

        // 方式1: 从URL参数中获取schema数据
        const schemaParam = searchParams.get('schema');
        if (schemaParam) {
          const schema = JSON.parse(
            decodeURIComponent(schemaParam),
          ) as IFormilySchema;
          setSchemaData(schema);
          return;
        }

        // 方式2: 如果有ID参数，则通过API获取数据
        if (id) {
          // 优先使用URL参数中的查询接口
          if (queryUrlParam) {
            try {
              const response = await fetch(`${queryUrlParam}?id=${id}`);
              if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
              }
              const schema = await response.json() as IFormilySchema;
              setSchemaData(schema);
              return;
            } catch (error) {
              console.error('通过查询接口获取数据失败:', error);
              message.warning('通过查询接口获取数据失败，使用默认数据');
            }
          } else {
            message.warning('暂未实现通过ID获取表单数据的API');
          }
        }

        // 默认示例数据
        const defaultSchema: IFormilySchema = {
          form: { labelCol: 6, wrapperCol: 12 },
          schema: {
            type: 'object',
            properties: {
              '5len2swebkk': {
                type: 'string',
                'x-component': 'MyCustom',
                'x-component-props': { value: '自定义内容111' },
                'x-designable-id': '5len2swebkk',
                'x-index': 0,
              },
              guh98kkab5w: {
                type: 'number',
                title: 'FormPlate',
                'x-decorator': 'FormItem',
                'x-component': 'FormPlate',
                'x-component-props': {},
                'x-decorator-props': {},
                'x-designable-id': 'guh98kkab5w',
                'x-index': 1,
              },
              welsiyi78v9: {
                type: 'string',
                title: 'FormVehicleModel',
                'x-decorator': 'FormItem',
                'x-component': 'FormVehicleModel',
                'x-component-props': {},
                'x-decorator-props': {},
                'x-designable-id': 'welsiyi78v9',
                'x-index': 2,
              },
              q1x8kq6o4e8: {
                type: 'string',
                title: 'ImgZoom',
                'x-decorator': 'FormItem',
                'x-component': 'ImgZoom',
                'x-component-props': {},
                'x-decorator-props': {},
                'x-designable-id': 'q1x8kq6o4e8',
                'x-index': 3,
              },
              rrsaar9elzo: {
                type: 'string',
                title: 'Input',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [],
                'x-component-props': {},
                'x-decorator-props': {},
                'x-designable-id': 'rrsaar9elzo',
                'x-index': 4,
              },
              oqwhh85tcgk: {
                type: 'array',
                title: '地图选择器',
                'x-decorator': 'FormItem',
                'x-component': 'YisaMap',
                'x-component-props': {},
                'x-decorator-props': {},
                'x-designable-id': 'oqwhh85tcgk',
                'x-index': 5,
              },
              jexagf6bi9i: {
                type: 'Array<string | number> | string',
                title: 'CheckableTag',
                'x-decorator': 'FormItem',
                'x-component': 'CheckableTag',
                'x-component-props': {
                  labelName: '标签选择',
                  fieldName: 'checkableTag',
                  showAsRadio: false,
                },
                enum: [
                  { value: '-1', label: '不限', cancelOther: true },
                  {
                    value: '2',
                    label: '红',
                    showStyle: 'colorBlock',
                    color: '#FF0A0E',
                    borderColor: '#FF0A0E',
                  },
                  { value: '3', label: '北', showStyle: 'icon', icon: 'bei' },
                  {
                    value: '4',
                    label: '绿',
                    showStyle: 'colorBlock',
                    color: '#65DB16',
                    borderColor: '#65DB16',
                  },
                ],
                default: ['-1'],
                'x-decorator-props': {},
                'x-designable-id': 'jexagf6bi9i',
                'x-index': 6,
              },
            },
            'x-designable-id': '27ba5j392ly',
          },
        };
        console.log('默认示例数据:', defaultSchema);
        setSchemaData(defaultSchema);
      } catch (error) {
        console.error('加载表单数据失败:', error);
        message.error('加载表单数据失败，请检查参数是否正确');
      } finally {
        setLoading(false);
      }
    };

    loadSchemaData();
  }, [id, searchParams]);
  
  if (loading) {
    return (
      <div className="preview-widget-page">
        <div className="preview-widget-page__container preview-widget-page__container--loading">
          <Spin size="large" fullscreen={false} tip="加载中...">
            <div /> {/* 需要一个子元素来使 tip 生效 */}
          </Spin>
        </div>
      </div>
    );
  }

  if (!schemaData) {
    return (
      <div className="preview-widget-page">
        <div className="preview-widget-page__container">
          <div className="preview-widget-page__card">
            <div className="preview-widget-page__card-header">
              <h3>表单预览</h3>
            </div>
            <div className="preview-widget-page__card-body">
              <div className="preview-widget-page__empty-state">
                <div className="preview-widget-page__empty-state-text">
                  未找到表单数据，请检查参数是否正确
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-widget-page">
      <div className="preview-widget-page__container">
        <div className="preview-widget-page__header">
          <div className="preview-widget-page__header-title">表单预览</div>
          <div className="preview-widget-page__header-description">
            {id ? `表单ID: ${id}` : '使用示例表单数据'}
          </div>
        </div>
        <div className="preview-widget-page__form-container">
          <PreviewWidget schema={schemaData} />
        </div>
      </div>
    </div>
  );
}
