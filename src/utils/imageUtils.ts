/**
 * 图片处理工具函数
 */

/**
 * 将base64字符串转换为File对象
 * @param base64String base64编码的图片字符串
 * @param filename 文件名
 * @param mimeType MIME类型，默认为image/png
 * @returns Promise<File>
 */
export const base64ToFile = async (
  base64String: string,
  filename: string,
  mimeType: string = 'image/png'
): Promise<File> => {
  return new Promise((resolve, reject) => {
    try {
      // 移除base64字符串的data:image/xxx;base64,前缀
      const base64Data = base64String.includes('base64,')
        ? base64String.split('base64,')[1]
        : base64String;

      // 将base64转换为二进制数据
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      // 创建Blob对象
      const blob = new Blob([byteArray], { type: mimeType });

      // 创建File对象
      const file = new File([blob], filename, { type: mimeType });

      resolve(file);
    } catch (error) {
      reject(new Error(`转换base64为File失败: ${error}`));
    }
  });
};

/**
 * 将base64字符串转换为Blob对象
 * @param base64String base64编码的图片字符串
 * @param mimeType MIME类型，默认为image/png
 * @returns Promise<Blob>
 */
export const base64ToBlob = async (
  base64String: string,
  mimeType: string = 'image/png'
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      // 移除base64字符串的data:image/xxx;base64,前缀
      const base64Data = base64String.includes('base64,')
        ? base64String.split('base64,')[1]
        : base64String;

      // 将base64转换为二进制数据
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      // 创建Blob对象
      const blob = new Blob([byteArray], { type: mimeType });

      resolve(blob);
    } catch (error) {
      reject(new Error(`转换base64为Blob失败: ${error}`));
    }
  });
};

/**
 * 从base64字符串中提取MIME类型
 * @param base64String base64编码的图片字符串
 * @returns string MIME类型
 */
export const getMimeTypeFromBase64 = (base64String: string): string => {
  if (base64String.includes('data:')) {
    const match = base64String.match(/data:([^;]+);/);
    return match ? match[1] : 'image/png';
  }
  return 'image/png';
};

/**
 * 将图片URL转换为base64字符串
 * @param url 图片URL或路径
 * @returns Promise<string> base64编码的图片字符串
 */
export const urlToBase64 = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image();
      // 设置跨域
      image.crossOrigin = 'anonymous';
      
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('无法获取Canvas上下文'));
          return;
        }
        
        // 设置canvas大小与图片一致
        canvas.width = image.width;
        canvas.height = image.height;
        
        // 在canvas上绘制图片
        ctx.drawImage(image, 0, 0);
        
        // 将canvas内容转换为base64
        try {
          const base64 = canvas.toDataURL('image/png');
          resolve(base64);
        } catch (error) {
          reject(new Error(`Canvas转换为base64失败: ${error}`));
        }
      };
      
      image.onerror = (err) => {
        reject(new Error(`图片加载失败: ${err}`));
      };
      
      // 设置图片源
      image.src = url;
    } catch (error) {
      reject(new Error(`转换URL为base64失败: ${error}`));
    }
  });
};

/**
 * 生成唯一的文件名
 * @param originalName 原始文件名
 * @param extension 文件扩展名
 * @returns string 唯一文件名
 */
export const generateUniqueFilename = (originalName?: string, extension: string = 'png'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const name = originalName ? originalName.split('.')[0] : 'enhanced_image';
  return `${name}_${timestamp}_${random}.${extension}`;
};
