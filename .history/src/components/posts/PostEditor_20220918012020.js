import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export const PostEditor = () => {
  return (
    <Editor
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      language="ko-KR"
    />
  );
};
