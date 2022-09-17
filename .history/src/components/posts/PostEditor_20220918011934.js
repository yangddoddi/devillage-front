import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

export const PostEditor = () => {
  return (
    <Editor
      previewStyle="vertical"
      height="600px"
      width="100%"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
    />
  );
};
