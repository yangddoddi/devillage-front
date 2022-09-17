import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/react-editor/dist/toastui-editor.css";

export const PostEditor = () => {
  return (
    <Editor
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={flase}
    />
  );
};
