<template>
  <el-upload
    ref="upload"
    style="display: inline-block"
    class="upload"
    :action="action"
    :accept="accept"
    :show-file-list="false"
    :limit="1"
    :headers="headers"
    :data="uploadData"
    :multiple="false"
    :auto-upload="true"
    :before-upload="beforeAvatarUpload"
    :on-error="fileUploadError"
    :on-success="fileUploadSuccess"
  >
    <el-button type="primary" plain @click="clickUpload">{{ btn }}</el-button>
  </el-upload>
</template>
<script>
import { getToken } from '@/common/conf/utils'
import { baseURL } from '@/config'

export default {
  props: {
    btn: String,
    ufile: String,
  },
  data() {
    return {
      action: `${baseURL}/upload/file`,
      headers: { token: getToken() },
      params: {},
      file: null,
      uploadData: {},
      loading: null,
      accept: 'image/*,video/*,.pdf,.doc,.docx',
    }
  },
  mounted() {
    if (this.ufile === 'mp4') {
      this.accept = 'video/*'
    } else if (this.ufile === 'doc') {
      this.accept = '.doc,.docx'
    } else if (this.ufile === 'doconly') {
      this.accept = '.doc'
    } else if (this.ufile === 'pdf') {
      this.accept = '.pdf'
    } else if (this.ufile === 'png') {
      this.accept = '.png'
    } else {
      this.accept = 'image/*'
    }
  },
  methods: {
    beforeAvatarUpload() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    },
    fileUploadError(err) {
      const msg = err.message
      if (msg) {
        this.$message.error(msg)
        this.$refs.upload.clearFiles()
      }
    },
    fileUploadSuccess(res) {
      if (res.code === 200) {
        if (res.message === 'error') {
          this.$message.error('上传失败')
        } else {
          this.$emit('on-success', res.data)
          this.loading.close()
          this.$message.success('上传成功')
        }
      } else {
        this.$message.error(res.message || '上传失败')
      }
      this.$refs.upload.clearFiles()
    },
    clickUpload() {
      this.$emit('on-upload')
    },
  },
}
</script>
