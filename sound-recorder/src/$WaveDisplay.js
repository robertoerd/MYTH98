
function $WaveDisplay(){
	var wave_canvas = new Canvas(112, 35);
	wave_canvas.ctx.fillStyle = "lime";
	wave_canvas.ctx.fillRect(0, 17, wave_canvas.width, 1);
	
	var analyser = audio_context.createAnalyser();
	var data = new Uint8Array(analyser.fftSize = 2048);
	
	var $wave_display = $(wave_canvas);
	$wave_display.analyser = analyser;
	
	var t = 0;
	$wave_display.on("update", function(){
		
		analyser.getByteTimeDomainData(data);
		
		wave_canvas.ctx.clearRect(0, 0, wave_canvas.width, wave_canvas.height);
		t += 10;
		for(var x=0; x<wave_canvas.width; x++){
			//var loudness = (Math.sin(x/15-t/33) + Math.sin(x/105+t/13) + Math.sin(-x/7+t/28) + Math.sin(x/3.3-t/73) + Math.sin(x/5.3+t/20))/5;
			var loudness = data[~~(data.length * x/wave_canvas.width)] / 128.0 - 1;
			
			if(location.protocol === "file:"){
				var h = ~~(loudness*20 * wave_canvas.height/2);
				wave_canvas.ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
				wave_canvas.ctx.fillRect(x, 17-h, 1, h*2+1);
			}
			
			var h = ~~(loudness * wave_canvas.height/2);
			wave_canvas.ctx.fillStyle = "lime";
			wave_canvas.ctx.fillRect(x, 17-h, 1, h*2+1);
		}
	});
	
	return $wave_display;
}