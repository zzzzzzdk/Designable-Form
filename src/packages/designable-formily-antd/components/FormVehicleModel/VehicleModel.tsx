import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  VehicleModelProps,
  brandProps,
  modelProps,
  yearProps,
  value,
} from './interface';
import { VehicleModelContext } from './context';
import classNames from 'classnames';
import { usePrefix, useCssInJs } from '@/packages/designable-react';
import { isArray, isObject, isUndefined } from '@/utils/is';
import {
  CloseCircleOutlined,
  LoadingOutlined,
  DownOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

import { contains } from '@/utils/dom';
import Portal from '../Portal';
import Trigger from 'rc-trigger';
import BrandList from './brand';
import ModelList from './model';
import YearList from './year';
import { genFormVehicleModelStyle } from './style/styles';
// import './style/index.scss'

function VehicleModel(props: VehicleModelProps) {
  const prefixCls = usePrefix('vehicle-model');
  const { hashId, wrapSSR } = useCssInJs({
    prefix: prefixCls,
    styleFun: genFormVehicleModelStyle,
  });

 
  const {
    className,
    style,
    wrapperClassName,
    wrapperStyle,
    disabled,
    placeholder = '请选择',
    searchPlaceholder = '搜索',
    renderFormat,
    hotBrands,
    allBrandData,
    brandData: propsBrandData,
    modelData,
    yearData,
    brandValue: propsBrandValue,
    modelValue: propsModelValue,
    yearValue: propsYearValue,
    notFoundContent,
    mode,
    error,
    size,
    allowClear,
    clearIcon,
    arrowIcon,
    loading,
    loadingIcon,
    bordered = true,
    separator = '/',
    onFocus,
    onBlur,
    onChange,
    getTargetContainer,
    // 使用最近的vehicle-model-wrapper作为容器来确保正确的定位
    getTriggerContainer = () => document.querySelector(`.vehicle-model-wrapper.${hashId}`) || document.body,
    maxHeight = 540,
    destroyPopupOnHide = true,
  } = props;

  // const leftText = ["热门", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const leftText = [
    '热门',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const triggerRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const isMultiple = mode === 'multiple';
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [stateBrandValue, setStateBrandValue] = useState(propsBrandValue);
  const brandValue = 'brandValue' in props ? propsBrandValue : stateBrandValue;
  const [stateModelValue, setStateModelValue] = useState(propsModelValue);
  const modelValue = 'modelValue' in props ? propsModelValue : stateModelValue;
  const [stateYearValue, setStateYearValue] = useState(propsYearValue);
  const yearValue = 'yearValue' in props ? propsYearValue : stateYearValue;
  const isEmpty = 
    !brandValue || (isMultiple && isArray(brandValue) && !brandValue.length);

  const brandData: { [key: value]: brandProps } = useMemo(() => {
    let _brands = {};
    leftText.forEach((key) => {
      _brands[key] = {
        v: key,
        k: key,
        nodes: [],
      };
    });
    if (isArray(allBrandData)) {
      allBrandData.forEach((elem) => {
        if (elem[3] && elem[3].trim()) {
          let key = elem[3].trim()[0].toUpperCase();
          _brands[key].nodes.push({
            v: elem[1] ? elem[1] : '',
            k: elem[4],
          });
          if (isArray(hotBrands) && hotBrands.includes(elem[4])) {
            _brands['热门'].nodes.push({
              v: elem[1] ? elem[1] : '',
              k: elem[4],
            });
          }
        }
      });
      _brands['热门'].nodes.sort(
        (a: brandProps, b: brandProps) => parseInt(a.k) - parseInt(b.k),
      );
      // Object.values(allBrandData).forEach(elem => {
      //   const { value, abbr } = elem
      //   const key = abbr?.trim()[0].toUpperCase() || '未知'
      //   const { nodes } = _brands[key]
      //   if (nodes) {
      //     nodes.push(elem)
      //   } else {
      //     _brands[key] = {
      //       text: key,
      //       value: key,
      //       nodes: [elem]
      //     }
      //   }
      //   if (isArray(hotBrands) && hotBrands.includes(value)) {
      //     _brands['热门'].nodes.push(elem)
      //   }
      // })
      // _brands['热门'].nodes.sort((a: brandProps, b: brandProps) => parseInt(`${a?.value}`) - parseInt(`${b?.value}`))
    }
    return _brands;
  }, [allBrandData, hotBrands]);

  const keepFocused = (e: React.MouseEvent): void => {
    e && e.preventDefault();
  };

  const onHovered = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: string = 'enter',
  ): void => {
    if (disabled) return;
    setHovered(type === 'enter' ? true : false);
  };

  const onFocused = (
    e: React.FocusEvent<HTMLDivElement, Element>,
    type: string = 'focus',
  ): void => {
    if (disabled) return;
    setFocused(type === 'focus' ? true : false);
    if (type === 'focus') {
      onFocus && onFocus(e);
    } else {
      onBlur && onBlur(e);
    }
  };

  const handleChangeVisible = (value: boolean) => {
    if (disabled) {
      console.log('Change visible blocked by disabled state');
      return;
    }
    if (visible !== value) {
      setVisible(value);
      // 模拟Trigger组件的onPopupVisibleChange回调
      // console.log('visible', value);
    }
  };

  const handleChangeValue = (
    brandValue: value | value[] | undefined,
    modelValue: value[],
    yearValue: value[],
  ) => {
    setStateBrandValue(brandValue);
    setStateModelValue(modelValue);
    setStateYearValue(yearValue);
    const brands = handleGetBrandByValue(brandValue);
    const models = handleGetModelByValue(brandValue, modelValue);
    const years = handleGetYearByValue(modelValue, yearValue);
    if (onChange) {
      onChange(brandValue, modelValue, yearValue, {
        brandData: brands,
        modelData: models,
        yearData: years,
      });
    }
  };

  const handleGetBrandByValue = (brandValue: value | value[] | undefined) => {
    let brands: brandProps | brandProps[] | undefined = isMultiple
      ? []
      : undefined;
    if (!isUndefined(brandValue) && isObject(propsBrandData)) {
      if (isMultiple && isArray(brandValue)) {
        brands = brandValue
          .map((value) => propsBrandData[value] || null)
          .filter(Boolean);
      }
      if (!isMultiple && !isArray(brandValue)) {
        brands = propsBrandData[brandValue] || undefined;
      }
    }
    return brands;
  };

  const handleGetModelByValue = (
    brandValue: value | value[] | undefined,
    modelValue: value[],
  ) => {
    let models: modelProps[] = [];
    if (
      !isUndefined(brandValue) &&
      !isArray(brandValue) &&
      isObject(modelData) &&
      isArray(modelValue) &&
      modelValue.length
    ) {
      const _modelData = modelData[brandValue] || [];
      models = _modelData?.filter((elem) => modelValue?.includes(elem?.k));
    }
    return models;
  };

  const handleGetYearByValue = (modelValue: value[], yearValue: value[]) => {
    let years: yearProps[] = [];
    if (
      isArray(modelValue) &&
      modelValue.length === 1 &&
      isObject(yearData) &&
      isArray(yearValue)
    ) {
      const _yearData = yearData[modelValue[0]] || [];
      years = _yearData.filter((elem) => yearValue?.includes(elem?.k));
    }
    return years;
  };

  const handleRenderText = () => {
    const brands = handleGetBrandByValue(brandValue);
    const models = handleGetModelByValue(brandValue, modelValue || []);
    const years = handleGetYearByValue(modelValue || [], yearValue || []);
    if (renderFormat) {
      return renderFormat(brands, models, years);
    }
    const texts = [];
    if (isArray(brands) && brands.length > 1) {
      texts.push(`已选择${brands.length}个品牌`);
    } else {
      const brand = isArray(brands) ? brands[0] : brands;
      texts.push(brand?.v);
    }
    if (models.length > 1) {
      texts.push(`已选择${models.length}个型号`);
    } else {
      texts.push(models[0]?.v);
    }
    if (years.length > 1) {
      texts.push(`已选择${years.length}个年款`);
    } else {
      texts.push(years[0]?.v);
    }
    return texts.filter(Boolean).join(` ${separator} `);
  };

  const viewStopPropagation = (e: any) => {
    visible && e.stopPropagation();
  };

  const handleRenderContextText = () => {
    const text = handleRenderText();
    return (
      <div
        className={`${prefixCls}-view`}
        title={typeof text === 'string' ? text : undefined}
        onClick={viewStopPropagation}
      >
        {isEmpty && (
          <div className={`${prefixCls}-placeholder`}>{placeholder}</div>
        )}
        {!isEmpty && text}
      </div>
    );
  };

  const handleRenderSuffixIcon = () => {
    const icons = [
      disabled && handleRenderArrowIcon(),
      loading && handleRenderLoadingIcon(),
      !isEmpty && allowClear && hovered && handleRenderClearIcon(),
      isEmpty && handleRenderArrowIcon(),
      handleRenderArrowIcon(),
    ].filter(Boolean);
    return <div className={`${prefixCls}-suffix`}>{icons[0]}</div>;
  };

  const handleRenderLoadingIcon = () => {
    return (
      <div className={`${prefixCls}-loading-icon`}>
        {typeof loadingIcon !== 'undefined' ? loadingIcon : <LoadingOutlined />}
      </div>
    );
  };

  const handleRenderArrowIcon = () => {
    return (
      <div className={`${prefixCls}-arrow-icon`}>
        {typeof arrowIcon !== 'undefined' ? arrowIcon : <DownOutlined />}
      </div>
    );
  };

  const handleRenderClearIcon = () => {
    return (
      <div
        className={`${prefixCls}-clear-icon`}
        onClick={onClear}
        onMouseDown={keepFocused}
      >
        {typeof clearIcon !== 'undefined' ? clearIcon : <CloseCircleOutlined />}
      </div>
    );
  };

  const onClear = (e: React.MouseEvent<HTMLElement>): void => {
    e && e.stopPropagation();
    handleChangeValue(undefined, [], []);
  };

  const noData = useMemo(() => {
    return (
      notFoundContent || (
        <div className={`${prefixCls}-empty`}>
          <div className={`${prefixCls}-empty-icon`}>
            <ContainerOutlined />
          </div>
          <div className={`${prefixCls}-empty-description`}>暂无数据</div>
        </div>
      )
    );
  }, [notFoundContent]);

  const handleRenderContent = () => {
    return wrapSSR(
      <div
        ref={contentRef}
        tabIndex={disabled ? -1 : 0}
        onFocus={(e) => onFocused(e, 'focus')}
        onBlur={(e) => onFocused(e, 'blur')}
        onMouseOver={(e) => onHovered(e, 'enter')}
        onMouseLeave={(e) => onHovered(e, 'leave')}
        onClick={() => {
          if (disabled) return;
          // Scheme B: manual control of visibility
          handleChangeVisible(true);
        }}
        style={style}
        className={classNames(
          prefixCls,
          {
            [`${prefixCls}-multiple`]: isMultiple,
            [`${prefixCls}-single`]: !isMultiple,
            [`${prefixCls}-open`]: visible,
            [`${prefixCls}-size-${size}`]: size,
            [`${prefixCls}-hover`]: !disabled && !error && hovered,
            [`${prefixCls}-focused`]: visible || focused,
            [`${prefixCls}-error`]: !!error,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-no-border`]: !bordered,
          },
          className,
          hashId,
        )}
      >
        {handleRenderContextText()}
        {handleRenderSuffixIcon()}
      </div>,
    );
  };

  const vehicleModelContextValue = {
    maxHeight,
    noData,
    searchPlaceholder,
    brandData,
    modelData,
    yearData,
    brandValue,
    modelValue,
    yearValue,
    onChange: handleChangeValue,
  };

  const handleRenderTriggerContent = () => {
    return (
      <div
        className={classNames(`${prefixCls}-wrapper`, {
          [`${wrapperClassName}`]: wrapperClassName,
        }, hashId)}
        style={wrapperStyle}
      >
        <VehicleModelContext.Provider value={vehicleModelContextValue}>
          <BrandList isMultiple={isMultiple} prefixCls={prefixCls} />
          {((isArray(brandValue) && brandValue.length === 1) ||
            (!isArray(brandValue) && brandValue)) && (
            <ModelList prefixCls={prefixCls} />
          )}
          {isArray(modelValue) && modelValue.length === 1 && (
            <YearList prefixCls={prefixCls} />
          )}
        </VehicleModelContext.Provider>
      </div>
    );
  };

  useEffect(() => {
    const handleClosePortal = (e: any) => {
      if (
        !contains(triggerRef.current, e.target) &&
        !contains(contentRef.current as HTMLElement, e.target)
      ) {
        handleChangeVisible(false);
      }
    };
    if (visible && getTargetContainer) {
      document.addEventListener('mousedown', handleClosePortal);

      return () => {
        document.removeEventListener('mousedown', handleClosePortal);
      };
    }
  }, [visible, getTargetContainer]);

  // Scheme B: When using rc-trigger branch (no getTargetContainer), close on outside click via popupRef and contentRef
  useEffect(() => {
    if (!visible || getTargetContainer) return;

    if (contentRef.current && visible) {
      // 强制重新计算位置
      const triggerInstance = triggerRef.current?.getTriggerInstance?.();
      if (triggerInstance && typeof triggerInstance.forceAlign === 'function') {
        triggerInstance.forceAlign();
      }
    }
    const handleDocMouseDown = (e: any) => {
      const target = e.target as HTMLElement;
      const inContent = contains(contentRef.current as HTMLElement, target as HTMLElement);
      const inPopup = contains(popupRef.current as HTMLElement, target as HTMLElement);
      if (!inContent && !inPopup) {
        handleChangeVisible(false);
      }
    };
    document.addEventListener('mousedown', handleDocMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleDocMouseDown);
    };
  }, [visible, getTargetContainer]);


  const handleGetPortalPosition = (): any => {
    if (!getTargetContainer) return { top: 0, left: 0 };
    
    try {
      // 获取触发元素(select框)的位置信息
      const triggerRect = contentRef.current?.getBoundingClientRect() || {};
      // 获取容器元素的位置信息
      const containerRect = getTriggerContainer()?.getBoundingClientRect() || {};
      
      // 确保所有必要的位置属性都存在
      const hasValidTriggerRect = triggerRect && typeof triggerRect.top === 'number' && typeof triggerRect.left === 'number';
      const hasValidContainerRect = containerRect && typeof containerRect.top === 'number' && typeof containerRect.left === 'number';
      
      if (hasValidTriggerRect && hasValidContainerRect) {
        // 计算相对于容器的位置
        // 定位在触发元素的下方左侧对齐
        return {
          top: triggerRect.top + triggerRect.height - containerRect.top + 2, // 加2像素的间距
          left: triggerRect.left - containerRect.left,
        };
      }
      
      // 如果没有有效的位置信息，默认返回合理的位置
      console.warn('Invalid position data for vehicle model portal, using fallback position');
      return { top: 0, left: 0 };
    } catch (error) {
      console.error('Error calculating portal position:', error);
      // 出错时返回默认位置
      return { top: 0, left: 0 };
    }
  };

  if (getTargetContainer) {
    const { top, left } = handleGetPortalPosition();
    return (
      <>
        {handleRenderContent()}
        <Portal visible={visible} getContainer={getTriggerContainer}>
          <div
            ref={triggerRef}
            className={classNames(`${prefixCls}-trigger`, hashId)}
            style={{
              position: 'absolute',
              top: top + 'px',
              left: left + 'px',
              display: visible ? 'block' : 'none',
              zIndex: 1000,
            }}
          >
            {((destroyPopupOnHide && visible) || !destroyPopupOnHide) &&
              handleRenderTriggerContent()}
          </div>
        </Portal>
      </>
    );
  }

  return (
    <div className={classNames('vehicle-model-wrapper', hashId)}>
      {/* Trigger 组件调试信息 */}
      {/* <div style={{ margin: '10px', padding: '10px', backgroundColor: '#f0f0f0', fontSize: '12px' }}>
        <div>Trigger Debug Info:</div>
        <div>visible: {String(visible)}</div>
        <div>disabled: {String(disabled)}</div>
        <div>contentRef.current: {contentRef.current ? 'exists' : 'null'}</div>
        <div>prefixCls: {prefixCls}</div>
      </div> */}
      
      <Trigger
        prefixCls={`${prefixCls}-trigger`}
        // Scheme B: disable rc-trigger built-in actions; we control visibility
        action={[]}
        popupPlacement="bottomLeft"
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        getPopupContainer={getTriggerContainer}
        popupAlign={{
          points: ['tl', 'bl'],
          offset: [0, 2],
          overflow: { adjustX: 1, adjustY: 1 },
        }}
        popup={<div ref={popupRef} className={hashId}>{handleRenderTriggerContent()}</div>}
        popupVisible={visible}
        stretch=""
        getTriggerDOMNode={() => contentRef.current!}
        destroyPopupOnHide={!!destroyPopupOnHide}
      >
        {handleRenderContent()}
      </Trigger>
    </div>
  );
}

export default VehicleModel;
