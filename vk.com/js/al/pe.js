function PhotoEdit(parentEl, photoSrc, bigPhotoSrc, options, initCallback, sizeUpdateCallback) {

    options = options || {};
    options.maxEditorSizeWidth = options.maxEditorSizeWidth || 700;

    var _this = this;
    var _contexts = {};
    var pixelRatio = window.devicePixelRatio || 1;
    var mainCanvasInited = false;

    cur.pe = this;

    var imageEl = new Image(),
        bigImageEl = new Image();

    var imageCanvas, cleanCroppedImageCanvas, originalImageCanvas,
        bigImageCanvas, autoImageCanvas, canvasEl;

    this.clean = function() {
        var context = _currentContext;
        if (context.currTexture) context.currTexture.destroy();
        if (context.cleanCurrentTexture) context.cleanCurrentTexture.destroy();
        imageCanvas = null;
        cleanCroppedImageCanvas = null;
        originalImageCanvas = null;
        autoImageCanvas = null;
        bigImageCanvas = null;
        re(context.canvasEl);
        context.canvasEl = null;
    }


    function onImageUpdate() {
        if (!_this._imageLoaded) {
            return;
        }

        var w = imageCanvas.width / pixelRatio;
        var h = imageCanvas.height / pixelRatio;

        if (w > h) {
            options.width = Math.min(w, options.maxEditorSizeWidth);
            options.height = Math.round((h / w) * options.width);
        } else {
            options.height = Math.min(h, options.maxEditorSizeWidth);
            options.width = Math.round((w / h) * options.height);
        }

        if (!mainCanvasInited) {
            canvasEl = _this._initCanvas("pe_main");
            _this._setCurrentContext("pe_main");
            mainCanvasInited = true;
        }

        if (!originalImageCanvas) {
            originalImageCanvas = document.createElement('canvas');
            originalImageCanvas.width = imageCanvas.width * pixelRatio;
            originalImageCanvas.height = imageCanvas.height * pixelRatio;
            originalImageCanvas.getContext('2d').drawImage(imageCanvas, 0, 0, imageCanvas.width * pixelRatio, imageCanvas.height * pixelRatio);
        }
        _this._initCanvas("pe_main");

        if (imageCanvas.width != options.width || imageCanvas.height != options.height) {
            var cnv = document.createElement('canvas');
            cnv.width = options.width * pixelRatio;
            cnv.height = options.height * pixelRatio;
            var ctx = cnv.getContext('2d');
            ctx.drawImage(imageCanvas, 0, 0, options.width * pixelRatio, options.height * pixelRatio);
            delete imageCanvas;
            imageCanvas = cnv;
        }


        sizeUpdateCallback && sizeUpdateCallback();

        var context = _currentContext;
        if (context.currTexture) context.currTexture.destroy();
        if (context.cleanCurrentTexture) context.cleanCurrentTexture.destroy();

        _this._initialize();
        _updateCurrentTexture(imageCanvas);

        _this.setText();
        _this.applyChanges();
    };

    function _updateCurrentTexture(canvas) {
        var context = _currentContext;

        if (context.currTexture) context.currTexture.destroy();
        context.currTexture = Texture.fromElement(canvas);
        context.texture.ensureFormat(context.currTexture);
        context.currTexture.use();

        context.texture.drawTo(function() {
            Shader.getDefaultShader().drawRect();
        });

        context.spareTexture.ensureFormat(context.texture);
    }

    var imagesLoadRef = 0;

    function onImageLoaded() {
        imagesLoadRef++;
        if (imagesLoadRef == 2) {
            setTimeout(function() {
                _this._imageLoaded = true;
                onImageUpdate();
                initCallback();
            }, 200);
        }
    }

    imageEl.onload = function() {
        imageCanvas = document.createElement('canvas');
        imageCanvas.width = this.width * pixelRatio;
        imageCanvas.height = this.height * pixelRatio;
        var ctx = imageCanvas.getContext('2d');
        ctx.drawImage(imageEl, 0, 0, this.width * pixelRatio, this.height * pixelRatio);

        onImageLoaded();
    }

    bigImageEl.onload = function() {
        bigImageCanvas = document.createElement('canvas');
        bigImageCanvas.width = bigImageEl.width;
        bigImageCanvas.height = bigImageEl.height;
        var ctx = bigImageCanvas.getContext('2d');
        ctx.drawImage(bigImageEl, 0, 0, bigImageEl.width, bigImageEl.height);

        onImageLoaded();
    }

    imageEl.crossOrigin = 'Anonymous';
    imageEl.src = photoSrc;
    bigImageEl.crossOrigin = 'Anonymous';
    bigImageEl.src = bigPhotoSrc;

    function simpleShader(shader, uniforms) {
        _currentContext.texture.use();
        _currentContext.spareTexture.drawTo(function() {
            shader.uniforms(uniforms).drawRect();
        });
        _currentContext.spareTexture.swapWith(_currentContext.texture);
    }

    function clamp(lo, value, hi) {
        return Math.max(lo, Math.min(value, hi));
    }

    this.restoreAll = function() {
        if (!this._mode) {
            return;
        }
        this.revert();
        delete this.saturation;
        delete this.exposure;
        delete this.sepia;
        delete this.saturation;
        delete this.unsharpAmount;
        delete this.blurSize;
        delete this.blurPosition;
        delete this.blurType;
        delete this._text;
        delete this._fontType;
        delete this._mode;
        delete this._currentFilter;
        delete this._currentFilterAmount;
        this.setText('', 0);
        this.applyAuto(false);
        this.resetCrop();
        delete this.lastCrop;

        // fixme: very hack
        var r = this.getRotation();
        if (r) {
            r = 4 - r;
            while (r--) {
                this.rotate();
            }
        }
    }

    this.revert = function() {
        _currentContext.texture.ensureFormat(_currentContext.currTexture);
        _currentContext.currTexture.use();
        _currentContext.texture.drawTo(function() {
            Shader.getDefaultShader().drawRect();
        });
    }

    this.getMode = function() {
        return this._mode;
    }

    this.applyChanges = function() {
        switch (this._mode) {
            case 'params':
                this.applyParameters();
                break;
            case 'filter':
                this.applyFilter();
                break;
        }
    }

    this.loadedImages = {};

    function loadImages(imagesArray, cb) {
        if (!imagesArray) {
            return cb([]);
        }

        var count = imagesArray.length,
            images = new Array(count);

        function imgDone(img) {
            _this.loadedImages[imagesArray[img.index]] = img;
            images[img.index] = img;
            count--;
            if (count == 0)
                cb(images);
        }

        for (var i = 0; i < imagesArray.length; i++) {
            var img = _this.loadedImages[imagesArray[i]];

            if (!img) {
                var img = new Image();
                img.index = i;
                img.onload = function() {
                    imgDone(this);
                }
                img.src = imagesArray[i];
            } else {
                img.index = i;
                imgDone(img);
            }
        }
    }

    this.getLastCrop = function() {
        if (!this.lastCrop) {
            this.lastCrop = {
                l: 0,
                t: 0,
                r: 0,
                b: 0,
            }
        }

        return {
            t: this.lastCrop.t,
            l: this.lastCrop.l,
            r: this.lastCrop.r,
            b: this.lastCrop.b,
        }
    }

    this.getCanvasEl = function() {
        return canvasEl;
    }

    this.getSize = function() {
        return [imageCanvas.width / pixelRatio, imageCanvas.height / pixelRatio];
    }

    this.resetCrop = function() {
        this.crop(0, 0, 0, 0, true);
    }

    this.getRotation = function() {
        return this._rotation || 0;
    }

    this.rotate = function() {
        var side = 1;

        this._rotation = ((this._rotation || 0) + side) % 4;

        var targetHeight = options.width;
        var targetWidth = options.height;

        var rotateCanvas = document.createElement('canvas');
        rotateCanvas.width = targetWidth * pixelRatio;
        rotateCanvas.height = targetHeight * pixelRatio;

        var context = rotateCanvas.getContext('2d');
        if (side > 0) {
            context.translate(rotateCanvas.width, 0);
        } else {
            context.translate(0, rotateCanvas.height);
        }
        context.rotate(side * Math.PI / 2);
        context.drawImage(imageCanvas, 0, 0, rotateCanvas.height, rotateCanvas.width);
        delete imageCanvas;
        imageCanvas = rotateCanvas;

        if (cleanCroppedImageCanvas) {
            rotateCanvas = document.createElement('canvas');
            rotateCanvas.width = cleanCroppedImageCanvas.height;
            rotateCanvas.height = cleanCroppedImageCanvas.width;
            var context = rotateCanvas.getContext('2d');
            if (side > 0) {
                context.translate(rotateCanvas.width, 0);
            } else {
                context.translate(0, rotateCanvas.height);
            }
            context.rotate(side * Math.PI / 2);
            context.drawImage(cleanCroppedImageCanvas, 0, 0, rotateCanvas.height, rotateCanvas.width);
            delete cleanCroppedImageCanvas;
            cleanCroppedImageCanvas = rotateCanvas;
        }

        // auto
        if (autoImageCanvas) {
            rotateCanvas = document.createElement('canvas');
            rotateCanvas.width = autoImageCanvas.height;
            rotateCanvas.height = autoImageCanvas.width;
            rotateCanvas.style.width = autoImageCanvas.height + 'px';
            rotateCanvas.style.height = autoImageCanvas.width + 'px';
            var context = rotateCanvas.getContext('2d');
            if (side > 0) {
                context.translate(rotateCanvas.width, 0);
            } else {
                context.translate(0, rotateCanvas.height);
            }
            context.rotate(side * Math.PI / 2);
            context.drawImage(autoImageCanvas, 0, 0, rotateCanvas.height, rotateCanvas.width);
            delete autoImageCanvas;
            autoImageCanvas = rotateCanvas;
        }

        // big
        if (bigImageCanvas) {
            rotateCanvas = document.createElement('canvas');
            rotateCanvas.width = bigImageCanvas.height;
            rotateCanvas.height = bigImageCanvas.width;
            var context = rotateCanvas.getContext('2d');
            if (side > 0) {
                context.translate(rotateCanvas.width, 0);
            } else {
                context.translate(0, rotateCanvas.height);
            }
            context.rotate(side * Math.PI / 2);
            context.drawImage(bigImageCanvas, 0, 0, rotateCanvas.height, rotateCanvas.width);
            delete bigImageCanvas;
            bigImageCanvas = rotateCanvas;
        }

        // original image rotate
        rotateCanvas = document.createElement('canvas');
        rotateCanvas.width = originalImageCanvas.height;
        rotateCanvas.height = originalImageCanvas.width;

        var context = rotateCanvas.getContext('2d');
        if (side > 0) {
            context.translate(rotateCanvas.width, 0);
        } else {
            context.translate(0, rotateCanvas.height);
        }
        context.rotate(side * Math.PI / 2);
        context.drawImage(originalImageCanvas, 0, 0, rotateCanvas.height, rotateCanvas.width);
        delete originalImageCanvas;
        originalImageCanvas = rotateCanvas;

        var crop = this.getLastCrop();
        this.lastCrop.t = crop.l;
        this.lastCrop.l = crop.b;
        this.lastCrop.b = crop.r;
        this.lastCrop.r = crop.t;

        FiltersPE.hideCropArea()

        onImageUpdate();
    }

    this.show = function() {
        parentEl.appendChild(canvasEl);
        sizeUpdateCallback && sizeUpdateCallback();
    }

    //this.crop = function(left, top, width, height) {
    /*
      values in range [0..1]
    */
    this.crop = function(left, right, top, bottom, isReset, force) {


        var currCrop = this.getLastCrop(),
            needCrop = !!force;
        this.isCroppedBig = this.isCroppedBig || false;

        if (isReset && (currCrop.l != left || currCrop.t != top || currCrop.r != right || currCrop.b != bottom)) {
            needCrop = true;
        }
        if (this._inResetMode && !!(left + right + top + bottom)) {
            needCrop = true;
        }

        if (needCrop && originalImageCanvas) {
            autoImageCanvas = null;

            var l = bigImageCanvas.width * left;
            var t = bigImageCanvas.height * top;
            var w = bigImageCanvas.width * (1.0 - right - left);
            var h = bigImageCanvas.height * (1.0 - bottom - top);

            var l2 = originalImageCanvas.width * left;
            var t2 = originalImageCanvas.height * top;
            var w2 = originalImageCanvas.width * (1.0 - right - left);
            var h2 = originalImageCanvas.height * (1.0 - bottom - top);

            this.isCroppedBig = true;

            var canvas = bigImageCanvas;
            if (w2 >= options.maxEditorSizeWidth || h2 >= options.maxEditorSizeWidth) {
                canvas = originalImageCanvas;
                w = w2;
                h = h2;
                l = l2;
                t = t2;
                this.isCroppedBig = false;
            }

            var cropCanvas = document.createElement('canvas');
            cropCanvas.width = w;
            cropCanvas.height = h;

            var context = cropCanvas.getContext('2d');
            context.drawImage(canvas, l, t, w, h, 0, 0, w, h);

            delete imageCanvas;
            imageCanvas = cropCanvas;
        }

        if (this.isAuto()) {
            this._auto();
        }

        if (!isReset) {
            this.lastCrop = {
                t: top,
                l: left,
                b: bottom,
                r: right,
            };
        }

        this._inResetMode = !!isReset;

        onImageUpdate();
    }

    /*
      blurSize  0 .. 1
      position  [ top, left ] // relative, e.g. [0.5, 0.5] is a middle
      type      undefined/1 - common blur, 2 - tiltshift
    */
    this.setBlur = function(blurSize, position, type) {
            this.blurSize = blurSize;
            this.blurPosition = position;
            this.blurType = type || 1;
            this.applyChanges();
        },
        this.getBlur = function() {
            if (this.blurSize === undefined) {
                return undefined;
            }
            return {
                size: this.blurSize,
                position: this.blurPosition,
                type: this.blurType
            }
        },

        this._applyBlur = function() {
            if (!this.blurSize) return;

            _currentContext.extraTexture.ensureFormat(_currentContext.texture);
            _currentContext.texture.use();
            _currentContext.extraTexture.drawTo(function() {
                Shader.getDefaultShader().drawRect();
            });

            _currentContext.extraTexture.use(1);
            this.triangleBlur(this.blurSize * 10);

            this.blurExclusion();
            _currentContext.extraTexture.unuse(1);

            return this;
        }

    this.setFadeImage = function() {
        if (this.fadeRemoving) {
            return false;
        }
        var canvas = _currentContext.canvasEl;

        if (!canvas.parentElement) return;

        re('pe_fade_image_temp');

        var data = _currentContext.gl.canvas.toDataURL('image/jpeg', 0.8);

        var fadeCanvas = document.createElement('canvas');
        fadeCanvas.width = options.width * pixelRatio;
        fadeCanvas.height = options.height * pixelRatio;
        fadeCanvas.style.width = options.width + "px";
        fadeCanvas.style.height = options.height + "px";
        fadeCanvas.id = "pe_fade_image_temp";

        var context = fadeCanvas.getContext('2d');
        context.drawImage(_currentContext.gl.canvas, 0, 0, fadeCanvas.width, fadeCanvas.height);

        canvas.parentElement.appendChild(fadeCanvas);
        setStyle(fadeCanvas, {
            position: 'absolute',
            left: 0,
            top: 0
        });
    }

    this.removeFadeImage = function() {
        if (this.fadeRemoving) {
            return false;
        }
        var fadeCanvasEl = ge('pe_fade_image_temp');
        if (!fadeCanvasEl) return;
        cssAnim(fadeCanvasEl, {
            opacity: 0.0
        }, {
            duration: 200
        });
        this.fadeRemoving = true;
        setTimeout(function() {
            re(fadeCanvasEl);
            fadeCanvasEl = null;
            _this.fadeRemoving = false;
        }, 200);
    }

    this.getCurrentFilter = function() {
            return {
                name: this._currentFilter,
                amount: this._currentFilterAmount
            }
        },

        this.applyFilter = function(name, amount) {
            this._mode = 'filter';

            if (name !== undefined && name != this._currentFilter) {
                this.setFadeImage();
            }

            if (name == undefined) {
                name = this._currentFilter;
                amount = this._currentFilterAmount;
            } else {
                this._currentFilter = name;
                this._currentFilterAmount = amount;
            }

            if (!name || name == 'original') {
                this.revert();
                this._applyBlur();
                this._drawText();
                this.update();
                this.removeFadeImage();
                return;
            }

            if (amount == undefined) {
                amount = 1.0;
            }

            this._applyFilter(name, amount);
        }

    this._applyFilter = function(name, amount) {
        var _this = this;
        //stManager.add(['pe_filters_config.js'], function() {
        var shader = cur.filtersConfig[name];

        if (!shader) return;

        loadImages(shader.maps, function(maps) {
            _this.revert();

            _currentContext.gl[name] = _currentContext.gl[name] || new Shader(null, shader.glsl);

            _currentContext.texture.use();

            var textures = [],
                texturesMap = {},
                txt;
            for (var i = 0; i < maps.length; i++) {
                textures.push(txt = Texture.fromElement(maps[i]));
            }

            for (var i = 0; i < maps.length; i++) {
                textures[i].use(i + 1);
                texturesMap['inputImageTexture' + (i + 1)] = i + 1;
            }

            _currentContext.gl[name].textures(texturesMap);

            simpleShader.call(_this, _currentContext.gl[name], {
                amount: amount
            });

            _this._applyBlur();

            _this._drawText();

            _this.update();

            for (var i = 0; i < maps.length; i++) {
                textures[i].unuse(i + 1);
                textures[i].destroy();
            }

            _this.removeFadeImage();
        });
        //});
    }


    this.triangleBlur = function(radius) {
        _currentContext.gl.triangleBlur = _currentContext.gl.triangleBlur || new Shader(null, '\
      uniform sampler2D texture;\
      uniform vec2 delta;\
      varying vec2 texCoord;\
      void main() {\
        vec4 color = vec4(0.0);\
        float total = 0.0;\
        float offset = fract(sin(dot(gl_FragCoord.xyz, vec3(12.9898, 78.233, 151.7182))) * 43758.5453);\
        \
        for (float t = -30.0; t <= 30.0; t++) {\
          float percent = (t + offset - 0.5) / 30.0;\
          float weight = 1.0 - abs(percent);\
          vec4 sample = texture2D(texture, texCoord + delta * percent);\
          \
          sample.rgb *= sample.a;\
          \
          color += sample * weight;\
          total += weight;\
        }\
        \
        color = color / total;\
        color.rgb /= color.a + 0.00001; \
        gl_FragColor = color; \
      }\
    ');

        simpleShader.call(this, _currentContext.gl.triangleBlur, {
            delta: [radius / options.width, 0]
        });
        simpleShader.call(this, _currentContext.gl.triangleBlur, {
            delta: [0, radius / options.height]
        });

        return this;
    }


    this.blurExclusion = function() {
        _currentContext.gl.blurExclusion = _currentContext.gl.blurExclusion || new Shader(null, '\
      uniform sampler2D texture;\
      uniform sampler2D texture1;\
      uniform vec2 position;\
      varying vec2 texCoord;\
      void main() {\
        vec4 color = texture2D(texture, texCoord); \
        vec2 textureCoordinateToUse = vec2(texCoord.x, texCoord.y);\
        float distanceFromCenter = distance(position, textureCoordinateToUse); \
        color = mix(texture2D(texture1, texCoord), color, clamp(smoothstep(0.3 - 0.2, 0.3, distanceFromCenter), 0.0, 1.0)); \
        gl_FragColor = color; \
        \
      }\
    ').textures({
            texture1: 1
        });

        _currentContext.gl.blurExclusionTiltShift = _currentContext.gl.blurExclusionTiltShift || new Shader(null, '\
      uniform sampler2D texture;\
      uniform sampler2D texture1;\
      uniform vec2 position;\
      varying vec2 texCoord;\
      void main() {\
        vec4 color = texture2D(texture, texCoord); \
        vec2 textureCoordinateToUse = vec2(texCoord.x, texCoord.y); \
        vec2 realPosition = position; \
        realPosition.x = texCoord.x; \
        float distanceFromCenter = distance(realPosition, textureCoordinateToUse); \
        color = mix(texture2D(texture1, texCoord), color, clamp(smoothstep(0.2 - 0.1, 0.2, distanceFromCenter), 0.0, 1.0)); \
        gl_FragColor = color; \
        \
      }\
    ').textures({
            texture1: 1
        });;

        this.blurPosition = this.blurPosition || [0.5, 0.5];

        if (this.blurType == 2) {
            simpleShader.call(this, _currentContext.gl.blurExclusionTiltShift, {
                position: this.blurPosition
            });
        } else {
            simpleShader.call(this, _currentContext.gl.blurExclusion, {
                position: this.blurPosition
            });
        }
        return this;
    }


    this._revertAuto = function() {
        if (this._mode == 'auto') {
            imageCanvas = cleanCroppedImageCanvas;
            _updateCurrentTexture(imageCanvas);
        }
    }

    this.applyParameters = function() {
            this._mode = 'params';
            this.updateTexture();
        },

        this.getExposure = function() {
            if (this.exposure === undefined) {
                this.exposure = 0.5;
            }
            return this.exposure;
        }

    this.getContrast = function() {
        if (this.contrast === undefined) {
            this.contrast = 0.5;
        }
        return this.contrast;
    }

    this.getSaturation = function() {
        if (this.saturation === undefined) {
            this.saturation = 0.5;
        }
        return this.saturation;
    }

    this.getSepia = function() {
        if (this.sepiaAmount === undefined) {
            this.sepiaAmount = 0.5;
        }
        return this.sepiaAmount;
    }

    this.getVignette = function() {
        return this.vignetteAmount || 0;
    }

    this.getSharpness = function() {
        return this.unsharpAmount || 0;
    }

    this.disableParametersUpdate = function(disable) {
        this._disableParametersUpdate = disable;
    }

    // e in range [0..1]
    this.setExposure = function(e) {
            this.exposure = e;
            if (this._disableParametersUpdate) return;
            this.updateTexture();
        },

        // c in range [0..1]
        this.setContrast = function(c) {
            this.contrast = c;
            if (this._disableParametersUpdate) return;
            this.updateTexture();
        },

        // s in range [0..1]
        this.setSaturation = function(s) {
            s = Math.min(0.8, s);
            this.saturation = s;
            if (this._disableParametersUpdate) return;
            this.updateTexture();
        },

        // v in range [0..1]
        this.setVignette = function(v) {
            this.vignetteAmount = v;
            if (this._disableParametersUpdate) return;
            this.updateTexture();
        },

        // s in range [0..1]
        this.setSharpness = function(s) {
            this.unsharpRadius = 3;
            this.unsharpAmount = s;
            if (this._disableParametersUpdate) return;
            this.updateTexture();
        },

        // s in range [0..1]
        this.setSepia = function(s) {
            this.sepiaAmount = s;
            if (this._disableParametersUpdate) return;
            this.updateTexture();
        },

        this.updateFilters = function() {
            if (this._currentFilter == "_params") {
                this.updateTexture();
            } else if (this._currentFilter == "_auto") {
                //this.auto();
            } else {
                this.applyFilter();
            }
        }

    this.save = function() {
        var _this = this;

        var savePhotoEl = new Image();
        savePhotoEl.onload = function() {
            var savePhotoCanvas = document.createElement('canvas');
            savePhotoCanvas.width = savePhotoEl.width;
            savePhotoCanvas.height = savePhotoEl.height;
            var context = savePhotoCanvas.getContext('2d');
            context.drawImage(savePhotoEl, 0, 0);

            for (var i = 0; i < _this.getRotation(); i++) {
                rotateCanvas = document.createElement('canvas');
                rotateCanvas.width = savePhotoCanvas.height;
                rotateCanvas.height = savePhotoCanvas.width;
                var context = rotateCanvas.getContext('2d');
                context.translate(rotateCanvas.width, 0);
                context.rotate(Math.PI / 2);
                context.drawImage(savePhotoCanvas, 0, 0, rotateCanvas.height, rotateCanvas.width);
                delete savePhotoCanvas;
                savePhotoCanvas = rotateCanvas;
            }

            var crop = _this.getLastCrop();

            var l = crop.l * savePhotoCanvas.width;
            var r = crop.r * savePhotoCanvas.width;
            var t = crop.t * savePhotoCanvas.height;
            var b = crop.b * savePhotoCanvas.height;
            var w = savePhotoCanvas.width - l - r;
            var h = savePhotoCanvas.height - t - b;

            var l2 = crop.l * bigImageCanvas.width;
            var r2 = crop.r * bigImageCanvas.width;
            var t2 = crop.t * bigImageCanvas.height;
            var b2 = crop.b * bigImageCanvas.height;
            var w2 = bigImageCanvas.width - l2 - r2;
            var h2 = bigImageCanvas.height - t2 - b2;

            if (w2 > w && options.width > w || h2 > h && options.height > h) {
                savePhotoCanvas = bigImageCanvas;
                l = l2;
                r = r2;
                t = t2;
                b = b2;
                w = w2;
                h = h2;
            }

            var finalCanvas = _this._initCanvas("pe_big_save", w, h);

            imageCanvas = document.createElement('canvas');
            imageCanvas.width = w;
            imageCanvas.height = h;

            context = imageCanvas.getContext('2d');

            if (browser.safari && parseInt(browser.version) >= 8) {
                context.translate(0, imageCanvas.height);
                context.scale(1, -1);
            }

            context.drawImage(savePhotoCanvas, l, t, w, h, 0, 0, w, h);

            _this.isSaving = true;

            _this._setCurrentContext("pe_big_save");

            _this._initialize();

            autoImageCanvas = null;

            if (_this.isAuto()) {
                _this._auto();
            }

            _updateCurrentTexture(imageCanvas);
            _this.setText();
            _this.applyChanges();

            _currentContext.gl.canvas.toBlob(function(blob) {
                var formData = new FormData();
                formData.append('file0', blob, encodeURIComponent('Filtered.jpg'));

                var url = cur.filterSaveOptions.upload_url + '?' + cur.filterSaveOptions.post_data;

                var XHR = (browser.msie && intval(browser.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;
                var xhr = new XHR();
                xhr.open('POST', url, true);

                xhr.onload = function(str) {
                    str = str.target.responseText;
                    var info = parseJSON(str);
                    if (!info) {
                        return;
                    }
                    if (info.bwact == 'album_photo') { // signed
                        FiltersPE.save(str);
                    } else {
                        FiltersPE.save(info);
                    }
                }

                xhr.send(formData);
            }, 'image/jpeg');
        }
        savePhotoEl.crossOrigin = 'Anonymous';
        savePhotoEl.src = bigPhotoSrc;
    }

    this.getText = function() {
        return {
            text: this._text,
            font: this._fontType
        }
    }

    this.setText = function(text, fontType) {
        if (text == undefined && this._text == undefined) return;
        if (text == this._text && this._fontType == fontType) return;

        if (text == undefined) {
            text = this._text;
            fontType = this._fontType;
        }

        this._text = text.substr(0, 200);
        this._fontType = fontType;

        this.textCanvasEl = this.textCanvasEl || document.createElement('canvas');

        this.textCanvasEl.width = imageCanvas.width;
        this.textCanvasEl.height = imageCanvas.height;
        var context = this.textCanvasEl.getContext('2d');

        if (this.isSaving) {
            if (browser.safari && parseInt(browser.version) >= 8) {
                context.translate(0, this.textCanvasEl.height);
                context.scale(1, -1);
            }
        }

        // gradient for Lobster
        if (fontType == 1) {
            context.rect(0, 0, imageCanvas.width, imageCanvas.height);
            var gradient = context.createLinearGradient(0, imageCanvas.height - imageCanvas.width * 0.07, 0, imageCanvas.height);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
            context.fillStyle = gradient;
            context.fill();

            context.shadowColor = "rgba(0, 0, 0, 1)";
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowBlur = imageCanvas.width * 0.006;
        }

        var coeff = 0.3 * Math.max(imageCanvas.width, imageCanvas.height);
        var nominalSize = 0;

        // calc newlines
        if (fontType == 0) {
            nominalSize = coeff * 0.1;
            context.font = "normal " + nominalSize + "px 'ImpactPE'";
        } else {
            nominalSize = coeff * 0.17;
            context.font = "normal " + nominalSize + "px 'Lobster'";
        }

        var maxWidth = imageCanvas.width * 0.8;
        var lines = this._fontType == 0 ? this._text.toUpperCase() : this._text;
        lines = lines.split("\n");
        compiledText = [];
        var lastWrap = false;
        for (var i = 0; i < lines.length || lastWrap; i++) {
            var line = '';
            if (i < lines.length)
                line = lines[i];

            if (lastWrap) {
                i--;
                line = lastWrap;
                lastWrap = false;
            }
            var metrics = context.measureText(line);

            if (metrics.width > maxWidth) {
                var curr = '';
                var ch = 0;

                var lastSpaceIndex = -1;
                while (ch < line.length) {
                    while (ch < line.length) {
                        var fits = context.measureText(curr).width < maxWidth;

                        curr += line[ch];
                        ch++;

                        if (fits && line[ch] == ' ') {
                            lastSpaceIndex = ch;
                        }
                    }
                    if (lastSpaceIndex > 0) {
                        compiledText.push(curr.substr(0, lastSpaceIndex));
                        lastWrap = curr.substr(lastSpaceIndex + 1);
                    } else {
                        compiledText.push(curr);
                        lastWrap = false;
                    }

                    curr = '';
                }
            } else {
                compiledText.push(line);
            }
        }
        lines = compiledText;

        // calc font sizes for
        var impactUpperSize = 9999,
            impactBottomSize = 9999;
        if (fontType == 0) {
            var fontSizes = [];
            for (var i = 1; i <= 100; i += 5) {
                fontSizes.push(i * coeff * 0.0035);
            }

            for (var i = lines.length - 1; i >= 0; i--) {
                var fsz = 0;
                (function me(fontSizes, min, max) {
                    var index = Math.floor((min + max) / 2);

                    fsz = fontSizes[index];
                    context.font = fsz + "px 'ImpactPE'";
                    var textWidth = context.measureText(lines[i]).width;
                    if (min > max) {
                        return textWidth;
                    }
                    if (textWidth > imageCanvas.width * 0.9) {
                        return me(fontSizes, min, index - 1);
                    } else {
                        return me(fontSizes, index + 1, max);
                    }

                })(fontSizes, 0, fontSizes.length - 1);

                if (lines.length > 1 && i == 0) {
                    impactUpperSize = Math.min(fsz, impactUpperSize);
                } else {
                    impactBottomSize = Math.min(fsz, impactBottomSize);
                }
            }
        }

        // render text
        var top;
        if (fontType == 0) {
            top = imageCanvas.height - impactBottomSize * 0.2 - imageCanvas.height * 0.04;
        } else {
            top = imageCanvas.height - nominalSize * 0.7;
        }

        context.strokeStyle = '#000';
        context.fillStyle = '#fff';

        for (var i = lines.length - 1; i >= 0; i--) {
            if (fontType == 0) {
                var sz = 0;
                if (i == 0 && lines.length > 1) {
                    sz = impactUpperSize;
                    top = impactUpperSize * 1.1 + imageCanvas.height * 0.04;
                } else {
                    sz = impactBottomSize;
                }
                lineHeight = sz * 1.1;
                context.font = sz + "px 'ImpactPE'";
                if (impactUpperSize == 9999) {
                    impactUpperSize = impactBottomSize;
                }
                context.lineWidth = Math.max(impactBottomSize, impactUpperSize) * 0.08;
            } else {
                context.font = coeff * 0.2 + "px 'Lobster'";
                lineHeight = coeff * 0.22;
            }

            context.lineJoin = "round";
            var metrics = context.measureText(lines[i]);

            if (fontType == 0) {
                context.strokeText(lines[i], (imageCanvas.width - metrics.width) / 2, top);
                context.fillText(lines[i], (imageCanvas.width - metrics.width) / 2, top);
            } else {
                context.fillText(lines[i], imageCanvas.width / 2 - metrics.width / 2, top);
            }

            top -= lineHeight;
        }

        _currentContext.textTexture = Texture.fromElement(context.canvas);

        this.applyChanges();

        return this._text;
    }

    this.updateTexture = function() {
            if (!_currentContext.isInited) return;

            _currentContext.gl.updateTexture = _currentContext.gl.updateTexture || new Shader(null, '\
        uniform sampler2D originalTexture;\
        uniform sampler2D blurredTexture;\
        uniform float exposure;\
        uniform float contrast;\
        uniform float saturation;\
        uniform float vignetteSize;\
        uniform float vignetteAmount;\
        uniform float unsharpAmount;\
        uniform float sepiaAmount;\
        uniform float ratio;\
        varying vec2 texCoord;\
        \
        float random(vec3 scale, float seed) {\
          return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\
        }\
        \
        void main() {\
            vec4 color = texture2D(originalTexture, texCoord);\
            \
            vec4 blurred = texture2D(blurredTexture, texCoord);\
            color = mix(blurred, color, 1.0 + unsharpAmount);\
            \
            if (contrast > 0.0) { \
                color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5; \
            } else { \
                color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5; \
            } \
            color = vec4(color.rgb * pow(2.0, exposure), color.w); \
            \
            /* saturation adjustment */\
            float average = (color.r + color.g + color.b) / 3.0;\
            if (saturation > 0.0) {\
                color.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - saturation));\
            } else {\
                color.rgb += (average - color.rgb) * (-saturation);\
            }\
            \
            /*sepia*/ \
            float r = color.r;\
            float g = color.g;\
            float b = color.b;\
            color.r = min(1.0, (r * (1.0 - (0.607 * sepiaAmount))) + (g * (0.769 * sepiaAmount)) + (b * (0.189 * sepiaAmount)));\
            color.g = min(1.0, (r * 0.349 * sepiaAmount) + (g * (1.0 - (0.314 * sepiaAmount))) + (b * 0.168 * sepiaAmount));\
            color.b = min(1.0, (r * 0.272 * sepiaAmount) + (g * 0.534 * sepiaAmount) + (b * (1.0 - (0.869 * sepiaAmount))));\
            \
            /* vignette */ \
            \
            float dist = distance(texCoord, vec2(0.5, 0.5));\
            color.rgb *= smoothstep(0.8, vignetteSize * 0.799, dist * (vignetteAmount + vignetteSize));\
            \
            gl_FragColor = color;\
        }\
    ');

            this.revert();

            function mapRange(value, in_min, in_max, out_min, out_max) {
                return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            }

            if (this.unsharpAmount >= 0) {
                _currentContext.extraTexture.ensureFormat(_currentContext.texture);
                _currentContext.texture.use();
                _currentContext.extraTexture.drawTo(function() {
                    Shader.getDefaultShader().drawRect();
                });

                this.triangleBlur(this.unsharpRadius);
                _currentContext.extraTexture.use(1);
                _currentContext.gl.updateTexture.textures({
                    originalTexture: 1
                });
                _currentContext.extraTexture.unuse(1);
            }

            _currentContext.extraTexture.use(1);

            var sepia = this.sepiaAmount;
            sepia = sepia * 2 - 1;
            var exposure = this.exposure;
            exposure = exposure * 2 - 1;
            var contrast = this.contrast;
            contrast = mapRange(contrast * 2 - 1, -1, 1, -0.9, 0.9);
            var saturation = this.saturation;
            saturation = saturation * 2 - 1;

            this.vignetteAmount = this.vignetteAmount || 0;
            var vignetteSize = 0.5 - this.vignetteAmount * 0.4;
            var vignetteAmount = this.vignetteAmount * this.vignetteAmount * 0.1 + 0.5 * this.vignetteAmount;

            simpleShader.call(this, _currentContext.gl.updateTexture, {
                unsharpAmount: this.unsharpAmount || 0,
                exposure: exposure || 0,
                contrast: contrast || 0,
                saturation: saturation || 0,
                vignetteSize: vignetteSize,
                vignetteAmount: vignetteAmount,
                sepiaAmount: sepia || 0,
                blurSize: this.blurSize || 0,
                ratio: imageCanvas.width / imageCanvas.height
            });
            _currentContext.extraTexture.unuse(1);

            if (this.blurSize > 0) {
                _currentContext.extraTexture.ensureFormat(_currentContext.texture);
                _currentContext.texture.use();
                _currentContext.extraTexture.drawTo(function() {
                    Shader.getDefaultShader().drawRect();
                });

                _currentContext.extraTexture.use(1);
                this.triangleBlur(this.blurSize * 12);

                this.blurExclusion();
                _currentContext.extraTexture.unuse(1);
            }

            this._drawText();

            this.update();
        },

        this._drawText = function() {
            if (this._text) {
                _currentContext.gl.textShader = _currentContext.gl.textShader || new Shader(null, '\
        uniform sampler2D originalTexture;\
        uniform sampler2D textTexture;\
        varying vec2 texCoord;\
        void main() {\
            vec4 color = texture2D(originalTexture, texCoord);\
            vec4 tc = texture2D(textTexture, texCoord);\
            color = mix(color, tc, tc.a); color.a = 1.0; \
            gl_FragColor = color;\
        }\
      ');

                _currentContext.textTexture.use(10);

                _currentContext.gl.textShader.textures({
                    textTexture: 10
                });

                simpleShader.call(this, _currentContext.gl.textShader, {});

                _currentContext.textTexture.unuse(10);
            }
        }


    this._initCanvas = function(id, width, height) {
        var context = _contexts[id] = _contexts[id] || {};
        var canvasEl = _contexts[id].canvasEl;

        if (!canvasEl) {

            context.canvasEl = ge(id);

            if (!context.canvasEl) {
                context.canvasEl = document.createElement('canvas');
                context.canvasEl.id = id;

                context.canvasEl.width = width || options.width * pixelRatio;
                context.canvasEl.height = height || options.height * pixelRatio;

                context.canvasEl.style.width = options.width + "px";
                context.canvasEl.style.height = options.height + "px";
            }

            try {
                var ctxOptions = {
                    preserveDrawingBuffer: true,
                    premultipliedAlpha: false
                };
                context.gl = context.canvasEl.getContext('webgl', ctxOptions) || context.canvasEl.getContext('experimental-webgl', ctxOptions);
            } catch (e) {}

            if (!context.gl) {
                throw 'Couldn\'t init webgl';
            }

            canvasEl = context.canvasEl;
            _contexts[id] = context;
        } else {
            canvasEl.width = pixelRatio * (width || options.width);
            canvasEl.height = pixelRatio * (height || options.height);

            canvasEl.style.width = options.width + "px";
            canvasEl.style.height = options.height + "px";
        }

        return canvasEl;
    }

    this.update = function() {
        _currentContext.texture.use();
        _currentContext.flippedShader.drawRect();
        return this;
    }

    var _currentContext = null;
    this._setCurrentContext = function(id) {
        _currentContext = _contexts[id];
    }

    this._initialize = function() {
        var context = _currentContext;

        if (!context.isInited) {
            var type = context.gl.UNSIGNED_BYTE;

            if (context.texture) context.texture.destroy();
            if (context.spareTexture) context.spareTexture.destroy();
            if (context.extraTexture) context.extraTexture.destroy();

            context.texture = new Texture(context.canvasEl.width, context.canvasEl.height, context.gl.RGBA, type);
            context.spareTexture = new Texture(context.canvasEl.width, context.canvasEl.height, context.gl.RGBA, type);
            context.extraTexture = new Texture(0, 0, context.gl.RGBA, type);
            context.textTexture = new Texture(0, 0, context.gl.RGBA, type);
            context.flippedShader = new Shader(null, '\
          uniform sampler2D texture;\
          varying vec2 texCoord;\
          void main() {\
              vec4 color = texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y)); \
              gl_FragColor = color; \
          }\
      ');

            context.isInited = true;
        }
    }

    var Texture = (function() {
        Texture.fromElement = function(element) {
            var context = _currentContext;
            var texture = new Texture(0, 0, context.gl.RGBA, context.gl.UNSIGNED_BYTE);
            texture.loadContentsOf(element);
            return texture;
        };

        function Texture(width, height, format, type) {
            var context = _currentContext;

            this.id = context.gl.createTexture();
            this.width = width;
            this.height = height;
            this.format = format;
            this.type = type;

            context.gl.bindTexture(context.gl.TEXTURE_2D, this.id);
            context.gl.texParameteri(context.gl.TEXTURE_2D, context.gl.TEXTURE_MAG_FILTER, context.gl.LINEAR);
            context.gl.texParameteri(context.gl.TEXTURE_2D, context.gl.TEXTURE_MIN_FILTER, context.gl.LINEAR);
            context.gl.texParameteri(context.gl.TEXTURE_2D, context.gl.TEXTURE_WRAP_S, context.gl.CLAMP_TO_EDGE);
            context.gl.texParameteri(context.gl.TEXTURE_2D, context.gl.TEXTURE_WRAP_T, context.gl.CLAMP_TO_EDGE);
            if (width && height) context.gl.texImage2D(context.gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, null);
        }

        Texture.prototype.loadContentsOf = function(element) {
            var context = _currentContext;

            this.width = element.width || element.videoWidth;
            this.height = element.height || element.videoHeight;
            context.gl.bindTexture(context.gl.TEXTURE_2D, this.id);
            context.gl.texImage2D(context.gl.TEXTURE_2D, 0, this.format, this.format, this.type, element);
        };

        Texture.prototype.destroy = function() {
            _currentContext.gl.deleteTexture(this.id);
            this.id = null;
        };

        Texture.prototype.use = function(unit) {
            _currentContext.gl.activeTexture(_currentContext.gl.TEXTURE0 + (unit || 0));
            _currentContext.gl.bindTexture(_currentContext.gl.TEXTURE_2D, this.id);
        };

        Texture.prototype.unuse = function(unit) {
            _currentContext.gl.activeTexture(_currentContext.gl.TEXTURE0 + (unit || 0));
            _currentContext.gl.bindTexture(_currentContext.gl.TEXTURE_2D, null);
        };

        Texture.prototype.ensureFormat = function(width, height, format, type) {
            if (arguments.length == 1) {
                var texture = arguments[0];
                width = texture.width;
                height = texture.height;
                format = texture.format;
                type = texture.type;
            }

            if (width != this.width || height != this.height || format != this.format || type != this.type) {
                this.width = width;
                this.height = height;
                this.format = format;
                this.type = type;
                _currentContext.gl.bindTexture(_currentContext.gl.TEXTURE_2D, this.id);
                _currentContext.gl.texImage2D(_currentContext.gl.TEXTURE_2D, 0, this.format, width, height, 0, this.format, this.type, null);
            }
        };

        Texture.prototype.drawTo = function(callback) {
            _currentContext.gl.framebuffer = _currentContext.gl.framebuffer || _currentContext.gl.createFramebuffer();
            _currentContext.gl.bindFramebuffer(_currentContext.gl.FRAMEBUFFER, _currentContext.gl.framebuffer);
            _currentContext.gl.framebufferTexture2D(_currentContext.gl.FRAMEBUFFER, _currentContext.gl.COLOR_ATTACHMENT0, _currentContext.gl.TEXTURE_2D, this.id, 0);
            if (_currentContext.gl.checkFramebufferStatus(_currentContext.gl.FRAMEBUFFER) !== _currentContext.gl.FRAMEBUFFER_COMPLETE) {
                throw new Error('incomplete framebuffer');
            }
            _currentContext.gl.viewport(0, 0, this.width, this.height);
            callback();
            _currentContext.gl.bindFramebuffer(_currentContext.gl.FRAMEBUFFER, null);
        };

        var canvas = null;

        Texture.prototype.swapWith = function(other) {
            var temp;
            temp = other.id;
            other.id = this.id;
            this.id = temp;
            temp = other.width;
            other.width = this.width;
            this.width = temp;
            temp = other.height;
            other.height = this.height;
            this.height = temp;
            temp = other.format;
            other.format = this.format;
            this.format = temp;
        };

        return Texture;
    })();


    var Shader = (function() {
        function isArray(obj) {
            return Object.prototype.toString.call(obj) == '[object Array]';
        }

        function isNumber(obj) {
            return Object.prototype.toString.call(obj) == '[object Number]';
        }

        function compileSource(type, source) {
            var context = _currentContext;
            var shader = context.gl.createShader(type);
            context.gl.shaderSource(shader, source);
            context.gl.compileShader(shader);
            if (!context.gl.getShaderParameter(shader, context.gl.COMPILE_STATUS)) {
                throw 'compile error: ' + context.gl.getShaderInfoLog(shader);
            }
            return shader;
        }

        var defaultVertexSource = '\
      attribute vec2 vertex;\
      attribute vec2 _texCoord;\
      varying vec2 texCoord;\
      void main() {\
          texCoord = _texCoord;\
          gl_Position = vec4(vertex * 2.0 - 1.0, 0.0, 1.0);\
      }';

        var defaultFragmentSource = '\
      uniform sampler2D texture;\
      varying vec2 texCoord;\
      void main() {\
          vec4 color = texture2D(texture, texCoord);\
          gl_FragColor = color;\
      }';

        function Shader(vertexSource, fragmentSource) {
            var context = _currentContext;
            this.vertexAttribute = null;
            this.texCoordAttribute = null;
            this.program = context.gl.createProgram();
            vertexSource = vertexSource || defaultVertexSource;
            fragmentSource = fragmentSource || defaultFragmentSource;
            fragmentSource = 'precision highp float;' + fragmentSource; // annoying requirement is annoying
            context.gl.attachShader(this.program, compileSource(context.gl.VERTEX_SHADER, vertexSource));
            context.gl.attachShader(this.program, compileSource(context.gl.FRAGMENT_SHADER, fragmentSource));
            context.gl.linkProgram(this.program);
            if (!context.gl.getProgramParameter(this.program, context.gl.LINK_STATUS)) {
                throw 'link error: ' + context.gl.getProgramInfoLog(this.program);
            }
        }

        Shader.prototype.destroy = function() {
            _currentContext.gl.deleteProgram(this.program);
            this.program = null;
        };

        Shader.prototype.uniforms = function(uniforms) {
            var context = _currentContext;
            context.gl.useProgram(this.program);
            for (var name in uniforms) {
                if (!uniforms.hasOwnProperty(name)) continue;
                var location = context.gl.getUniformLocation(this.program, name);
                if (location === null) continue;
                var value = uniforms[name];
                if (isArray(value)) {
                    switch (value.length) {
                        case 1:
                            context.gl.uniform1fv(location, new Float32Array(value));
                            break;
                        case 2:
                            context.gl.uniform2fv(location, new Float32Array(value));
                            break;
                        case 3:
                            context.gl.uniform3fv(location, new Float32Array(value));
                            break;
                        case 4:
                            context.gl.uniform4fv(location, new Float32Array(value));
                            break;
                        case 9:
                            context.gl.uniformMatrix3fv(location, false, new Float32Array(value));
                            break;
                        case 16:
                            context.gl.uniformMatrix4fv(location, false, new Float32Array(value));
                            break;
                        default:
                            throw 'erro while loading uniform "' + name + '" of length ' + value.length;
                    }
                } else if (isNumber(value)) {
                    context.gl.uniform1f(location, value);
                } else {
                    throw 'attempted to set uniform "' + name + '" to invalid value ' + (value || 'undefined').toString();
                }
            }
            return this;
        };

        Shader.prototype.textures = function(textures) {
            var context = _currentContext;
            context.gl.useProgram(this.program);
            for (var name in textures) {
                if (!textures.hasOwnProperty(name)) continue;
                context.gl.uniform1i(context.gl.getUniformLocation(this.program, name), textures[name]);
            }
            return this;
        };

        Shader.prototype.drawRect = function(left, top, right, bottom) {
            var undefined;
            var context = _currentContext;

            var viewport = context.gl.getParameter(context.gl.VIEWPORT);
            top = top !== undefined ? (top - viewport[1]) / viewport[3] : 0;
            left = left !== undefined ? (left - viewport[0]) / viewport[2] : 0;
            right = right !== undefined ? (right - viewport[0]) / viewport[2] : 1;
            bottom = bottom !== undefined ? (bottom - viewport[1]) / viewport[3] : 1;

            if (!context.gl.vertexBuffer) {
                context.gl.vertexBuffer = context.gl.createBuffer();
            }
            context.gl.bindBuffer(context.gl.ARRAY_BUFFER, context.gl.vertexBuffer);
            context.gl.bufferData(context.gl.ARRAY_BUFFER, new Float32Array([left, top, left, bottom, right, top, right, bottom]), context.gl.STATIC_DRAW);
            if (!context.gl.texCoordBuffer) {
                context.gl.texCoordBuffer = context.gl.createBuffer();
                context.gl.bindBuffer(context.gl.ARRAY_BUFFER, context.gl.texCoordBuffer);
                context.gl.bufferData(context.gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), context.gl.STATIC_DRAW);
            }
            if (!this.vertexAttribute) {
                this.vertexAttribute = context.gl.getAttribLocation(this.program, 'vertex');
                context.gl.enableVertexAttribArray(this.vertexAttribute);
            }
            if (!this.texCoordAttribute) {
                this.texCoordAttribute = context.gl.getAttribLocation(this.program, '_texCoord');
                context.gl.enableVertexAttribArray(this.texCoordAttribute);
            }
            context.gl.useProgram(this.program);
            context.gl.bindBuffer(context.gl.ARRAY_BUFFER, context.gl.vertexBuffer);
            context.gl.vertexAttribPointer(this.vertexAttribute, 2, context.gl.FLOAT, false, 0, 0);
            context.gl.bindBuffer(context.gl.ARRAY_BUFFER, context.gl.texCoordBuffer);
            context.gl.vertexAttribPointer(this.texCoordAttribute, 2, context.gl.FLOAT, false, 0, 0);
            context.gl.drawArrays(context.gl.TRIANGLE_STRIP, 0, 4);
        };

        Shader.getDefaultShader = function() {
            var context = _currentContext;
            context.gl.defaultShader = context.gl.defaultShader || new Shader();
            return context.gl.defaultShader;
        };

        return Shader;
    })();


    this.applyAuto = function(enabled) {
        this.autoEnabled = (enabled === undefined) ? !this.autoEnabled : enabled;
        if (this.autoEnabled) {
            this._auto();
        } else {
            if (cleanCroppedImageCanvas) {
                delete imageCanvas;
                imageCanvas = cleanCroppedImageCanvas;
                cleanCroppedImageCanvas = null;
            }
        }
        if (imageCanvas) {
            onImageUpdate();
        }
    }

    this.isAuto = function() {
        return !!this.autoEnabled;
    }

    this._auto = function(smin, smax) {
        var _this = this;

        if (!smin) {
            smin = smax = 1;
        }

        smax = smin;

        if (autoImageCanvas) {
            if (!cleanCroppedImageCanvas) {
                cleanCroppedImageCanvas = imageCanvas;
            }
            imageCanvas = autoImageCanvas;
            return;
        }

        var autoCanvas = document.createElement('canvas');
        autoCanvas.width = imageCanvas.width;
        autoCanvas.height = imageCanvas.height;
        var context = autoCanvas.getContext('2d');
        context.drawImage(imageCanvas, 0, 0, imageCanvas.width, imageCanvas.height);

        var _this = this;

        var w = imageCanvas.width;
        var h = imageCanvas.height;
        var size = w * h;
        var UCHAR_MAX = 255;

        var imageData = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        var data = imageData.data;

        function quantiles_u8(size, nb_min, nb_max, chan) {
            var h_size = UCHAR_MAX + 1;
            var histo = [];
            for (var i = 0; i < (UCHAR_MAX + 1); i++)
                histo.push(0);

            var i, pi = 0;
            for (i = 0; i < size; i++) {
                pi = i * 4;
                histo[data[pi + chan]] += 1;
            }
            for (i = 1; i < h_size; i++) {
                histo[i] += histo[i - 1];
            }
            var res = {};
            i = 0;
            while (i < h_size && histo[i] <= nb_min) i++;
            res.min = i;

            i = h_size - 1;
            while (i < h_size && histo[i] > (size - nb_max)) i--;
            if (i < h_size - 1) i++;
            res.max = i;

            return res;
        }

        function rescale_u8(size, min, max, chan) {
            var i;

            if (max <= min)
                for (i = 0; i < size; i++) {
                    pi = i * 4;
                    data[pi + chan] = UCHAR_MAX / 2;
                }
            else {
                var norm = new Array(UCHAR_MAX + 1);
                for (i = 0; i < min; i++)
                    norm[i] = 0;
                for (i = min; i < max; i++)
                    norm[i] = ((i - min) * UCHAR_MAX / (max - min) + 0.5);
                for (i = max; i < UCHAR_MAX + 1; i++)
                    norm[i] = UCHAR_MAX;
                for (i = 0; i < size; i++) {
                    pi = i * 4;
                    data[pi + chan] = norm[data[pi + chan]];
                }
            }
        }

        function balance_u8(size, nb_min, nb_max, chan) {
            var min, max;

            if (nb_min + nb_max >= size) {
                nb_min = (size - 1) / 2;
                nb_max = (size - 1) / 2;
            }

            if (0 != nb_min || 0 != nb_max) {
                var res = quantiles_u8(size, nb_min, nb_max, chan);
                min = res.min;
                max = res.max;
            } else {
                var res = minmax_u8(size, chan);
                min = res.min;
                max = res.max;
            }

            rescale_u8(size, min, max, chan);
        }

        function colorbalance_rgb_u8(size, nb_min, nb_max) {
            balance_u8(size, nb_min, nb_max, 0);
            balance_u8(size, nb_min, nb_max, 1);
            balance_u8(size, nb_min, nb_max, 2);
        }

        colorbalance_rgb_u8(size, size * (smin / 100), size * (smax / 100.0));

        context.putImageData(imageData, 0, 0);

        autoImageCanvas = document.createElement('canvas');
        autoImageCanvas.width = imageCanvas.width;
        autoImageCanvas.height = imageCanvas.height;
        var context = autoImageCanvas.getContext('2d');
        context.drawImage(autoCanvas, 0, 0, autoCanvas.width, autoCanvas.height);

        cleanCroppedImageCanvas = imageCanvas;

        imageCanvas = autoCanvas;
    }

    function _debounce(func, wait) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = new Date().getTime() - timestamp;

            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = new Date().getTime();
            var callNow = !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    this._applyFilter = _debounce(this._applyFilter, 10);
}


try {
    stManager.done('pe.js');
} catch (e) {}