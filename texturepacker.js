function texturePackerTemplate(params) {
    var items = params.items,
        itemObj = {frames: {}},
        frames = itemObj.frames,
        item,
        animations = {};

    if (items.length > 0) {
        item = items[0];
        itemObj.meta = {
            app: "https://github.com/Ensighten/spritesmith",
            image: item.image,
            format: 'RGBA8888',
            size: {
                w: item.total_width,
                h: item.total_height
            },
            scale: 1
        };
    }

    items.forEach(function (item) {
        frames[item.name] = {
            frame: {
                x: item.x,
                y: item.y,
                w: item.width,
                h: item.height
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: item.width,
                h: item.height
            },
            sourceSize: {
                w: item.width,
                h: item.height
            }
        };

        var matches = item.name.match(/(.*?)_\d\d/);

        if (matches) {
            var animationName = matches[1];
            var currentAnimations = animations[animationName];
            var fileName = matches[0];
            if (!currentAnimations) {
                animations[animationName] = [fileName];
            } else {
                animations[animationName].push(fileName);
            }
        }
    });

    itemObj.animations = animations;

    return JSON.stringify(itemObj, null, 4);
}

module.exports = texturePackerTemplate;
