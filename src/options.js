function save() {
	// localStorage.outputColor = $('input[name=color]:checked', '#colors').val()
	// localStorage.modalColor = $('input[name=mdcolor]:checked', '#modalColor').val()
	// localStorage.loadWait = $('input[name=waittime]').val() * 1000
	// localStorage.apMod = $('input[name=apmodifier]').val()
	// localStorage.honMod = $('input[name=honmodifier]').val()

	chrome.storage.sync.set({
		outputColor: $('input[name=color]:checked', '#colors').val(),
		modalColor: $('input[name=mdcolor]:checked', '#modalColor').val(),
		loadWait: $('input[name=waittime]').val() * 1000,
		apMod: $('input[name=apmodifier]').val(),
		honMod: $('input[name=honmodifier]').val()
	})
	new Toast({message:"Saved."})
}

function setDefaults() {
	r=confirm("You are about to reset the default values. Are you sure you want to do this?")
	if(r==true) {
		chrome.storage.sync.set({
			outputColor: "#b7da9b",
			modalColor: "#b7da9b",
			loadWait: 5000,
			apMod: 1.33,
			honMod: .66
		})
		loadSettings()
	}
}

var defaultColor = "#b7da9b"

function loadSettings() {
	chrome.storage.sync.get({
		outputColor: "#b7da9b",
		modalColor: "#b7da9b",
		loadWait: 5000,
		apMod: 1.33,
		honMod: .66,
		user: "Unknown"
	}, function(items) {
		console.log(items.user)

		$('[name="color"]').removeAttr('checked');
		$('[name="mdcolor"]').removeAttr('checked');

		$('#user')[0].innerHTML=items.user.toString()

		var colorVal = items.outputColor;
		if (colorVal == undefined || (colorVal != "#b7da9b" && colorVal != "#5FDEE8" && colorVal != "#B175FF" && colorVal != "#E8745F" && colorVal != "#FFE169")) {
			colorVal = defaultColor;
		}

		var mdcolorVal = items.modalColor;
		if (mdcolorVal == undefined || (colorVal != "#b7da9b" && colorVal != "#5FDEE8" && colorVal != "#B175FF" && colorVal != "#E8745F" && colorVal != "#FFE169")) {
			mdcolorVal = defaultColor;
		}

		$("input[name=color][value=" + colorVal + "]").prop('checked', true);
		$("input[name=mdcolor][value=" + mdcolorVal + "]").prop('checked', true) 
		var apmodifierLoad = items.apMod
		if(apmodifierLoad == undefined) {apmodifierLoad = 1.33}

		var honmodifierLoad = items.honMod
		if(honmodifierLoad == undefined) {honmodifierLoad = .66}

		var loadTimeout = items.loadWait
		if(loadTimeout == undefined) {loadTimeout = 5000}

		document.getElementById("apmodifier").value = apmodifierLoad
		document.getElementById("honmodifier").value = honmodifierLoad
		document.getElementById("waittime").value = loadTimeout/1000
	})	
}

document.getElementsByTagName("body")[0].onload = loadSettings()
document.getElementById("save").addEventListener("click", save);
document.getElementById("loaddefaults").addEventListener("click", setDefaults);
document.getElementById("qmark").addEventListener("click", function() {new Toast({message:'number of seconds to wait for the page to load. 5 is usually pretty good. Drop this number if you are on fast wifi and a fast computer. If the GPA consistently fails to show up, increase this number.'})});

document.getElementById("version").innerHTML = chrome.runtime.getManifest().version.toString()

"use strict";function Toast(t){if(!t.message)throw new Error("Toast.js - You need to set a message to display");this.options=t,this.options.type=t.type||"default",this.toastContainerEl=document.querySelector(".toastjs-container"),this.toastEl=document.querySelector(".toastjs"),this._init()}Toast.prototype._createElements=function(){var t=this;return new Promise(function(e,o){t.toastContainerEl=document.createElement("div"),t.toastContainerEl.classList.add("toastjs-container"),t.toastContainerEl.setAttribute("role","alert"),t.toastContainerEl.setAttribute("aria-hidden",!0),t.toastEl=document.createElement("div"),t.toastEl.classList.add("toastjs"),t.toastContainerEl.appendChild(t.toastEl),document.body.appendChild(t.toastContainerEl),setTimeout(function(){return e()},500)})},Toast.prototype._addEventListeners=function(){var t=this;if(document.querySelector(".toastjs-btn--close").addEventListener("click",function(){t._close()}),this.options.customButtons){var e=Array.prototype.slice.call(document.querySelectorAll(".toastjs-btn--custom"));e.map(function(e,o){e.addEventListener("click",function(e){return t.options.customButtons[o].onClick(e)})})}},Toast.prototype._close=function(){var t=this;return new Promise(function(e,o){t.toastContainerEl.setAttribute("aria-hidden",!0),setTimeout(function(){t.toastEl.innerHTML="",t.toastEl.classList.remove("default","success","warning","danger"),t.focusedElBeforeOpen&&t.focusedElBeforeOpen.focus(),e()},1e3)})},Toast.prototype._open=function(){this.toastEl.classList.add(this.options.type),this.toastContainerEl.setAttribute("aria-hidden",!1);var t="";this.options.customButtons&&(t=this.options.customButtons.map(function(t,e){return'<button type="button" class="toastjs-btn toastjs-btn--custom">'+t.text+"</button>"}),t=t.join("")),this.toastEl.innerHTML="\n        <p>"+this.options.message+'</p>\n        <button type="button" class="toastjs-btn toastjs-btn--close">Close</button>\n        '+t+"\n    ",this.focusedElBeforeOpen=document.activeElement,document.querySelector(".toastjs-btn--close").focus()},Toast.prototype._init=function(){var t=this;Promise.resolve().then(function(){return t.toastContainerEl?Promise.resolve():t._createElements()}).then(function(){return"false"==t.toastContainerEl.getAttribute("aria-hidden")?t._close():Promise.resolve()}).then(function(){t._open(),t._addEventListeners()})};