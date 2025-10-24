import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createResource } from '@/packages/designable-core';
import type { DnFC } from '@/packages/designable-react';
import { TitleLocales } from '../../locales';
import TitleBehavior from '../../behaviors/Title';
// 暂时注释掉图标导入

const { Title: AntTitle } = Typography;

export interface TitleProps extends React.ComponentProps<typeof AntTitle> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  ellipsis?: boolean | {
    rows?: number;
    expandable?: boolean;
    symbol?: string;
  };
  editable?: boolean;
}

export const Title: DnFC<TitleProps> = AntTitle;

// 使用我们创建的独立Behavior
Title.Behavior = {
  ...TitleBehavior,
  designerLocales: TitleLocales,
};

Title.Resource = createResource({
  icon: 'Title',
  elements: [
    {
      componentName: 'Title',
      props: {
        children: '标题内容',
        level: 3,
      },
    },
  ],
});

// 增强Preview组件，更好地处理默认值和editable属性
export const Preview: React.FC<TitleProps> = (props) => {
  const { 
    children = '标题内容', 
    level = 3, 
    ellipsis = false, 
    editable = false,
    className,
    style,
    ...rest 
  } = props;
  
  const [content, setContent] = useState<string>(typeof children === 'string' ? children : '标题内容');
  const [isEditing, setIsEditing] = useState(false);
  
  // 当外部children变化时更新内部状态
  useEffect(() => {
    if (typeof children === 'string') {
      setContent(children);
    }
  }, [children]);
  
  // 处理编辑状态下的内容变更
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  
  // 处理编辑完成
  const handleEditComplete = () => {
    setIsEditing(false);
  };
  
  // 处理编辑取消
  const handleEditCancel = () => {
    setContent(typeof children === 'string' ? children : '标题内容');
    setIsEditing(false);
  };
  
  if (editable && isEditing) {
    return (
      <div className={className} style={style}>
        <input
          type="text"
          value={content}
          onChange={handleContentChange}
          onBlur={handleEditComplete}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleEditComplete();
            if (e.key === 'Escape') handleEditCancel();
          }}
          autoFocus
          style={{
            fontSize: `${Math.max(1.5 - level * 0.2, 0.8)}rem`,
            fontWeight: 'bold',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            padding: '4px 8px',
            outline: 'none',
            width: '100%',
          }}
        />
      </div>
    );
  }
  
  return (
    <AntTitle 
      level={level} 
      ellipsis={ellipsis}
      className={className}
      style={style}
      {...rest}
      onClick={() => editable && setIsEditing(true)}
    >
      {content}
    </AntTitle>
  );
};

export default Title;