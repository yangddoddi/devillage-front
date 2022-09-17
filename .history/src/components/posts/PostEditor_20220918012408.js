import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export const PostEditor = () => {
  return (
    <div>
      <Editor
        previewStyle="vertical"
        height="600px"
        width="400px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        language="ko-KR"
      />
    </div>
  );
};
