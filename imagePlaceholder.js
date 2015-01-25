/*
* imagePlaceholder.js
* Replaces empty images by placeholders
* @author Guilherme Santiago - github.com/gsantiago
* @version 0.1.0
*/
(function (window, document) {
    'use strict';

    // Default style
    var imagePlaceholder = {
        font: 'Arial',
        fontColor: '#000',
        maxFontSize: 172,
        backgroundColor: '#ddd'
    };

    // Canvas that will be used for all images
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    // Get the ideal font-size to fit the image based on its height
    var getFontSizeHeight = function (height, fontSize) {
        if (fontSize > height - 5) {
            return getFontSizeHeight(height, fontSize - 1);
        } else {
            return fontSize;
        }
    };

    // Get the ideal font-size to fit the image based on its width
    var getFontSizeWidth = function (ctx, text, width, fontSize) {
        ctx.font = fontSize + 'px ' + imagePlaceholder.font;
        var textWidth = ctx.measureText(text).width;
        if (textWidth > width - 10) {
            return getFontSizeWidth(ctx, text, width, fontSize - 1);
        } else {
            return fontSize;
        }
    };

    // Generate an image with canvas
    var makeImage = function (width, height) {
        if (isNaN(width) || isNaN(height)) return false;

        canvas.width = width;
        canvas.height = height;

        var text = width + 'x' + height;

        ctx.fillStyle = imagePlaceholder.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = imagePlaceholder.fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        var fontSize = getFontSizeHeight(height, imagePlaceholder.maxFontSize);
        fontSize = getFontSizeWidth(ctx, text, width, fontSize);

        ctx.fillText(text, width/2, height/2);
        ctx.stroke();

        return canvas.toDataURL();
    };

    // Get all images from DOM and replace the empty images
    imagePlaceholder.start = function () {
        var images = document.querySelectorAll('img'),
            value;
        for (var i = 0, max = images.length; i < max; i += 1) {
            var img = images[i];
            if (img.attributes.src) {
                value = !img.attributes.src.value;
            } else {
                value = true;
            }
            if ((value && img.width && img.height) || img.hasPlaceholder) {
                img.src = makeImage(img.width, img.height);
                img.hasPlaceholder = true;
            }
        }
    };

    // Initiate the script
    imagePlaceholder.start();

    // Create an alias for start method
    imagePlaceholder.update = imagePlaceholder.start;

    window.imagePlaceholder = imagePlaceholder;

}(window, document));