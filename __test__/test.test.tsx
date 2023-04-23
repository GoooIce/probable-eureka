import Navbar from "../app/navbar";

// 导入相关库
import React from 'react';
import { render, screen } from '@testing-library/react';

// 测试 Navbar 组件
describe('测试 Navbar', () => {
  test('Navbar 渲染正常', () => {
    render(<Navbar user={undefined} />);
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });
});