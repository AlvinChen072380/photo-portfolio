'use client' //宣告客戶端元件

import React from "react";
import { Heart } from "lucide-react";

// 1.定義State 的資料形狀
interface State {
  liked: boolean;
  count: number;
}

// 2.定義Props 的形狀
//eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}

// 3.繼承 React.Component <Props, State>
class LikeButtonClass extends React.Component<Props, State> {

  // 1-1.componentDidMount: 元件 "掛載完成" 後執行 (只執行一次)
  // 對應: 初始化、API呼叫、訂閱事件
  componentDidMount() {
    console.log('Class Component: Mounted!');
    // 模擬從LocalStorage 讀取 (真實情況通常是用API)
    const savedLike = localStorage.getItem('isLiked') === 'true';
    if (savedLike) {
      this.setState({ liked: true, count: 1 });
    }
  }

  // 2-1.componentDidUpdate: 元件 "更新完成" 後執行 (Props 或 State 改變時)
  // 對應: 當資料變了，同步做某些事 (例如:存檔)
  componentDidUpdate(prevProps: Props, prevState: State) {
    // 必須比較前後狀態，不然會造成無限迴圈
    if (prevState.liked !== this.state.liked) {
      console.log('Class Component: Updated!');
      localStorage.setItem('isLiked', String(this.state.liked));
    }
  }

  // 3-1.componentWillUnmount: 元件 "死掉/移除" 前執行 (Cleanup)
  // 對應: 取消訂閱、消除計時器
  componentWillUnmount () {
    console.log('Class Component: Will Unmount bye bye');      
  }



  // 4.建構函式 (Constructor) : 初始化的唯一場所
  constructor(props: Props) {
    super(props);
    //初始化 State
    this.state = {
      liked: false,
      count: 0
    };   

    // 綁定 this (?)
    this.handleClick = this.handleClick.bind(this);    
  }
  
  // 5.定義方法
  handleClick () {
    // 在 Class 中，修改 State 必須用 this.setState
    // 不能直接寫 this.state.liked = true (這個寫法 React 偵測不到變化)
    this.setState((prevState) => ({
      liked: !prevState.liked,
      count: prevState.liked ? prevState.count -1 : prevState.count + 1
    }));    
  }

  // 6.渲染函式 (Render Method) : Class 必備
  render () {
    const { liked, count } = this.state; //解構賦值
   
    return (
      <button
        onClick={this.handleClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors border ${
          liked
            ? 'bg-red-50 border-red-200 text-red-500'
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`}/>
        <span className="font-medium">{count} Likes</span>
      </button>
    );
  }
}

export default LikeButtonClass

