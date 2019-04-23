function jsonToAutoDownload (res){
    const blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
    const contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
    const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
    const result = patt.exec(contentDisposition) || [null,'excel.csv'];
    const filename = result[1]
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.style.display = 'none';
    downloadElement.href = href;
    downloadElement.download =filename ; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}

export default jsonToAutoDownload



