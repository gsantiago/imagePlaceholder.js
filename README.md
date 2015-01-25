# imagePlaceholder.js

A simple JS script to replace empty images by placeholders. It uses HTML5 Canvas and can be useful for development.

<s>jQuery</S> is NOT required.

Example of placeholder that is generated:

![](https://raw.githubusercontent.com/gsantiago/imagePlaceholder.js/master/generated_placeholder.png)

Usage
---
Include the script right before ```</body>```
```html
<script src="imagePlaceholder.js"></script>
```

It will replace the images without ```src``` defined, but ```width``` and ```height``` are required.
```html
<!-- These images will be replaced -->
<img width="150" height="150">
<img src="" width="50" height="50">

<!-- These images WON'T be replaced -->
<img src="image" width="100" height="100">
<img src="">
```

Options
---
The script offers some options to customize the generated placeholders.
```javascript
// Default options
font: 'Arial',
fontColor: '#000',
maxFontSize: 172,
backgroundColor: '#ddd'
```

To set the options, just change the imagePlaceholder properties after include the script and call the ```update()``` method.
```html
<script src="imagePlaceholder.js"></script>
<script>
    // Set the properties
    imagePlaceholder.font = 'Verdana';
    imagePlaceholder.fontColor = '#fff';
    imagePlaceholder.backgroundColor = '#000';

    // Update the changes
    imagePlaceholder.update();
</script>
```
