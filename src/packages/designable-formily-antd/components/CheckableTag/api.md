# API

属性说明：

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|className|类名|string|-|-|
|style|样式|object|-|-|
|dataSource|数据源|`characterDataType[]`|`[]`|-|
|labelName|选项组描述文字|string|`-`|-|
|fieldName|字段名称|string|''|-|
|defaultValue|初始化的时候，默认选中的选项|Array<string>|[]|-|
|value|通过value控制选中|Array<string>|[]|-|
|onChange|选项变化时的回调函数|(data: CheckableTagDataType) => void|undefined|-|
|showAsRadio|单选方式|boolean|false|-|


## characterDataType

属性说明：

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|value|选项字段值|string|-|-|
|text|选项文本描述|string|-|-|
|cancelOther|选中取消其他选项|boolean|-|-|
|showStyle|选项块显示样式类型|showStyleType/string|-|-|
|color|选项块颜色，showStyle为colorBlock时生效， 例如：#FFFFFF；linear-gradient(180deg, #FBFFFC, #49F462)；|string|-|-|
|borderColor|选项块边框颜色，showStyle为colorBlock时生效|string|-|-|
|icon|选项显示的图标，showStyle为icon时生效|string/ReactNode|-|-|
|text|string|string|-|-|

## CheckableTagDataType

属性说明：

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|componentType|组件类型|string|'Checkbox'|-|
|formItemName|字段名|string|-|-|
|formItemNameText|字段描述|string|-|-|
|formItemData|选中数组|CheckableTagDataItemType[]|-|-|

## CheckableTagDataItemType

属性说明：

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|value|选项字段值|string|-|-|
|text|选项文本描述|string|-|-|