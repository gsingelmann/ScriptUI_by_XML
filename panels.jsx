 function my_dialog() {	// ----------------------------------------------------------------	//	Die Dialogkomponenten selbst	// ----------------------------------------------------------------	var std_w = 400, std_h = 100;	var w = new Window("dialog");	w.orientation = "column";	w.alignChildren = ["fill", "fill" ];  w.g0 = w.add("group", undefined , "");  w.g0.orientation = "row";  w.g0.alignChildren = ["fill", "fill"];    w.g0.p1 = w.g0.add("panel", undefined , "Name");    w.g0.p1.orientation = "column";    w.g0.p1.alignChildren = ["fill", "top"];      w.g0.p1.add("statictext", undefined , "Ihr Vorname");      w.g0.p1.vorname = w.g0.p1.add("edittext", [undefined, undefined, std_w, 20], "Max");      w.g0.p1.add("statictext", undefined , "Ihr Nachname");      w.g0.p1.nachname = w.g0.p1.add("edittext", [undefined, undefined, std_w, 20], "Muster");  w.defaultElement = w.add("button", undefined , "OK");	// ----------------------------------------------------------------	// 	Default-Werte und Listboxen einf�llen,  etc	// ----------------------------------------------------------------	w.values = {};	w.values.vorname = 'Max';	w.values.nachname = 'Muster';	// ----------------------------------------------------------------	// 	Event Handler f�r quasi alles	// ----------------------------------------------------------------	w.g0.p1.vorname.onChange = function () {		var w = this.window;		$.writeln( 'w.g0.p1.vorname was changed' );		w.values.vorname = this.text	}	w.g0.p1.nachname.onChange = function () {		var w = this.window;		$.writeln( 'w.g0.p1.nachname was changed' );		w.values.nachname = this.text	}	w.defaultElement.onClick = function () {		var w = this.window;		$.writeln( 'w.defaultElement was clicked' );		alert('ok\n' + w.values.toSource() );		w.close(1)	}	w.show()}my_dialog();