<template>
  <div class="mainEditor">
    <div class="top">
      <div class="form">
        <el-form
          label-position="left"
          label-width="70px"
          :model="blog"
          style="max-width: 460px"
        >
          <el-form-item label="博客标题">
            <el-input
              v-model.trim="blog.title"
              placeholder="输入你的博客"
              minlength="2"
              style="width: 220px"
            />
          </el-form-item>

          <el-form-item label="博客类别">
            <el-select
              v-model.trim="blog.type"
              placeholder="选择你的博客类别"
              style="width: 220px"
            >
              <el-option label="后端" value="后端" />
              <el-option label="前端" value="前端" />
              <el-option label="测试" value="测试" />
              <el-option label="移动" value="移动" />
              <el-option label="java" value="java" />
              <el-option label="Python" value="Python" />
              <el-option label="人工智能" value="人工智能" />
              <el-option label="运维" value="运维" />
              <el-option label="服务器" value="服务器" />
              <el-option label="操作系统" value="操作系统" />
              <el-option label="网络" value="网络" />
              <el-option label="开发工具" value="开发工具" />
            </el-select>
          </el-form-item>

          <el-form-item label="博客描述">
            <el-input
              type="textarea"
              rows="5"
              v-model.trim="blog.desc"
              placeholder="输入你的博客概况"
              style="width: 320px"
            />
          </el-form-item>
        </el-form>

        <div class="btns">
          <el-button @click="onBlogReset">重置</el-button>
          <el-button @click="onBlogSucmit">提交</el-button>
        </div>
      </div>

      <div class="uploader">
        <span>博客封面</span>
        <el-upload
          class="upload-demo"
          drag
          :action="domain"
          multiple
          :limit="1"
          :auto-upload="true"
          :http-request="uploadQn"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="handleChangeFile"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽文件到此 &nbsp;或者 <em>点击此处上传封面</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              <p style="font-size: 14px">
                只能上传jpg或png格式文件且大小不超过2MB
              </p>
            </div>
          </template>
        </el-upload>
      </div>
    </div>

    <!-- BLOG CONTENT -->
    <div style="border: 1px solid #ccc; margin-top: 30px">
      <p style="font-size: 14px; display: block; margin: 9px 3px">
        输入博客主要内容:
      </p>
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 300px; overflow-y: auto"
        v-model="blog.content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { UploadFilled } from "@element-plus/icons-vue";
import { onBeforeUnmount, onMounted, reactive, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { UploadProps } from "element-plus/es/components/upload/src/upload";
import { ElMessage } from "element-plus";
import axios from "axios";
import { nanoid } from "nanoid";
import { upload_qiniu, domain, uploadUrl } from "@/api/common/qiniu";
import { uploadBlogApi } from "@/api/module/blog";

const blog = reactive({
  title: "",
  type: "",
  tagList: [],
  content: "",
  imgSrc: "",
  desc: "",
  author: "kuuga",
});

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  console.log("uploadFile", uploadFile);
  console.log("response", response);

  blog.imgSrc = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // if (rawFile.type !== "image/jpeg" || "image/png" || "image/jpg") {
  //   ElMessage.error("文件格式只能是JPG或者PNG!");
  //   return false;
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error("上传文件不能大于2MB!");
  //   return false;
  // }
  return true;
};

const handleChangeFile: UploadProps["onChange"] = (rawFile) => {
  console.log("file-change", rawFile);
};

const uploadQn = (req: any) => {
  const config: any = {
    Headers: {
      "content-type": "multipart/form-data",
    },
  };
  let fileType: string = "";

  fileType = req.type === "image/png" ? "png" : "jpg";

  const fileName: string = "blog" + nanoid();
  let formdata = new FormData();

  upload_qiniu().then((data) => {
    formdata.append("file", req.file);
    formdata.append("token", data);
    formdata.append("ken", fileName);

    axios
      .post(domain, formdata, config)
      .then((res) => {
        blog.imgSrc = `http://${uploadUrl}/${res.data.key}`;
        ElMessage.success({
          message: "上传封面成功！",
        });
      })
      .catch((err) => {
        ElMessage.error({
          message: "上传封面出错了！",
        });
      });
  });
};

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const mode = ref("default");

// 模拟 ajax 异步获取内容
onMounted(() => {});

const toolbarConfig = {};
const editorConfig = { placeholder: "输入博客主要内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleChange = (editor: any) => {
  // console.log("change:", editor.children);
};
const handleDestroyed = (editor: any) => {
  console.log("destroyed", editor);
};
const handleFocus = (editor: any) => {
  // console.log("focus", editor);
};
const handleBlur = (editor: any) => {
  // console.log("blur", editor);
};
const customAlert = (info: any, type: any) => {
  alert(`【自定义提示】${type} - ${info}`);
};
const customPaste = (
  editor: { insertText: (arg0: any) => void },
  event: {
    clipboardData: { getData: (arg0: string) => any };
    preventDefault: () => void;
  },
  callback: (arg0: boolean) => void
) => {
  // const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
  const text = event.clipboardData.getData("text/plain"); // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）
  // 自定义插入内容
  editor.insertText(text);

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault();
  callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true);
};

const onBlogReset = () => {
  console.log("reset");
};

const onBlogSucmit = () => {
  uploadBlogApi(blog)
    .then((res) => {
      console.log("res", res);
      ElMessage.success({
        message: "新建博客成功！",
      });
    })
    .catch((err) => {
      ElMessage.error({
        message: "新建博客出错了！",
      });
    });
};
</script>

<style scoped lang="less">
.mainEditor {
  background-color: rgb(221, 225, 230);
  padding: 20px 40px;
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;

    .form {
      flex: 1;
      padding-bottom: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .uploader {
      flex: 1;
      span {
        display: block;
        margin: 0 0 10px 0;
      }
    }
  }
}
</style>
