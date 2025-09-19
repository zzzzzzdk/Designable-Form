import { useState, useContext, useMemo, useRef, MouseEvent, useEffect } from 'react'
import { VehicleModelContext } from './context'
import { Input } from 'antd'
import { brandListProps, value } from './interface'
import classNames from 'classnames'
import { isArray } from '@/utils/is'
import VirtualList from 'rc-virtual-list'

function Model(props: brandListProps) {
  const {
    prefixCls
  } = props
  const {
    maxHeight,
    noData,
    searchPlaceholder,
    modelData,
    brandValue,
    modelValue,
    onChange
  } = useContext(VehicleModelContext)

  const scrollRef = useRef<any>(null)
  const itemRefs = useRef<Map<value, HTMLElement | null>>(new Map())
  const placeholder = isArray(searchPlaceholder) ? searchPlaceholder[1] || '搜索' : searchPlaceholder
  const values = modelValue || []
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    if (values.length) {
      const value = values[0]
      const top = itemRefs.current.get(value)?.offsetTop
      if (top && scrollRef.current) {
        scrollRef.current.setScrollTop(top)
      }
    }
  }, [])

  const data = useMemo(() => {
    if (!modelData) return []
    const _brandValue = isArray(brandValue) ? (brandValue[0] || undefined) : brandValue
    const _data = modelData[_brandValue as value] || []
    return _data.filter(elem => `${elem?.v}`.toLowerCase().includes(filterText.toLowerCase()))
  }, [brandValue, modelData, filterText])

  const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleChangeFilterText = (e: any) => {
    setFilterText(e.target.value)
  }

  const handleChangeBrand = (value: value) => {
    const isActive = !values.includes(value)
    if (isActive) {
      onChange && onChange(brandValue, [...values, value], [])
    } else {
      onChange && onChange(brandValue, values.filter(elem => elem !== value), [])
    }
  }

  const handleRenderBrand = () => {
    return <div className={`${prefixCls}-column`}>
      <div className={`${prefixCls}-search`}>
        <Input
          size="mini"
          placeholder={placeholder}
          value={filterText}
          onChange={handleChangeFilterText}
        />
      </div>
      <div className={`${prefixCls}-column-list`}>
        <VirtualList
          data={data}
          height={(maxHeight || 540) - 30}
          itemHeight={40}
          itemKey={(elem, index) => `${elem.k}_${index}`}
          ref={(virtualList) => {
            if (virtualList) {
              // 保存虚拟列表实例，用于手动滚动
              scrollRef.current = virtualList
            }
          }}
        >
          {(elem, index) => {
            const { v, k } = elem
            return <div
              ref={element => {
                itemRefs.current.set(k!, element)
              }}
              className={classNames(
                `${prefixCls}-column-item`,
                {
                  [`${prefixCls}-column-item-active`]: values.includes(k)
                }
              )}
              title={v?.toString()}
              onClick={() => handleChangeBrand(k!)}
            >
              {v}
            </div>
          }}
        </VirtualList>
        {!data.length && noData}
      </div>
    </div>
  }

  return (
    <div
      className={`${prefixCls}-list`}
      onClick={handleStopPropagation}
    >
      {handleRenderBrand()}
    </div>
  )
}

export default Model
