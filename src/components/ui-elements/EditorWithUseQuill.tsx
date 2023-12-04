import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';


const EditorWithUseQuill: React.FC = () => {
    const { quill, quillRef, Quill } = useQuill({
        modules: {
            blotFormatter: {}
        }
    });

    useEffect(() => {
        if (Quill && !quill) {
            Quill.register('modules/blotFormatter', BlotFormatter);
        }

        if (quill) {
            quill.on('text-change', (delta, oldContents) => {
            });
        }
    }, [quill, Quill]);

    return (
        <div>
            <div ref={quillRef} />
        </div>
    );
};

export default EditorWithUseQuill;