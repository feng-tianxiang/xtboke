if ((location.href || '').indexOf('vconsole=true') > -1) {
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda.min.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-fps.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-memory.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-orientation.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-timing1.1.3.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-touches1.0.1.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-features1.0.2.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-code1.0.0.js"><\/script>');
    document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-benchmark1.0.0.js"><\/script>');
    // document.write('<script src="//www.xtboke.com/webstyle/js/eruda/eruda-dom1.1.0.js"><\/script>');
    
    document.write('<script>eruda.init();<\/script>');
    // 展示页面的 fps 信息
    // eruda.add(erudaFps).show('fps').show();
    document.write('<script>eruda.add(erudaFps);<\/script>');
    // 展示页面内存信息。    
    // eruda.add(erudaMemory).show('memory').show()
    document.write('<script>eruda.add(erudaMemory);<\/script>');
    // 测试重力感应接口。    
    // eruda.add(erudaOrientation).show('orientation').show()
    document.write('<script>eruda.add(erudaOrientation);<\/script>');
    // 展示性能资源数据。    
    // eruda.add(erudaTiming).show('timing').show()
    document.write('<script>eruda.add(erudaTiming);<\/script>');
    // 可视化屏幕 Touch 事件触发    
    // eruda.add(erudaTouches).show('touches').show()
    document.write('<script>eruda.add(erudaTouches);<\/script>');
    // 浏览器特性检测。 
    // eruda.add(erudaFeatures).show('features').show()
    document.write('<script>eruda.add(erudaFeatures);<\/script>');
    // 运行 JavaScript 代码。 
    // eruda.add(erudaCode).show('code').show()
    document.write('<script>eruda.add(erudaCode);<\/script>'); 
    // 运行 JavaScript 性能测试。 
    // eruda.add(erudaBenchmark).show('benchmark').show()
    document.write('<script>eruda.add(erudaBenchmark);<\/script>'); 
    // 浏览 dom 树   
    // eruda.add(erudaDom).show('dom').show()
    // document.write('<script>eruda.add(erudaDom);<\/script>');
}