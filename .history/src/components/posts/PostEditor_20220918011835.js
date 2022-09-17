import { Editor } from "@toast-ui/react-editor";
import "codemirror/lib/codemirror.css";

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
