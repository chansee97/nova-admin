<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'

const modelValue = defineModel()

function imagesUploadHandler(blobInfo: any, _progress: number) {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', blobInfo.blob())
    fetch('www.example.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok)
          throw new Error('上传失败')

        // 处理上传成功后的响应数据
        resolve('上传成功')
      })
      .catch((error) => {
        // 处理上传失败的情况
        reject(error)
      })
  })
}
const initConfig = {
  language: 'zh_CN', // 语言类型
  min_height: 700,
  content_css: 'dark',
  placeholder: '请输入内容', // textarea中的提示信息
  branding: false,
  font_formats:
          '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;', // 字体样式
  plugins:
          'print preview searchreplace autolink directionality visualblocks visualchars fullscreen code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons', // 插件配置 axupimgs indent2em
  toolbar: [
    'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ',
    'styleselect formatselect fontselect fontsizeselect |  table emoticons charmap hr pagebreak insertdatetime  selectall visualblocks | code preview | indent2em lineheight formatpainter',
  ],
  paste_data_images: true, // 图片是否可粘贴
  // 此处为图片上传处理函数
  images_upload_handler: imagesUploadHandler,

  // file_picker_types: 'file image media', // file image media分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
  // 文件上传处理函数
  // file_picker_callback: filesUploadHandler,
}
</script>

<template>
  <div class="tinymce-boxz">
    <Editor
      v-model="modelValue"
      api-key="no-api"
      :init="initConfig"
    />
  </div>
</template>

<style>
 .tinymce-boxz > textarea {
  display: none;
}

/* 隐藏apikey没有绑定这个域名的提示 */
.tox-notifications-container .tox-notification--warning {
  display: none !important;
}

.tox.tox-tinymce {
  max-width: 100%;
}
</style>
