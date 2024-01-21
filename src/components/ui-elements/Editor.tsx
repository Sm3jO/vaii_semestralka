import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from "../Interaction/UploadAdapter.ts";

interface EditorProps {
    onChange?: (data: string) => void;
    initialValue?: string;
}

const Editor: React.FC<EditorProps> = ({ onChange, initialValue }) => {
    const [editorData, setEditorData] = useState<string>('');

    useEffect(() => {
        if (initialValue) {
            setEditorData(initialValue);
        }
    }, [initialValue]);

    const handleEditorChange = (_event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
        if (onChange) {
            onChange(data);
        }
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
            config={{
                extraPlugins: [CustomUploadAdapterPlugin],
                toolbar: {
                    items: [
                        'heading', '|',
                        'bold', 'italic', 'link', 'imageUpload', 'bulletedList', 'numberedList', 'blockQuote', '|',
                        'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                        'undo', 'redo',
                    ]
                },
                image: {
                    toolbar: ['imageTextAlternative'],
                },
                simpleUpload: {
                    uploadUrl: 'http://localhost:3000/api/images/upload',
                }
            }}
        />
    );
};

export default Editor;
