export const iframeHTML = `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width,
    user-scalable=no,
    initial-scale=1.0,
    maximum-scale=1.0,
    minimum-scale=1.0"
  >
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Rich Text Editor</title>
  <style>
    html {
      height: 100%
    }
    body {
      padding: 0 8px;
      margin: 0;
      min-height: 100%;
      box-sizing: border-box;
      text-size-adjust: none;
      cursor: text;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }
    ::selection {
      background-color: rgba(18, 150, 219, .2);
    }

    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;
    }

    table td {
      border: 1px solid #aaa;
    }

    table td:focus-visible {
      border-color: red
    }
  </style>
</head>
<body contenteditable>
  <!-- Inject Default Content -->
</body>
</html>
`
  .replace(/\n/g, "")
  .replace(/\s+/g, " ")
  .replace(/'/g, "\\'");
