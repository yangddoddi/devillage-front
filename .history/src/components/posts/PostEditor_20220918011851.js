import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer";

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
