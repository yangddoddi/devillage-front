import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.css";

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
