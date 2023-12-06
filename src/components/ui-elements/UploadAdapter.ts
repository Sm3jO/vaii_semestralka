class UploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload(): Promise<any> {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                const data = new FormData();
                data.append('image', file);

                fetch('http://localhost:3000/api/images/upload', {
                    method: 'POST',
                    body: data,
                })
                    .then(response => response.json())
                    .then(data => {
                        resolve({ default: data.imageUrl });
                    })
                    .catch(error => {
                        reject(error);
                    });
            }));
    }
}

export function CustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new UploadAdapter(loader);
    };
}