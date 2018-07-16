/*
 Highcharts JS v6.1.0 (2018-04-13)
 Boost module

 (c) 2010-2017 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(t){"object"===typeof module&&module.exports?module.exports=t:t(Highcharts)})(function(t){(function(h){function t(){var a=Array.prototype.slice.call(arguments),c=-Number.MAX_VALUE;n(a,function(a){if("undefined"!==typeof a&&null!==a&&"undefined"!==typeof a.length&&0<a.length)return c=a.length,!0});return c}function ba(a){var c=0,e=0,f=I(a.options.boost&&a.options.boost.allowForce,!0),b;if("undefined"!==typeof a.boostForceChartBoost)return a.boostForceChartBoost;if(1<a.series.length)for(var k=
0;k<a.series.length;k++)b=a.series[k],K[b.type]&&++e,t(b.processedXData,b.options.data,b.points)>=(b.options.boostThreshold||Number.MAX_VALUE)&&++c;a.boostForceChartBoost=f&&e===a.series.length&&0<c||5<c;return a.boostForceChartBoost}function ja(a){function c(b,d){d=a.createShader("vertex"===d?a.VERTEX_SHADER:a.FRAGMENT_SHADER);a.shaderSource(d,b);a.compileShader(d);return a.getShaderParameter(d,a.COMPILE_STATUS)?d:!1}function e(){function b(b){return a.getUniformLocation(k,b)}var e=c("#version 100\nprecision highp float;\nattribute vec4 aVertexPosition;\nattribute vec4 aColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform mat4 uPMatrix;\nuniform float pSize;\nuniform float translatedThreshold;\nuniform bool hasThreshold;\nuniform bool skipTranslation;\nuniform float plotHeight;\nuniform float xAxisTrans;\nuniform float xAxisMin;\nuniform float xAxisMinPad;\nuniform float xAxisPointRange;\nuniform float xAxisLen;\nuniform bool  xAxisPostTranslate;\nuniform float xAxisOrdinalSlope;\nuniform float xAxisOrdinalOffset;\nuniform float xAxisPos;\nuniform bool  xAxisCVSCoord;\nuniform float yAxisTrans;\nuniform float yAxisMin;\nuniform float yAxisMinPad;\nuniform float yAxisPointRange;\nuniform float yAxisLen;\nuniform bool  yAxisPostTranslate;\nuniform float yAxisOrdinalSlope;\nuniform float yAxisOrdinalOffset;\nuniform float yAxisPos;\nuniform bool  yAxisCVSCoord;\nuniform bool  isBubble;\nuniform bool  bubbleSizeByArea;\nuniform float bubbleZMin;\nuniform float bubbleZMax;\nuniform float bubbleZThreshold;\nuniform float bubbleMinSize;\nuniform float bubbleMaxSize;\nuniform bool  bubbleSizeAbs;\nuniform bool  isInverted;\nfloat bubbleRadius(){\nfloat value \x3d aVertexPosition.w;\nfloat zMax \x3d bubbleZMax;\nfloat zMin \x3d bubbleZMin;\nfloat radius \x3d 0.0;\nfloat pos \x3d 0.0;\nfloat zRange \x3d zMax - zMin;\nif (bubbleSizeAbs){\nvalue \x3d value - bubbleZThreshold;\nzMax \x3d max(zMax - bubbleZThreshold, zMin - bubbleZThreshold);\nzMin \x3d 0.0;\n}\nif (value \x3c zMin){\nradius \x3d bubbleZMin / 2.0 - 1.0;\n} else {\npos \x3d zRange \x3e 0.0 ? (value - zMin) / zRange : 0.5;\nif (bubbleSizeByArea \x26\x26 pos \x3e 0.0){\npos \x3d sqrt(pos);\n}\nradius \x3d ceil(bubbleMinSize + pos * (bubbleMaxSize - bubbleMinSize)) / 2.0;\n}\nreturn radius * 2.0;\n}\nfloat translate(float val,\nfloat pointPlacement,\nfloat localA,\nfloat localMin,\nfloat minPixelPadding,\nfloat pointRange,\nfloat len,\nbool  cvsCoord\n){\nfloat sign \x3d 1.0;\nfloat cvsOffset \x3d 0.0;\nif (cvsCoord) {\nsign *\x3d -1.0;\ncvsOffset \x3d len;\n}\nreturn sign * (val - localMin) * localA + cvsOffset + \n(sign * minPixelPadding);\n}\nfloat xToPixels(float value){\nif (skipTranslation){\nreturn value;// + xAxisPos;\n}\nreturn translate(value, 0.0, xAxisTrans, xAxisMin, xAxisMinPad, xAxisPointRange, xAxisLen, xAxisCVSCoord);// + xAxisPos;\n}\nfloat yToPixels(float value, float checkTreshold){\nfloat v;\nif (skipTranslation){\nv \x3d value;// + yAxisPos;\n} else {\nv \x3d translate(value, 0.0, yAxisTrans, yAxisMin, yAxisMinPad, yAxisPointRange, yAxisLen, yAxisCVSCoord);// + yAxisPos;\nif (v \x3e plotHeight) {\nv \x3d plotHeight;\n}\n}\nif (checkTreshold \x3e 0.0 \x26\x26 hasThreshold) {\nv \x3d min(v, translatedThreshold);\n}\nreturn v;\n}\nvoid main(void) {\nif (isBubble){\ngl_PointSize \x3d bubbleRadius();\n} else {\ngl_PointSize \x3d pSize;\n}\nvColor \x3d aColor;\nif (isInverted) {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.y) + yAxisPos, yToPixels(aVertexPosition.x, aVertexPosition.z) + xAxisPos, 0.0, 1.0);\n} else {\ngl_Position \x3d uPMatrix * vec4(xToPixels(aVertexPosition.x) + xAxisPos, yToPixels(aVertexPosition.y, aVertexPosition.z) + yAxisPos, 0.0, 1.0);\n}\n}",
"vertex"),f=c("precision highp float;\nuniform vec4 fillColor;\nvarying highp vec2 position;\nvarying highp vec4 vColor;\nuniform sampler2D uSampler;\nuniform bool isCircle;\nuniform bool hasColor;\nvoid main(void) {\nvec4 col \x3d fillColor;\nvec4 tcol;\nif (hasColor) {\ncol \x3d vColor;\n}\nif (isCircle) {\ntcol \x3d texture2D(uSampler, gl_PointCoord.st);\ncol *\x3d tcol;\nif (tcol.r \x3c 0.0) {\ndiscard;\n} else {\ngl_FragColor \x3d col;\n}\n} else {\ngl_FragColor \x3d col;\n}\n}","fragment");
if(!e||!f)return k=!1;k=a.createProgram();a.attachShader(k,e);a.attachShader(k,f);a.linkProgram(k);a.useProgram(k);a.bindAttribLocation(k,0,"aVertexPosition");h=b("uPMatrix");l=b("pSize");N=b("fillColor");m=b("isBubble");g=b("bubbleSizeAbs");B=b("bubbleSizeByArea");v=b("uSampler");d=b("skipTranslation");p=b("isCircle");n=b("isInverted");E=b("plotHeight");return!0}function f(d,c){d=b[d]=b[d]||a.getUniformLocation(k,d);a.uniform1f(d,c)}var b={},k,h,l,N,m,g,B,d,p,n,E,v;a&&e();return{psUniform:function(){return l},
pUniform:function(){return h},fillColorUniform:function(){return N},setPlotHeight:function(b){a.uniform1f(E,b)},setBubbleUniforms:function(b,d,c){var e=b.options,k=Number.MAX_VALUE,h=-Number.MAX_VALUE;"bubble"===b.type&&(k=I(e.zMin,Math.min(k,Math.max(d,!1===e.displayNegative?e.zThreshold:-Number.MAX_VALUE))),h=I(e.zMax,Math.max(h,c)),a.uniform1i(m,1),a.uniform1i(p,1),a.uniform1i(B,"width"!==b.options.sizeBy),a.uniform1i(g,b.options.sizeByAbsoluteValue),f("bubbleZMin",k),f("bubbleZMax",h),f("bubbleZThreshold",
b.options.zThreshold),f("bubbleMinSize",b.minPxSize),f("bubbleMaxSize",b.maxPxSize))},bind:function(){a.useProgram(k)},program:function(){return k},create:e,setUniform:f,setPMatrix:function(b){a.uniformMatrix4fv(h,!1,b)},setColor:function(b){a.uniform4f(N,b[0]/255,b[1]/255,b[2]/255,b[3])},setPointSize:function(b){a.uniform1f(l,b)},setSkipTranslation:function(b){a.uniform1i(d,!0===b?1:0)},setTexture:function(){a.uniform1i(v,0)},setDrawAsCircle:function(b){a.uniform1i(p,b?1:0)},reset:function(){a.uniform1i(m,
0);a.uniform1i(p,0)},setInverted:function(b){a.uniform1i(n,b)},destroy:function(){a&&k&&(a.deleteProgram(k),k=!1)}}}function T(a,c,e){function f(){b&&(a.deleteBuffer(b),k=b=!1);n=0;h=e||2;m=[]}var b=!1,k=!1,h=e||2,l=!1,n=0,m;return{destroy:f,bind:function(){if(!b)return!1;a.vertexAttribPointer(k,h,a.FLOAT,!1,0,0)},data:m,build:function(e,B,d){var g;m=e||[];if(!(m&&0!==m.length||l))return f(),!1;h=d||h;b&&a.deleteBuffer(b);l||(g=new Float32Array(m));b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,b);
a.bufferData(a.ARRAY_BUFFER,l||g,a.STATIC_DRAW);k=a.getAttribLocation(c.program(),B);a.enableVertexAttribArray(k);return!0},render:function(c,e,d){var f=l?l.length:m.length;if(!b||!f)return!1;if(!c||c>f||0>c)c=0;if(!e||e>f)e=f;a.drawArrays(a[(d||"points").toUpperCase()],c/h,(e-c)/h);return!0},allocate:function(a){n=-1;l=new Float32Array(4*a)},push:function(a,b,d,c){l&&(l[++n]=a,l[++n]=b,l[++n]=d,l[++n]=c)}}}function la(a){function c(a){var b,d;return a.isSeriesBoosting?(b=!!a.options.stacking,d=a.xData||
a.options.xData||a.processedXData,b=(b?a.data:d||a.options.data).length,"treemap"===a.type?b*=12:"heatmap"===a.type?b*=6:K[a.type]&&(b*=2),b):0}function e(){d.clear(d.COLOR_BUFFER_BIT|d.DEPTH_BUFFER_BIT)}function f(a,b){function d(a){a&&(b.colorData.push(a[0]),b.colorData.push(a[1]),b.colorData.push(a[2]),b.colorData.push(a[3]))}function c(a,b,c,e,f){d(f);q.usePreallocated?B.push(a,b,c?1:0,e||1):(E.push(a),E.push(b),E.push(c?1:0),E.push(e||1))}function e(){b.segments.length&&(b.segments[b.segments.length-
1].to=E.length)}function f(){b.segments.length&&b.segments[b.segments.length-1].from===E.length||(e(),b.segments.push({from:E.length}))}function F(a,b,e,f,F){d(F);c(a+e,b);d(F);c(a,b);d(F);c(a,b+f);d(F);c(a,b+f);d(F);c(a+e,b+f);d(F);c(a+e,b)}function Q(a){q.useGPUTranslations||(b.skipTranslation=!0,a.x=ca.toPixels(a.x,!0),a.y=G.toPixels(a.y,!0));c(a.x,a.y,0,2)}var g=a.pointArrayMap&&"low,high"===a.pointArrayMap.join(","),k=a.chart,l=a.options,v=!!l.stacking,m=l.data,p=a.xAxis.getExtremes(),x=p.min,
p=p.max,w=a.yAxis.getExtremes(),z=w.min,w=w.max,t=a.xData||l.xData||a.processedXData,A=a.yData||l.yData||a.processedYData,D=a.zData||l.zData||a.processedZData,G=a.yAxis,ca=a.xAxis,I=a.chart.plotHeight,L=a.chart.plotWidth,W=!t||0===t.length,S=l.connectNulls,r=a.points||!1,N=!1,J=!1,y,U,V,m=v?a.data:t||m,t={x:-Number.MAX_VALUE,y:0},H={x:Number.MIN_VALUE,y:0},O=0,u,M,C=-1,Y=!1,Z=!1,aa,ka="undefined"===typeof k.index,P=!1,X=!1,ba=K[a.type],T=!1,R=!0;if(!(l.boostData&&0<l.boostData.length)){k.inverted&&
(I=a.chart.plotWidth,L=a.chart.plotHeight);a.closestPointRangePx=Number.MAX_VALUE;f();if(r&&0<r.length)b.skipTranslation=!0,b.drawMode="triangles",r[0].node&&r[0].node.levelDynamic&&r.sort(function(a,b){if(a.node){if(a.node.levelDynamic>b.node.levelDynamic)return 1;if(a.node.levelDynamic<b.node.levelDynamic)return-1}return 0}),n(r,function(b){var d=b.plotY,c;"undefined"===typeof d||isNaN(d)||null===b.y||(d=b.shapeArgs,c=b.series.colorAttribs(b),b=c["stroke-width"]||0,U=h.color(c.fill).rgba,U[0]/=
255,U[1]/=255,U[2]/=255,"treemap"===a.type&&(b=b||1,V=h.color(c.stroke).rgba,V[0]/=255,V[1]/=255,V[2]/=255,F(d.x,d.y,d.width,d.height,V),b/=2),"heatmap"===a.type&&k.inverted&&(d.x=ca.len-d.x,d.y=G.len-d.y,d.width=-d.width,d.height=-d.height),F(d.x+b,d.y+b,d.width-2*b,d.height-2*b,U))});else{for(;C<m.length-1;){y=m[++C];if(ka)break;W?(r=y[0],u=y[1],m[C+1]&&(Z=m[C+1][0]),m[C-1]&&(Y=m[C-1][0]),3<=y.length&&(M=y[2],y[2]>b.zMax&&(b.zMax=y[2]),y[2]<b.zMin&&(b.zMin=y[2]))):(r=y,u=A[C],m[C+1]&&(Z=m[C+1]),
m[C-1]&&(Y=m[C-1]),D&&D.length&&(M=D[C],D[C]>b.zMax&&(b.zMax=D[C]),D[C]<b.zMin&&(b.zMin=D[C])));if(S||null!==r&&null!==u){if(Z&&Z>=x&&Z<=p&&(P=!0),Y&&Y>=x&&Y<=p&&(X=!0),g?(W&&(u=y.slice(1,3)),aa=u[0],u=u[1]):v&&(r=y.x,u=y.stackY,aa=u-y.y),null!==z&&"undefined"!==typeof z&&null!==w&&"undefined"!==typeof w&&(R=u>=z&&u<=w),r>p&&H.x<p&&(H.x=r,H.y=u),r<x&&t.x<x&&(t.x=r,t.y=u),null!==u||!S)if(null!==u&&R){if(r>=x&&r<=p&&(T=!0),T||P||X){q.useGPUTranslations||(b.skipTranslation=!0,r=ca.toPixels(r,!0),u=G.toPixels(u,
!0),u>I&&(u=I),r>L&&(r=L));if(ba){y=aa;if(!1===aa||"undefined"===typeof aa)y=0>u?u:0;q.useGPUTranslations||(y=G.toPixels(y,!0));c(r,y,0,0,!1)}b.hasMarkers&&!1!==N&&(a.closestPointRangePx=Math.min(a.closestPointRangePx,Math.abs(r-N)));!q.useGPUTranslations&&!q.usePreallocated&&N&&1>r-N&&J&&1>Math.abs(u-J)?q.debug.showSkipSummary&&++O:(l.step&&c(r,J,0,2,!1),c(r,u,0,"bubble"===a.type?M||1:2,!1),N=r,J=u)}}else f()}else f()}q.debug.showSkipSummary&&console.log("skipped points:",O);!N&&!1!==S&&t>-Number.MAX_VALUE&&
H<Number.MAX_VALUE&&(Q(t),Q(H))}e()}}function b(){x=[];W.data=E=[];A=[];B&&B.destroy()}function k(a){g&&(g.setUniform("xAxisTrans",a.transA),g.setUniform("xAxisMin",a.min),g.setUniform("xAxisMinPad",a.minPixelPadding),g.setUniform("xAxisPointRange",a.pointRange),g.setUniform("xAxisLen",a.len),g.setUniform("xAxisPos",a.pos),g.setUniform("xAxisCVSCoord",!a.horiz))}function v(a){g&&(g.setUniform("yAxisTrans",a.transA),g.setUniform("yAxisMin",a.min),g.setUniform("yAxisMinPad",a.minPixelPadding),g.setUniform("yAxisPointRange",
a.pointRange),g.setUniform("yAxisLen",a.len),g.setUniform("yAxisPos",a.pos),g.setUniform("yAxisCVSCoord",!a.horiz))}function l(a,b){g.setUniform("hasThreshold",a);g.setUniform("translatedThreshold",b)}function w(c){if(c)p=c.chartWidth||800,D=c.chartHeight||400;else return!1;if(!d||!p||!D)return!1;q.debug.timeRendering&&console.time("gl rendering");d.canvas.width=p;d.canvas.height=D;g.bind();d.viewport(0,0,p,D);g.setPMatrix([2/p,0,0,0,0,-(2/D),0,0,0,0,-2,0,-1,1,-1,1]);g.setPlotHeight(c.plotHeight);
1<q.lineWidth&&!h.isMS&&d.lineWidth(q.lineWidth);B.build(W.data,"aVertexPosition",4);B.bind();t&&(d.bindTexture(d.TEXTURE_2D,G),g.setTexture(G));g.setInverted(c.inverted);n(x,function(a,b){b=a.series.options;var c;c="undefined"!==typeof b.lineWidth?b.lineWidth:1;var e=b.threshold,f=H(e),F=a.series.yAxis.getThreshold(e),m,e=I(b.marker?b.marker.enabled:null,a.series.xAxis.isRadial?!0:null,a.series.closestPointRangePx>2*((b.marker?b.marker.radius:10)||10)),p;m=a.series.markerGroup&&a.series.markerGroup.getStyle("fill");
a.series.fillOpacity&&b.fillOpacity&&(m=(new R(m)).setOpacity(I(b.fillOpacity,1)).get());p=h.color(m).rgba;q.useAlpha||(p[3]=1);"lines"===a.drawMode&&q.useAlpha&&1>p[3]&&(p[3]/=10);"add"===b.boostBlending?(d.blendFunc(d.SRC_ALPHA,d.ONE),d.blendEquation(d.FUNC_ADD)):"mult"===b.boostBlending?d.blendFunc(d.DST_COLOR,d.ZERO):"darken"===b.boostBlending?(d.blendFunc(d.ONE,d.ONE),d.blendEquation(d.FUNC_MIN)):d.blendFuncSeparate(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA,d.ONE,d.ONE_MINUS_SRC_ALPHA);g.reset();0<a.colorData.length&&
(g.setUniform("hasColor",1),m=T(d,g),m.build(a.colorData,"aColor",4),m.bind());g.setColor(p);k(a.series.xAxis);v(a.series.yAxis);l(f,F);"points"===a.drawMode&&(b.marker&&b.marker.radius?g.setPointSize(2*b.marker.radius):g.setPointSize(1));g.setSkipTranslation(a.skipTranslation);"bubble"===a.series.type&&g.setBubbleUniforms(a.series,a.zMin,a.zMax);g.setDrawAsCircle(J[a.series.type]&&t||!1);if(0<c||"line_strip"!==a.drawMode)for(c=0;c<a.segments.length;c++)B.render(a.segments[c].from,a.segments[c].to,
a.drawMode);if(a.hasMarkers&&e)for(b.marker&&b.marker.radius?g.setPointSize(2*b.marker.radius):g.setPointSize(10),g.setDrawAsCircle(!0),c=0;c<a.segments.length;c++)B.render(a.segments[c].from,a.segments[c].to,"POINTS")});q.debug.timeRendering&&console.timeEnd("gl rendering");a&&a();b()}function m(a){e();if(a.renderer.forExport)return w(a);S?w(a):setTimeout(function(){m(a)},1)}var g=!1,B=!1,d=!1,p=0,D=0,E=!1,A=!1,t=!1,W={},S=!1,x=[],L=O.createElement("canvas"),z=L.getContext("2d"),G,K={column:!0,columnrange:!0,
bar:!0,area:!0,arearange:!0},J={scatter:!0,bubble:!0},q={pointSize:1,lineWidth:1,fillColor:"#AA00AA",useAlpha:!0,usePreallocated:!1,useGPUTranslations:!1,debug:{timeRendering:!1,timeSeriesProcessing:!1,timeSetup:!1,timeBufferCopy:!1,timeKDTree:!1,showSkipSummary:!1}};return W={allocateBufferForSingleSeries:function(a){var b=0;q.usePreallocated&&(a.isSeriesBoosting&&(b=c(a)),B.allocate(b))},pushSeries:function(a){0<x.length&&x[x.length-1].hasMarkers&&(x[x.length-1].markerTo=A.length);q.debug.timeSeriesProcessing&&
console.time("building "+a.type+" series");x.push({segments:[],markerFrom:A.length,colorData:[],series:a,zMin:Number.MAX_VALUE,zMax:-Number.MAX_VALUE,hasMarkers:a.options.marker?!1!==a.options.marker.enabled:!1,showMarksers:!0,drawMode:{area:"lines",arearange:"lines",areaspline:"line_strip",column:"lines",columnrange:"lines",bar:"lines",line:"line_strip",scatter:"points",heatmap:"triangles",treemap:"triangles",bubble:"points"}[a.type]||"line_strip"});f(a,x[x.length-1]);q.debug.timeSeriesProcessing&&
console.timeEnd("building "+a.type+" series")},setSize:function(a,b){if(p!==a||b!==b)p=a,D=b,g.bind(),g.setPMatrix([2/p,0,0,0,0,-(2/D),0,0,0,0,-2,0,-1,1,-1,1])},inited:function(){return S},setThreshold:l,init:function(a,c){var e=0,f=["webgl","experimental-webgl","moz-webgl","webkit-3d"];S=!1;if(!a)return!1;for(q.debug.timeSetup&&console.time("gl setup");e<f.length&&!(d=a.getContext(f[e],{}));e++);if(d)c||b();else return!1;d.enable(d.BLEND);d.blendFunc(d.SRC_ALPHA,d.ONE_MINUS_SRC_ALPHA);d.disable(d.DEPTH_TEST);
d.depthFunc(d.LESS);g=ja(d);B=T(d,g);t=!1;G=d.createTexture();L.width=512;L.height=512;z.mozImageSmoothingEnabled=!1;z.webkitImageSmoothingEnabled=!1;z.msImageSmoothingEnabled=!1;z.imageSmoothingEnabled=!1;z.strokeStyle="rgba(255, 255, 255, 0)";z.fillStyle="#FFF";z.beginPath();z.arc(256,256,256,0,2*Math.PI);z.stroke();z.fill();try{d.bindTexture(d.TEXTURE_2D,G),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,d.RGBA,d.UNSIGNED_BYTE,L),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,
d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.LINEAR),d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.LINEAR),d.bindTexture(d.TEXTURE_2D,null),t=!0}catch(sa){}S=!0;q.debug.timeSetup&&console.timeEnd("gl setup");return!0},render:m,settings:q,valid:function(){return!1!==d},clear:e,flush:b,setXAxis:k,setYAxis:v,data:E,gl:function(){return d},allocateBuffer:function(a){var b=0;q.usePreallocated&&(n(a.series,function(a){a.isSeriesBoosting&&(b+=c(a))}),B.allocate(b))},
destroy:function(){b();B.destroy();g.destroy();d&&(G&&d.deleteTexture(G),d.canvas.width=1,d.canvas.height=1)},setOptions:function(a){ma(!0,q,a)}}}function da(a,c){var e=a.chartWidth,f=a.chartHeight,b=a,k=a.seriesGroup||c.group,n=O.implementation.hasFeature("www.http://w3.org/TR/SVG11/feature#Extensibility","1.1"),b=a.isChartSeriesBoosting()?a:c,n=!1;b.renderTarget||(b.canvas=na,a.renderer.forExport||!n?(b.renderTarget=a.renderer.image("",0,0,e,f).addClass("highcharts-boost-canvas").add(k),b.boostClear=
function(){b.renderTarget.attr({href:""})},b.boostCopy=function(){b.boostResizeTarget();b.renderTarget.attr({href:b.canvas.toDataURL("image/png")})}):(b.renderTargetFo=a.renderer.createElement("foreignObject").add(k),b.renderTarget=O.createElement("canvas"),b.renderTargetCtx=b.renderTarget.getContext("2d"),b.renderTargetFo.element.appendChild(b.renderTarget),b.boostClear=function(){b.renderTarget.width=b.canvas.width;b.renderTarget.height=b.canvas.height},b.boostCopy=function(){b.renderTarget.width=
b.canvas.width;b.renderTarget.height=b.canvas.height;b.renderTargetCtx.drawImage(b.canvas,0,0)}),b.boostResizeTarget=function(){e=a.chartWidth;f=a.chartHeight;(b.renderTargetFo||b.renderTarget).attr({x:0,y:0,width:e,height:f}).css({pointerEvents:"none",mixedBlendMode:"normal",opacity:1});b instanceof h.Chart&&b.markerGroup.translate(a.plotLeft,a.plotTop)},b.boostClipRect=a.renderer.clipRect(),(b.renderTargetFo||b.renderTarget).clip(b.boostClipRect),b instanceof h.Chart&&(b.markerGroup=b.renderer.g().add(k),
b.markerGroup.translate(c.xAxis.pos,c.yAxis.pos)));b.canvas.width=e;b.canvas.height=f;b.boostClipRect.attr(a.getBoostClipRect(b));b.boostResizeTarget();b.boostClear();b.ogl||(b.ogl=la(function(){b.ogl.settings.debug.timeBufferCopy&&console.time("buffer copy");b.boostCopy();b.ogl.settings.debug.timeBufferCopy&&console.timeEnd("buffer copy")}),b.ogl.init(b.canvas),b.ogl.setOptions(a.options.boost||{}),b instanceof h.Chart&&b.ogl.allocateBuffer(a));b.ogl.setSize(e,f);return b.ogl}function ea(a,c,e){a&&
c.renderTarget&&c.canvas&&!(e||c.chart).isChartSeriesBoosting()&&a.render(e||c.chart)}function fa(a,c){a&&c.renderTarget&&c.canvas&&!c.chart.isChartSeriesBoosting()&&a.allocateBufferForSingleSeries(c)}function oa(a){var c=!0;this.chart.options&&this.chart.options.boost&&(c="undefined"===typeof this.chart.options.boost.enabled?!0:this.chart.options.boost.enabled);if(!c||!this.isSeriesBoosting)return a.call(this);this.chart.isBoosting=!0;if(a=da(this.chart,this))fa(a,this),a.pushSeries(this);ea(a,this)}
var J=h.win,O=J.document,pa=function(){},ga=h.Chart,R=h.Color,v=h.Series,w=h.seriesTypes,n=h.each,ha=h.extend,M=h.addEvent,qa=h.fireEvent,ra=h.grep,H=h.isNumber,ma=h.merge,I=h.pick,A=h.wrap,P=h.getOptions().plotOptions,na=O.createElement("canvas"),X,ia="area arearange column columnrange bar line scatter heatmap bubble treemap".split(" "),K={};n(ia,function(a){K[a]=1});R.prototype.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",
bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",
darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",feldspar:"#d19275",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",
indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslateblue:"#8470ff",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",
magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",
palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",
teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",violetred:"#d02090",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};ga.prototype.isChartSeriesBoosting=function(){return I(this.options.boost&&this.options.boost.seriesThreshold,50)<=this.series.length||ba(this)};ga.prototype.getBoostClipRect=function(a){var c={x:this.plotLeft,y:this.plotTop,width:this.plotWidth,height:this.plotHeight};a===this&&n(this.yAxis,function(a){c.y=
Math.min(a.pos,c.y);c.height=Math.max(a.pos-this.plotTop+a.len,c.height)},this);return c};h.eachAsync=function(a,c,e,f,b,k){b=b||0;f=f||3E4;for(var n=b+f,l=!0;l&&b<n&&b<a.length;)l=c(a[b],b),++b;l&&(b<a.length?k?h.eachAsync(a,c,e,f,b,k):J.requestAnimationFrame?J.requestAnimationFrame(function(){h.eachAsync(a,c,e,f,b)}):setTimeout(function(){h.eachAsync(a,c,e,f,b)}):e&&e())};v.prototype.getPoint=function(a){var c=a,e=this.xData||this.options.xData||this.processedXData||!1;!a||a instanceof this.pointClass||
(c=(new this.pointClass).init(this,this.options.data[a.i],e?e[a.i]:void 0),c.category=c.x,c.dist=a.dist,c.distX=a.distX,c.plotX=a.plotX,c.plotY=a.plotY,c.index=a.i);return c};A(v.prototype,"searchPoint",function(a){return this.getPoint(a.apply(this,[].slice.call(arguments,1)))});M(v,"destroy",function(){var a=this,c=a.chart;c.markerGroup===a.markerGroup&&(a.markerGroup=null);c.hoverPoints&&(c.hoverPoints=ra(c.hoverPoints,function(c){return c.series===a}));c.hoverPoint&&c.hoverPoint.series===a&&(c.hoverPoint=
null)});A(v.prototype,"getExtremes",function(a){if(!this.isSeriesBoosting||!this.hasExtremes||!this.hasExtremes())return a.apply(this,Array.prototype.slice.call(arguments,1))});n(ia,function(a){P[a]&&(P[a].boostThreshold=5E3,P[a].boostData=[],w[a].prototype.fillOpacity=!0)});n(["translate","generatePoints","drawTracker","drawPoints","render"],function(a){function c(c){var e=this.options.stacking&&("translate"===a||"generatePoints"===a),b=I(this.chart&&this.chart.options&&this.chart.options.boost&&
this.chart.options.boost.enabled,!0);if(!this.isSeriesBoosting||e||!b||"heatmap"===this.type||"treemap"===this.type||!K[this.type])c.call(this);else if(this[a+"Canvas"])this[a+"Canvas"]()}A(v.prototype,a,c);"translate"===a&&n("column bar arearange columnrange heatmap treemap".split(" "),function(e){w[e]&&A(w[e].prototype,a,c)})});A(v.prototype,"processData",function(a){function c(a){return e.chart.isChartSeriesBoosting()||(a?a.length:0)>=(e.options.boostThreshold||Number.MAX_VALUE)}var e=this,f=this.options.data;
K[this.type]?(c(f)&&"heatmap"!==this.type&&"treemap"!==this.type&&!this.options.stacking&&this.hasExtremes&&this.hasExtremes(!0)||(a.apply(this,Array.prototype.slice.call(arguments,1)),f=this.processedXData),(this.isSeriesBoosting=c(f))?this.enterBoost():this.exitBoost&&this.exitBoost()):a.apply(this,Array.prototype.slice.call(arguments,1))});M(v,"hide",function(){this.canvas&&this.renderTarget&&(this.ogl&&this.ogl.clear(),this.boostClear())});v.prototype.enterBoost=function(){this.alteredByBoost=
[];n(["allowDG","directTouch","stickyTracking"],function(a){this.alteredByBoost.push({prop:a,val:this[a],own:this.hasOwnProperty(a)})},this);this.directTouch=this.allowDG=!1;this.stickyTracking=!0;this.animate=null;this.labelBySeries&&(this.labelBySeries=this.labelBySeries.destroy())};v.prototype.exitBoost=function(){n(this.alteredByBoost||[],function(a){a.own?this[a.prop]=a.val:delete this[a.prop]},this);this.boostClear&&this.boostClear()};v.prototype.hasExtremes=function(a){var c=this.options,e=
this.xAxis&&this.xAxis.options,f=this.yAxis&&this.yAxis.options;return c.data.length>(c.boostThreshold||Number.MAX_VALUE)&&H(f.min)&&H(f.max)&&(!a||H(e.min)&&H(e.max))};v.prototype.destroyGraphics=function(){var a=this,c=this.points,e,f;if(c)for(f=0;f<c.length;f+=1)(e=c[f])&&e.destroyElements&&e.destroyElements();n(["graph","area","tracker"],function(b){a[b]&&(a[b]=a[b].destroy())})};h.hasWebGLSupport=function(){var a=0,c,e=["webgl","experimental-webgl","moz-webgl","webkit-3d"],f=!1;if("undefined"!==
typeof J.WebGLRenderingContext)for(c=O.createElement("canvas");a<e.length;a++)try{if(f=c.getContext(e[a]),"undefined"!==typeof f&&null!==f)return!0}catch(b){}return!1};h.hasWebGLSupport()?(h.extend(v.prototype,{renderCanvas:function(){function a(a,b){var c,e,f=!1,g="undefined"===typeof k.index,h=!0;if(!g&&(M?(c=a[0],e=a[1]):(c=a,e=m[b]),L?(M&&(e=a.slice(1,3)),f=e[0],e=e[1]):z&&(c=a.x,e=a.stackY,f=e-a.y),O||(h=e>=p&&e<=w),null!==e&&c>=v&&c<=d&&h))if(a=Math.ceil(n.toPixels(c,!0)),I){if(void 0===Q||
a===A){L||(f=e);if(void 0===K||e>F)F=e,K=b;if(void 0===Q||f<q)q=f,Q=b}a!==A&&(void 0!==Q&&(e=l.toPixels(F,!0),x=l.toPixels(q,!0),R(a,e,K),x!==e&&R(a,x,Q)),Q=K=void 0,A=a)}else e=Math.ceil(l.toPixels(e,!0)),R(a,e,b);return!g}function c(){qa(e,"renderedCanvas");delete e.buildKDTree;e.buildKDTree();P.debug.timeKDTree&&console.timeEnd("kd tree building")}var e=this,f=e.options||{},b=!1,k=e.chart,n=this.xAxis,l=this.yAxis,t=f.xData||e.processedXData,m=f.yData||e.processedYData,g=f.data,b=n.getExtremes(),
v=b.min,d=b.max,b=l.getExtremes(),p=b.min,w=b.max,E={},A,I=!!e.sampling,H,J=!1!==f.enableMouseTracking,x=l.getThreshold(f.threshold),L=e.pointArrayMap&&"low,high"===e.pointArrayMap.join(","),z=!!f.stacking,G=e.cropStart||0,O=e.requireSorting,M=!t,q,F,Q,K,P,T=this.xData||this.options.xData||this.processedXData||!1,R=function(a,b,c){X=a+","+b;J&&!E[X]&&(E[X]=!0,k.inverted&&(a=n.len-a,b=l.len-b),H.push({x:T?T[G+c]:!1,clientX:a,plotX:a,plotY:b,i:G+c}))},b=da(k,e);k.isBoosting=!0;P=b.settings;if(this.visible){if(this.points||
this.graph)this.animate=null,this.destroyGraphics();k.isChartSeriesBoosting()?(this.markerGroup=k.markerGroup,this.renderTarget&&(this.renderTarget=this.renderTarget.destroy())):this.markerGroup=e.plotGroup("markerGroup","markers",!0,1,k.seriesGroup);H=this.points=[];e.buildKDTree=pa;b&&(fa(b,this),b.pushSeries(e),ea(b,this,k));k.renderer.forExport||(P.debug.timeKDTree&&console.time("kd tree building"),h.eachAsync(z?e.data:t||g,a,c))}}}),n(["heatmap","treemap"],function(a){w[a]&&A(w[a].prototype,
"drawPoints",oa)}),w.bubble&&(delete w.bubble.prototype.buildKDTree,A(w.bubble.prototype,"markerAttribs",function(a){return this.isSeriesBoosting?!1:a.apply(this,[].slice.call(arguments,1))})),w.scatter.prototype.fill=!0,ha(w.area.prototype,{fill:!0,fillOpacity:!0,sampling:!0}),ha(w.column.prototype,{fill:!0,sampling:!0}),h.Chart.prototype.callbacks.push(function(a){M(a,"predraw",function(){a.boostForceChartBoost=void 0;a.boostForceChartBoost=ba(a);a.isBoosting=!1;!a.isChartSeriesBoosting()&&a.didBoost&&
(a.didBoost=!1);a.boostClear&&a.boostClear();a.canvas&&a.ogl&&a.isChartSeriesBoosting()&&(a.didBoost=!0,a.ogl.allocateBuffer(a));a.markerGroup&&a.xAxis&&0<a.xAxis.length&&a.yAxis&&0<a.yAxis.length&&a.markerGroup.translate(a.xAxis[0].pos,a.yAxis[0].pos)});M(a,"render",function(){a.ogl&&a.isChartSeriesBoosting()&&a.ogl.render(a)})})):"undefined"!==typeof h.initCanvasBoost?h.initCanvasBoost():h.error(26)})(t)});
