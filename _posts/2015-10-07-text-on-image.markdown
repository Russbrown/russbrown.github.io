---
layout: post
title:  "Text On Image Maker"
date:   2015-10-07 09:00:00
categories: Canvas
---

<label name="job">Job</label>
<input type="text" class="job-input" name="job"/>

<label name="place">Place</label>
<input type="text" class="place-input" name="place"/>
<button class="place">Go</button>

<canvas id="myCanvas" width="1024" height="512"></canvas>

<br>

<br>

<a id="download">Download as image</a>

<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

<script>
$(document).ready(function () {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();

    imageObj.onload = function () {
        context.drawImage(imageObj, 0, 0);
        
        context.font = "bold 28px FS Albert Pro";
        context.fillStyle = "#683277";
        context.fillText("#ProjectManager", 25, 50);
        
        context.font = "bold 28px FS Albert Pro";
        context.fillStyle = "#683277";
        context.fillText("#Birmingham", 25, 100);
    };

    imageObj.src = '/img/hiring.jpg';

	function downloadCanvas(link, canvasId, filename) {
	    link.href = document.getElementById(canvasId).toDataURL();
	    link.download = filename;
	}
    
    function clearCanvas(cnv) {
      var ctx = cnv.getContext('2d');     // gets reference to canvas context
      ctx.beginPath();    // clear existing drawing paths
      ctx.save();         // store the current transformation matrix

      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cnv.width, cnv.height);

      ctx.restore();        // restore the transform
    }
    
    $(".job, .place").on("click", function(){
        var job = $('.job-input').val();
        var place = $('.place-input').val();
        
        clearCanvas(document.getElementById('myCanvas'));
        
        context.drawImage(imageObj, 0, 0);
        
        context.font = "bold 28px FS Albert Pro";
        context.fillStyle = "#683277";
        context.fillText("#" + job, 25, 50);
        
        context.font = "bold 28px FS Albert Pro";
        context.fillStyle = "#683277";
        context.fillText("#" + place, 25, 100);
    });
    
	document.getElementById('download').addEventListener('click', function() {
    	downloadCanvas(this, 'myCanvas', 'test.png');
	}, false);

});
</script>
