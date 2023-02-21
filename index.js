const Transloadit = require("transloadit");

const transloadit = new Transloadit({
  authKey: "AUTH KEY",
  authSecret: "AUTH SECRET"
});

const options = {
  files: {
    alf1: "alf1.png",
    alf2: "alf2.png"
  },
  params: {
    steps: {
      imported: {
        robot: '/s3/import',
        result: true,
        credentials: 'fstg-test',
        path: 'folder1/',
      },
      imported: {
        robot: '/s3/import',
        result: true,
        credentials: 'fstg-test',
        path: 'folder2/',
      },
      archived: {
        use: {
          steps: [":original"],
          bundle_steps: true,
        },
        robot: "/file/compress",
        result: true,
        format: "zip",
      },
      exported: {
        use: ["archived"],
        robot: "/s3/store",
        credentials: "fstg-test",
        url_prefix: "https://demos.transloadit.com/",
      },
    },
  },
};

const handler = async () => {
  const result = await transloadit.createAssembly(options);
  console.log({ result });
};

handler();
