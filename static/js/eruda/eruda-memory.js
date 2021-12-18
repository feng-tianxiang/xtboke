// Modified from https://github.com/mrdoob/stats.js/

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.erudaMemory = factory()
  }
})(this, function() {
  var w = window.innerWidth

  return function(eruda) {
    var WIDTH = w,
      HEIGHT = 192,
      TEXT_X = 12,
      TEXT_Y = 8,
      GRAPH_X = 12,
      GRAPH_Y = 40,
      GRAPH_WIDTH = w - 24,
      GRAPH_HEIGHT = 142,
      BACK_COLOR = '#fff',
      FORE_COLOR = '#009688',
      STEP = 2,
      NAME = 'MB'

    var util = eruda.util,
      Settings = eruda.Settings,
      round = Math.round,
      Tool = eruda.Tool

    var Memory = Tool.extend({
      name: 'memory',
      init: function($el, container) {
        this.callSuper(Tool, 'init', arguments)

        this._style = util.evalCss(
          [
            '.eruda-dev-tools .eruda-tools .eruda-memory {padding: 10px !important;}',
            'canvas {width: 100%; border-radius: 4px; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 3px 1px -2px rgba(0, 0, 0, 0.2);}',
            '.eruda-not-supported {background: #f44336; color: #fff; padding: 10px; border-radius: 4px; text-align: center; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .05), 0 1px 4px 0 rgba(0, 0, 0, .08), 0 3px 1px -2px rgba(0, 0, 0, .2)}'
          ].join('.eruda-dev-tools .eruda-tools .eruda-memory ')
        )
        this._container = container
        this._isRunning = false
        this._beginTime = util.now()
        this._prevTime = this._beginTime
        this._frames = 0
        this._min = Infinity
        this._max = 0
        this._alwaysActivated = true
        this._appendTpl()
        this._initCanvas()
        this._initCfg()
      },
      show: function() {
        this._start()

        this.callSuper(Tool, 'show', arguments)
      },
      hide: function() {
        if (!this._alwaysActivated) this._stop()

        this.callSuper(Tool, 'hide', arguments)
      },
      destroy: function() {
        this._stop()
        util.evalCss.remove(this._style)
        this.callSuper(Tool, 'destroy', arguments)
        this._rmCfg()
      },
      _rmCfg: function() {
        var cfg = this.config

        var settings = this._container.get('settings')
        if (!settings) return

        settings.remove(cfg, 'alwaysActivated').remove('Memory')
      },
      _start: function() {
        var memory = performance.memory
        if (!memory) {
          this._$el.html(
            '<div class="eruda-not-supported">Not supported for this browser!</div>'
          )
          return
        }

        if (this._isRunning) return

        var self = this

        this._isRunning = true

        function loop() {
          if (!self._isRunning) return

          self._update()
          requestAnimationFrame(loop)
        }

        loop()
      },
      _stop: function() {
        this._isRunning = false
        this._beginTime = util.now()
        this._prevTime = this._beginTime
        this._frames = 0
      },
      _appendTpl: function() {
        this._$el.html('<canvas></canvas>')

        this._canvas = this._$el.find('canvas').get(0)
        this._ctx = this._canvas.getContext('2d')
      },
      _initCanvas: function() {
        var canvas = this._canvas,
          ctx = this._ctx

        canvas.width = WIDTH
        canvas.height = HEIGHT

        ctx.font = 'bold 18px Helvetica,Arial,sans-serif'
        ctx.textBaseline = 'top'

        ctx.fillStyle = BACK_COLOR
        ctx.fillRect(0, 0, WIDTH, HEIGHT)

        ctx.fillStyle = FORE_COLOR
        ctx.fillText(NAME, TEXT_X, TEXT_Y)
        ctx.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT)

        ctx.fillStyle = BACK_COLOR
        ctx.globalAlpha = 0.9
        ctx.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT)
      },
      _initCfg: function() {
        var container = this._container
        var cfg = (this.config = Settings.createCfg('eruda-memory', {
          alwaysActivated: true
        }))

        if (!cfg.get('alwaysActivated')) this._alwaysActivated = false

        var self = this

        cfg.on('change', function(key, val) {
          switch (key) {
            case 'alwaysActivated':
              self._alwaysActivated = val
              return
          }
        })

        var settings = container.get('settings')

        settings
          .text('Memory')
          .switch(cfg, 'alwaysActivated', 'Always Activated')
          .separator()
      },
      _update: function() {
        this._frames++

        var prevTime = this._prevTime,
          time = util.now()

        // Only update one time per second.
        if (time > prevTime + 1000) {
          var memory = performance.memory
          this._draw(
            memory.usedJSHeapSize / 1048576,
            memory.totalJSHeapSize / 1048576
          )
          this._prevTime = time
          this._frames = 0
        }

        this._beginTime = time
      },
      _draw: function(val, maxVal) {
        this._min = Math.min(this._min, val)
        this._max = Math.max(this._max, val)

        var min = this._min,
          max = this._max,
          canvas = this._canvas,
          ctx = this._ctx

        ctx.fillStyle = BACK_COLOR
        ctx.globalAlpha = 1
        ctx.fillRect(0, 0, WIDTH, GRAPH_Y)
        ctx.fillStyle = FORE_COLOR
        ctx.fillText(
          round(val) + '' + NAME + ' (' + round(min) + '-' + round(max) + ')',
          TEXT_X,
          TEXT_Y
        )

        ctx.drawImage(
          canvas,
          GRAPH_X + STEP,
          GRAPH_Y,
          GRAPH_WIDTH - STEP,
          GRAPH_HEIGHT,
          GRAPH_X,
          GRAPH_Y,
          GRAPH_WIDTH - STEP,
          GRAPH_HEIGHT
        )

        ctx.fillRect(GRAPH_X + GRAPH_WIDTH - STEP, GRAPH_Y, STEP, GRAPH_HEIGHT)

        ctx.fillStyle = BACK_COLOR
        ctx.globalAlpha = 0.9
        ctx.fillRect(
          GRAPH_X + GRAPH_WIDTH - STEP,
          GRAPH_Y,
          STEP,
          round((1 - val / maxVal) * GRAPH_HEIGHT)
        )
      }
    })

    return new Memory()
  }
})
