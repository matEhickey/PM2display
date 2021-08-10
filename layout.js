const layout = (title, body) => `
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
    ${body}
  </body>
</html>
`;

module.exports = layout;
