import React from 'react';
import { Flex } from '@/packages/designable-layout-antd/components/Flex';

export const TestFlexComponent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Flex组件测试</h2>
      <Flex direction="horizontal" justify="center" align="center" style={{ background: '#f0f0f0', padding: '20px' }}>
        <div style={{ background: '#1890ff', color: 'white', padding: '10px', margin: '5px' }}>项目1</div>
        <div style={{ background: '#52c41a', color: 'white', padding: '10px', margin: '5px' }}>项目2</div>
        <div style={{ background: '#faad14', color: 'white', padding: '10px', margin: '5px' }}>项目3</div>
      </Flex>
    </div>
  );
};