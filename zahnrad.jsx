 function my_dialog() {	// ----------------------------------------------------------------	//	Die Dialogkomponenten selbst	// ----------------------------------------------------------------	var std_w = 400, std_h = 100;	var w = new Window("dialog");	w.orientation = "column";	w.alignChildren = ["fill", "fill" ];  w.add("statictext", undefined , "Mitte X");  w.x_center = w.add("slider", [undefined, undefined, std_w, 20], "Mitte X");  w.add("statictext", undefined , "Mitte Y");  w.y_center = w.add("slider", [undefined, undefined, std_w, 20], "Mitte Y");  w.add("statictext", undefined , "Z�hne");  w.notches = w.add("slider", [undefined, undefined, std_w, 20], "Z�hne");  w.add("statictext", undefined , "Radius au�en");  w.radius_o = w.add("slider", [undefined, undefined, std_w, 20], "Radius au�en");  w.add("statictext", undefined , "Radius innen");  w.radius_i = w.add("slider", [undefined, undefined, std_w, 20], "Radius innen");  w.add("statictext", undefined , "Verj�ngung au�en");  w.taper_o = w.add("slider", [undefined, undefined, std_w, 20], "Verj�ngung au�en");  w.add("statictext", undefined , "Verj�ngung innen");  w.taper_i = w.add("slider", [undefined, undefined, std_w, 20], "Verj�ngung innen");	// ----------------------------------------------------------------	// 	Default-Werte und Listboxen einf�llen,  etc	// ----------------------------------------------------------------	w.values = {};w.x_center.minvalue = -10;w.x_center.maxvalue =  10;w.x_center.value = 0;w.y_center.minvalue = -10;w.y_center.maxvalue =  10;w.y_center.value = 0;w.notches.minvalue = -10;w.notches.maxvalue =  10;w.notches.value = 0;w.radius_o.minvalue = -10;w.radius_o.maxvalue =  10;w.radius_o.value = 0;w.radius_i.minvalue = -10;w.radius_i.maxvalue =  10;w.radius_i.value = 0;w.taper_o.minvalue = -10;w.taper_o.maxvalue =  10;w.taper_o.value = 0;w.taper_i.minvalue = -10;w.taper_i.maxvalue =  10;w.taper_i.value = 0;	// ----------------------------------------------------------------	// 	Event Handler f�r quasi alles	// ----------------------------------------------------------------	w.x_center.onChange = function () {		var w = this.window;		$.writeln( this.toSource() );		w.values.x_center = this.value;	}	w.y_center.onChange = function () {		var w = this.window;		$.writeln( this.toSource() );		w.values.y_center = this.value;	}	w.notches.onChange = function () {		var w = this.window;		$.writeln( this.toSource() );		w.values.notches = this.value;	}	w.radius_o.onChange = function () {		var w = this.window;		$.writeln( this.toSource() );		w.values.radius_o = this.value;	}	w.radius_i.onChange = function () {		var w = this.window;		$.writeln( this.toSource() );		w.values.radius_i = this.value;	}	w.taper_o.onChange = function () {		var w = this.window;		$.writeln( this.toSource() );		w.values.taper_o = this.value;	}	w.taper_i.onChange = function () {		var w = this.window;		$.writeln( this.toSource() );		w.values.taper_i = this.value;	}	w.show()}my_dialog();