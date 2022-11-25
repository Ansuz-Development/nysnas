module.exports = ({env}) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        },
      },
    },
  },
  ckeditor: {
    enabled: true,
    config: {
      plugin: {},
      editor: {
        removePlugins: ["Markdown"],
        toolbar: {
          items: [
            "paragraph",
            "heading1",
            "heading2",
            "heading3",
            "heading4",
            "|",
            "bold",
            "italic",
            "fontColor",
            "fontBackgroundColor",
            "underline",
            "fontSize",
            "removeFormat",
            "|",
            "bulletedList",
            "todoList",
            "numberedList",
            "|",
            "alignment",
            "outdent",
            "indent",
            "horizontalLine",
            "|",
            "StrapiMediaLib",
            "insertTable",
            "blockQuote",
            "mediaEmbed",
            "link",
            "highlight",
            "|",
            "code",
            "codeBlock",
            "|",
            "subscript",
            "superscript",
            "strikethrough",
            "specialCharacters",
            "|",
            "fullScreen",
            "undo",
            "redo",
          ],
        },
        fontSize: {
          options: [
            10,
            12,
            14,
            "default",
            18,
            20,
            24,
            28,
            32,
            36,
          ],
          supportAllValues: false,
        },
        fontColor: {
          columns: 5,
          documentColors: 10,
        },
        fontBackgroundColor: {
          columns: 5,
          documentColors: 10,
        },
        image: {
          resizeUnit: "%",
          resizeOptions: [
            {
              name: "resizeImage:original",
              value: null,
              icon: "original",
            },
            {
              name: "resizeImage:25",
              value: "25",
              icon: "small",
            },
            {
              name: "resizeImage:50",
              value: "50",
              icon: "medium",
            },
            {
              name: "resizeImage:75",
              value: "75",
              icon: "large",
            },
          ],
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "linkImage",
            "resizeImage:25",
            "resizeImage:50",
            "resizeImage:75",
            "resizeImage:original",
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableCellProperties",
            "tableProperties",
            "toggleTableCaption",
          ],
        },
        // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
        htmlSupport: {
          allow: [
            {
              name: "img",
              attributes: {
                sizes: true,
                loading: true,
              },
            },
          ],
        },
      },
    },
  },
  graphql: {
    config: {
      playgroundAlways: true,
      apolloServer: {introspection: true},
    },
  },
});
