import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Button, Result } from 'antd';
import { useDesigner } from '@/packages/designable-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryComponent extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // 如果提供了 fallback 组件，则使用它
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 默认的错误展示界面
      return (
        <div style={{ padding: 20 }}>
          <Result
            status="error"
            title="组件渲染出错"
            subTitle={this.state.error?.message || '组件属性配置可能不正确，请检查配置'}
            extra={[
              <Button type="primary" key="retry" onClick={this.handleRetry}>
                重试
              </Button>,
            ]}
          >
            <div>
              <h3>错误详情:</h3>
              <pre style={{ 
                background: '#f0f0f0', 
                padding: 10, 
                borderRadius: 4,
                overflow: 'auto',
                maxHeight: 200
              }}>
                {this.state.error?.stack}
              </pre>
            </div>
          </Result>
        </div>
      );
    }

    return this.props.children;
  }
}

// 函数式组件包装器，用于在设计时提供更好的错误处理
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  const designer = useDesigner();
  
  // 在设计器中，我们可能希望看到错误以便调试
  if (designer) {
    return <ErrorBoundaryComponent {...props} />;
  }
  
  // 在预览模式下，提供更友好的错误界面
  return <ErrorBoundaryComponent {...props} />;
};