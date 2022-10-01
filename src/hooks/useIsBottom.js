import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

/**
 * 滚动到底部触发事件的hook
 * @param listDomRef 绑定滚动事件的dom节点的ref
 * @param callback 滚动到底部时执行的callback
 * @param reactionDistance 距离底部的触发距离，默认为0
 */
export const useIsBottom = (listDomRef, callback, reactionDistance = 0) => {
  const debouncedCallback = useDebouncedCallback(() => callback(), 500);
  useEffect(() => {
    const currentDom = listDomRef.current;
    const handleScroll = (e) => {
      if (
        e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight <=
        reactionDistance
      ) {
        debouncedCallback();
      }
    };
    currentDom?.addEventListener("scroll", handleScroll);
    return () => {
      // 组件销毁时清除绑定事件
      currentDom?.removeEventListener("scroll", handleScroll);
    };
  }, [callback, reactionDistance, listDomRef]);
};
