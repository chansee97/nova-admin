<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'

const modelValue = defineModel()

function imagesUploadHandler(blobInfo, _progress) {
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
        resolve(data)
      })
      .catch((error) => {
        // 处理上传失败的情况
        reject(error)
      })
  })
}
function filesUploadHandler(callback, value, meta) {
  // 使用案例http://tinymce.ax-z.cn/general/upload-images.php
  // meta.filetype  //根据这个判断点击的是什么file image media
  let filetype // 限制文件的上传类型,需要什么就添加什么的后缀
  if (meta.filetype === 'image')
    filetype = '.jpg, .jpeg, .png, .gif, .ico, .svg'

  else if (meta.filetype === 'media')
    filetype = '.mp3, .mp4, .avi, .mov'

  else
    filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .jpg, .jpeg, .png, .gif, .ico, .svg'

  const inputElem = document.createElement('input') // 创建文件选择
  inputElem.setAttribute('type', 'file')
  inputElem.setAttribute('accept', filetype)
  inputElem.click()
  inputElem.onchange = () => {
    const file = inputElem.files[0] // 获取文件信息

    // 所有都转成base64文件流,来自官方文档https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      // Note: Now we need to register the blob in TinyMCEs image blob
      // registry. In the next release this part hopefully won't be
      // necessary, as we are looking to handle it internally.
      const id = `blobid${new Date().getTime()}`
      const blobCache = tinymce.activeEditor.editorUpload.blobCache
      const base64 = reader.result.split(',')[1]
      const blobInfo = blobCache.create(id, file, base64)
      blobCache.add(blobInfo)

      // call the callback and populate the Title field with the file name
      callback(blobInfo.blobUri(), { title: file.name })
    }
  }
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
          'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media  code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons', // 插件配置 axupimgs indent2em
  toolbar: [
    'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ',
    'styleselect formatselect fontselect fontsizeselect |  table image axupimgs media link emoticons charmap hr pagebreak insertdatetime  selectall visualblocks | code preview | indent2em lineheight formatpainter',
  ],
  paste_data_images: true, // 图片是否可粘贴
  // 此处为图片上传处理函数
  images_upload_handler: imagesUploadHandler,

  file_picker_types: 'file image media', // file image media分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
  // 文件上传处理函数
  file_picker_callback: filesUploadHandler,
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
