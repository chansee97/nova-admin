export function useClipBoard() {
  function isSupport() {
    return !navigator.clipboard;
  }
  async function copy(text: string) {
    if (isSupport()) {
      return window.$message?.error('当前浏览器不支持复制！');
    }
    if (!text) {
      window.$message?.error('请输入要复制的内容');
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        window.$message?.success(`复制成功：${text}`);
      },
      () => {
        window.$message?.error('复制失败');
      },
    );
  }

  return {
    copy,
  };
}
