import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { createResource } from '@/packages/designable-core';
import type { DnFC } from '@/packages/designable-react';
import { ParagraphLocales } from '../../locales';
import ParagraphBehavior from '../../behaviors/Paragraph';
// 暂时注释掉图标导入

const { Paragraph: AntParagraph } = Typography;

export interface ParagraphProps extends React.ComponentProps<typeof AntParagraph> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ellipsis?: boolean | { rows: number; expandable?: boolean; symbol?: string };
  editable?: boolean;
  copyable?: boolean | { text?: string; onCopy?: () => void; icon?: React.ReactNode };
}

export const Paragraph: DnFC<ParagraphProps> = AntParagraph;

// 使用我们创建的独立Behavior
Paragraph.Behavior = {
  ...ParagraphBehavior,
  designerLocales: ParagraphLocales,
};

Paragraph.Resource = createResource({
  icon: 'Paragraph',
  elements: [
    {
      componentName: 'Paragraph',
      props: {
        children: '这是一段默认文本内容',
      },
    },
  ],
});

// 增强Preview组件，更好地处理默认值、editable和copyable属性
export const Preview: React.FC<ParagraphProps> = (props) => {
  const { 
    children = '这是一段默认文本内容', 
    className,
    style,
    ellipsis = false,
    editable = false,
    copyable = false,
    ...rest 
  } = props;
  
  const [content, setContent] = useState<string>(typeof children === 'string' ? children : '这是一段默认文本内容');
  const [isEditing, setIsEditing] = useState(false);
  
  // 当外部children变化时更新内部状态
  useEffect(() => {
    if (typeof children === 'string') {
      setContent(children);
    }
  }, [children]);
  
  // 处理编辑状态下的内容变更
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  
  // 处理编辑完成
  const handleEditComplete = () => {
    setIsEditing(false);
  };
  
  // 处理编辑取消
  const handleEditCancel = () => {
    setContent(typeof children === 'string' ? children : '这是一段默认文本内容');
    setIsEditing(false);
  };
  
  if (editable && isEditing) {
    return (
      <div className={className} style={style}>
        <textarea
          value={content}
          onChange={handleContentChange}
          onBlur={handleEditComplete}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) handleEditComplete();
            if (e.key === 'Escape') handleEditCancel();
          }}
          autoFocus
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            padding: '8px 12px',
            outline: 'none',
            width: '100%',
            minHeight: '80px',
            resize: 'vertical',
          }}
        />
      </div>
    );
  }
  
  // 配置copyable属性
  const copyableConfig = typeof copyable === 'object' 
    ? { ...copyable, text: copyable.text || content }
    : copyable ? { text: content } : false;
  
  return (
    <AntParagraph 
      className={className} 
      style={style} 
      ellipsis={ellipsis}
      copyable={copyableConfig}
      {...rest}
      onClick={() => editable && !isEditing && setIsEditing(true)}
    >
      {content}
    </AntParagraph>
  );
};

export default Paragraph;