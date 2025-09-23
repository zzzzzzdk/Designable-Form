import React, { useState, useEffect } from 'react';
import VehicleModel from './VehicleModel';
import type {
  VehicleModelProps,
  brandProps,
  modelProps,
  yearProps,
} from './interface';

interface FormVehicleModelWrapperProps
  extends Omit<
    VehicleModelProps,
    'brandData' | 'allBrandData' | 'hotBrands' | 'modelData' | 'yearData'
  > {
  // 预览模式控制
  previewMode?: boolean; // 是否在预览模式下，为true时才请求数据

  // 接口配置
  bmyApi?: string; // 获取品牌/型号/年款数据的接口地址
  hotBrandApi?: string; // 获取热门品牌的接口地址

  // 请求选项
  requestHeaders?: Record<string, string>;
  requestTimeout?: number;
  requestRetryCount?: number;
  requestRetryDelay?: number;

  // 数据转换函数
  brandTransformer?: (data: any) => { [key: string | number]: brandProps };
  modelTransformer?: (data: any) => { [key: string | number]: modelProps[] };
  yearTransformer?: (data: any) => { [key: string | number]: yearProps[] };
  hotBrandTransformer?: (data: any) => (string | number)[];
  allBrandTransformer?: (data: any) => Array<string[]>;
}

function FormVehicleModelWrapper(props: FormVehicleModelWrapperProps) {
  const {
    previewMode = false,
    // 直接属性
    bmyApi = 'http://localhost:3002/api/pdm/v1/common/bmy',
    hotBrandApi = 'http://localhost:3002/api/pdm/v1/common/hot-brands',
    requestHeaders,
    requestTimeout,
    requestRetryCount,
    requestRetryDelay,
    brandTransformer,
    modelTransformer,
    yearTransformer,
    hotBrandTransformer,
    allBrandTransformer,

    loading: propsLoading,
    onFocus,
    onBlur,
    onChange,
    ...restProps
  } = props;

  // 数据状态
  const [brandData, setBrandData] = useState<{
    [key: string | number]: brandProps;
  }>({});
  const [modelData, setModelData] = useState<{
    [key: string | number]: modelProps[];
  }>({});
  const [yearData, setYearData] = useState<{
    [key: string | number]: yearProps[];
  }>({});
  const [hotBrands, setHotBrands] = useState<(string | number)[]>([]);
  const [allBrandData, setAllBrandData] = useState<Array<string[]>>([]);

  // 加载和错误状态
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 默认请求头
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...requestHeaders,
  };

  // 默认数据转换函数
  const defaultBrandTransformer = (
    data: any,
  ): { [key: string | number]: brandProps } => {
    if (!data || typeof data !== 'object') return {};
    return data;
  };

  const defaultModelTransformer = (
    data: any,
  ): { [key: string | number]: modelProps[] } => {
    if (!data || typeof data !== 'object') return {};
    return data;
  };

  const defaultYearTransformer = (
    data: any,
  ): { [key: string | number]: yearProps[] } => {
    if (!data || typeof data !== 'object') return {};
    return data;
  };

  const defaultHotBrandTransformer = (data: any): (string | number)[] => {
    if (!Array.isArray(data)) return [];
    return data;
  };

  const defaultAllBrandTransformer = (data: any): Array<string[]> => {
    if (!Array.isArray(data)) return [];
    return data;
  };

  // 使用提供的转换函数或默认函数
  const resolvedBrandTransformer = brandTransformer || defaultBrandTransformer;
  const resolvedModelTransformer = modelTransformer || defaultModelTransformer;
  const resolvedYearTransformer = yearTransformer || defaultYearTransformer;
  const resolvedHotBrandTransformer =
    hotBrandTransformer || defaultHotBrandTransformer;
  const resolvedAllBrandTransformer =
    allBrandTransformer || defaultAllBrandTransformer;

  // 带重试机制的请求函数
  const fetchWithRetry = async (
    url: string,
    options: RequestInit = {},
    retryCount = requestRetryCount || 0,
    currentAttempt = 0,
  ): Promise<any> => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        // timeout: requestTimeout || 30000
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      if (currentAttempt < retryCount) {
        const delay = requestRetryDelay || 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retryCount, currentAttempt + 1);
      }
      throw err;
    }
  };

  // 获取所有数据
  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 并行请求所有数据
      const requests = [];

      if (bmyApi) {
        requests.push(
          fetchWithRetry(bmyApi).then((res) => {
            const { brand, model, year } = res.data as any;
            setBrandData(resolvedBrandTransformer(brand));
            setModelData(resolvedModelTransformer(model));
            setYearData(resolvedYearTransformer(year));
          }),
        );
      }

      if (hotBrandApi) {
        requests.push(
          fetchWithRetry(hotBrandApi).then((res) => {
            const { brands, hotBrands } = res.data as any;
            setHotBrands(resolvedHotBrandTransformer(hotBrands));
            setAllBrandData(resolvedAllBrandTransformer(brands));
          }),
        );
      }

      // 等待所有请求完成
      await Promise.all(requests);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取数据失败');
      console.error('获取车辆数据失败:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 组件挂载时获取数据，只在预览模式下请求
  useEffect(() => {
    if (previewMode) {
      fetchAllData();
    }
  }, [
    previewMode,
    bmyApi,
    hotBrandApi,
    requestRetryCount,
    requestRetryDelay,
    requestTimeout,
    requestHeaders,
    brandTransformer,
    modelTransformer,
    yearTransformer,
    hotBrandTransformer,
    allBrandTransformer,
  ]);

  // 处理焦点事件
  const handleFocus = (e: any) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  // 处理失焦事件
  const handleBlur = (e: any) => {
    if (onBlur) {
      onBlur(e);
    }
  };

  // 处理值变化事件
  const handleChange = (
    brandValue: VehicleModelProps['brandValue'],
    modelValue: VehicleModelProps['modelValue'],
    yearValue: VehicleModelProps['yearValue'],
    extra: {
      brandData: brandProps | brandProps[] | undefined;
      modelData: modelProps[];
      yearData: yearProps[];
    },
  ) => {
    if (onChange) {
      onChange(brandValue, modelValue || [], yearValue || [], extra);
    }
  };

  return (
    <VehicleModel
      {...restProps}
      brandData={brandData}
      allBrandData={allBrandData}
      hotBrands={hotBrands}
      modelData={modelData}
      yearData={yearData}
      loading={propsLoading || isLoading}
      error={error || restProps.error}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

export default FormVehicleModelWrapper;
