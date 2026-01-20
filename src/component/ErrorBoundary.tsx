'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // 允許父層傳入自定義 "錯誤畫面"
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  // 初始化狀態
  public state: State ={
    hasError: false,
    error: null,
  };

  // 1.靜態方法第一時間攔截:當子元件拋出錯誤時，更新State
  // 讓下一次 Render 顯示 fallback UI
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // 2.生命週期事後紀錄:可以用來紀錄錯誤日誌 (例如送給 Sentry)
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Uncaught error:', error, errorInfo);
    // 在真實專案中，這裡會呼叫 Sentry 或 Datadog
    // logErrorToService(error, errorInfo);
  }
  // render決定顯示什麼
  public render () { 
    if (this.state.hasError) {
      // A. 如果有傳入客製化錯誤畫面(props.fallback)，就優先使用
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // B. 否則顯示預設的錯誤訊息
      return (
        <div className='p-6 m-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400'>
          <h2 className='text-lg font-bold mb-2 flex items-center gap-2'>
            ⚠️ Something went wrong !
          </h2>
          <p className='text-sm font-mono bg-white dark:bg-black/50 p-2 rounded border border-red-100 dark:border-red-900 mb-4'>
            {this.state.error?.message}
          </p>
          <button 
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium'  
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again (Reset)
          </button>
        </div>
      );
    }

    // 沒發生錯誤，正常渲染子元件顯示原本內容
    return this.props.children;
  }
}

export default ErrorBoundary;