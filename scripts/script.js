window.onload = ()=> {
    let htmlArea = document.querySelector(".editor-html");
    let cssArea = document.querySelector(".editor-css");
    let jsArea = document.querySelector(".editor-js");
    const run = document.querySelector("#run");
    const download = document.querySelector("#download");
    const htmlTab = document.querySelector(".tab-html");
    const cssTab = document.querySelector(".tab-css");
    const jsTab = document.querySelector(".tab-js");
    htmlArea.value='<!DOCTYPE html>\n<html lang="en">\n<head>\n      <meta charset="UTF-8">\n      <meta http-equiv="X-UA-Compatible" content="IE=edge">\n      <meta name="viewport" content="width=device-width, initial-scale=1.0">\n      <title>Document</title>\n</head>\n<body>\n</body>\n</html>'
    
    const html = CodeMirror.fromTextArea(htmlArea,{
        lineNumbers:true,
        mode:"htmlmixed",
        tabSize:6,
        theme:"dracula",
        lineWrapping: true
    });

    const css = CodeMirror.fromTextArea(cssArea,{
        lineNumbers:true,
        mode:"css",
        tabSize:4,
        theme:"dracula",
        lineWrapping: true
    });

    const js = CodeMirror.fromTextArea(jsArea,{
        lineNumbers:true,
        mode:"javascript",
        tabSize:6,
        theme:"dracula",
        lineWrapping: true
    });
    
    htmlArea = $('.CodeMirror')[0].CodeMirror.getWrapperElement();
    cssArea = $('.CodeMirror')[1].CodeMirror.getWrapperElement();
    jsArea = $('.CodeMirror')[2].CodeMirror.getWrapperElement();
    $(cssArea).hide()
    $(jsArea).hide()
    $(htmlTab).on("click",function(){
        $(htmlArea).show()
        $(cssArea).hide()
        $(jsArea).hide()
        if(!$(htmlTab).hasClass('selected')){
            $(htmlTab).addClass('selected')
            $(cssTab).removeClass('selected')
            $(jsTab).removeClass('selected')
        }
    });
    $(cssTab).on("click",function(){
        $(htmlArea).hide()
        $(cssArea).show()
        $(jsArea).hide()
        if(!$(cssTab).hasClass('selected')){
            $(cssTab).addClass('selected')
            $(htmlTab).removeClass('selected')
            $(jsTab).removeClass('selected')
        }
    });
    $(jsTab).on("click",function(){
        $(htmlArea).hide()
        $(cssArea).hide()
        $(jsArea).show()
        if(!$(jsTab).hasClass('selected')){
            $(jsTab).addClass('selected')
            $(cssTab).removeClass('selected')
            $(htmlTab).removeClass('selected')
        }
    });
}
$(window).on("load",function(){
let [dark,light] = document.querySelectorAll(".dl")
$(dark).on("click",function(){
    if(!$("body").hasClass("dark")){
        $("body").addClass("dark")
        $("body").removeClass("light")
    }
})
$(light).on("click",function(){
    if(!$("body").hasClass("light")){
        $("body").addClass("light")
        $("body").removeClass("dark")
    }
})
$(".menu-openclose").on("click",function(){
    if($(".menu").css("display")=="none"){
        $(".menu").show();
        $(this).css("left",$(".menu").innerWidth()+"px")
        $(this).addClass("rotate")
    }else{
        $(".menu").hide();
        $(this).css("left",0)
        $(this).removeClass("rotate")
    }
})
$('#download').click(function(){
    codes = getCode()
    let html = codes[0];
    let css = codes[1];
    let js = codes[2];
    var zip = new JSZip();
    zip.file("index.html", html);
    var styles = zip.folder("styles");
    styles.file("style.css", css);
    var scripts = zip.folder("scripts");
    scripts.file("script.js", js);
    zip.generateAsync({type:"base64"}).then(function (content) {
        location.href="data:application/zip;base64," + content;
    });
})

})



//reload form
// var warning = true;
// window.onbeforeunload = function() { 
//   if (warning) {
//     return "Reload page?";
//   }
// }
// $('form').submit(function() {
//    window.onbeforeunload = null;
// });

function getCode() {
    let codes = $(".CodeMirror-code")
    let htmlCodeLines = $(codes[0]).children().children(".CodeMirror-line");
    let cssCodeLines = $(codes[1]).children().children(".CodeMirror-line");
    let jsCodeLines = $(codes[2]).children().children(".CodeMirror-line");
    let htmlCode = '';
    let cssCode = '';
    let jsCode = '';

    for (let i = 0; i < htmlCodeLines.length; i++) {
        htmlCode+=htmlCodeLines[i].innerText + "\n"
        if(i==htmlCodeLines.length-3){
            htmlCode+='    <!-- SCRIPT -->\n';
            htmlCode+='    <script src="scripts/script.js"></script>\n';
        }
        if(i==2){
            htmlCode+='    <!-- STYLE -->\n';
            htmlCode+='    <link rel="stylesheet" href="styles/style.css">\n';
        }
    }

    for (let i = 0; i < cssCodeLines.length; i++) {
        cssCode+=cssCodeLines[i].innerText + "\n"
    }

    for (let i = 0; i < jsCodeLines.length; i++) {
        jsCode+=jsCodeLines[i].innerText + "\n"
    }
    htmlCode = htmlCode.replaceAll("      ","    ")
    cssCode = cssCode.replaceAll("  ","  ")
    jsCode = jsCode.replaceAll("      ","    ")
    return [htmlCode,cssCode,jsCode]
    // console.log(htmlCode);
    // console.log(cssCode);
    // console.log(jsCode);
}