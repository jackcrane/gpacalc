// **********************************************************************************************************
// *                                                                                                        *
// *                                         Myschoolapp GPA Calculator                                     *
// *                                                                                                        *
// *                                    Written by Jack Crane and CJ Replogle                               *
// *                    Visit our GitHubs at github.com/jackcrane and github.com/cjreplogle                 *
// *     ______________________________________________________________________________________________     *
// *    |                                          CHANGELOG                                           |    *
// *    | Date     | Name | Version Number | Change description                                        |    *
// *    | 1/16/20  | Jack | 1.4.0 / Fixed the averaging algorithim for the portal's new method of      |    *
// *    |          |      |       | Displaying grades with decimal points. Added "Math.round()" to 252 |    *
// *    | 1/16/20  | Jack | 1.4.0 | Removed old, unnecessary functions and commented                   |    *
// *    | 1/21/20  | Jack | 1.5.0 | Integrated a settings page to allow user to change color theme and |    *
// *    |          |      |       | AP and honors modifiers, as well as the page calc timeout.         |    *
// *    | 2/6/20   | Jack | 1.5.2 | Added 2 buttons in the modal -- go to the class page and view the  |    *
// *    |          |      |       | grade detail. Links and pages are dynamically selected             |    *
// *    |          |      |       | [bug] IDKY but occasionally it populates the modal twice.          |    *
// *    | 2/9/20   | Jack | 1.5.3 | Bug fixes and add grade display to each class detai page           |    *
// *    |______________________________________________________________________________________________|    *
// *                                                                                                        *
// *     ______________________________________________________________________________________________     *
// *    |                                    Notes to readers / editors                                |    *
// *    | [-] Comments are BEFORE the code block they are describing. Assume that the comment describes|    *
// *    |     code all the way down to the next comment. If it does not, there should be another       |    *
// *    |     closing it out.                                                                          |    *
// *    | [-] Be sure to record what you did in the changelog - Include the date, your name, the new   |    *
// *    |     version number, as well as a description of what was changed and where.                  |    *
// *    |______________________________________________________________________________________________|    *
// *                                                                                                        *
// *   This extension is open source. Visit or fork github.com/jackcrane/gpacalc/ to view the source code   *
// *                                                                                                        *
// *   If you made changes, launch 'em and send me an email at 3jbc22@gmail.com so I can add them to the    *
// *   actual extension as it cannot be shared (unless someone knows how to integrate it with github?)      *
// *                                                                                                        *
// **********************************************************************************************************

// Variable Instantiation
const GPA_MAP = {100:4.3,99:4.3,98:4.3,97:4.3,96:4.0,95:4.0,94:4.0,93:3.7,92:3.7,91:3.7,90:3.7,89:3.3,88:3.3,87:3.3,86:3.0,85:3.0,84:3.0,83:2.7,82:2.7,81:2.7,80:2.7,79:2.3,78:2.3,77:2.3,76:2.0,75:2.0,74:2.0,73:1.7,72:1.7,71:1.7,70:1.7,69:1.3,68:1.3,67:1.3,66:1.0,65:1.0,64:1.0,63:0.7,62:0.7,61:0.7,60:0.7,59:0,58:0,57:0,56:0,55:0,54:0,53:0,52:0,51:0,50:0,49:0,48:0,47:0,46:0,45:0,44:0,43:0,42:0,41:0,40:0,39:0,38:0,37:0,36:0,35:0,34:0,33:0,32:0,31:0,30:0,29:0,28:0,27:0,26:0,25:0,24:0,23:0,22:0,21:0,20:0,19:0,18:0,17:0,16:0,15:0,14:0,13:0,12:0,11:0,10:0,9:0,8:0,7:0,6:0,5:0,4:0,3:0,2:0,1:0,0:0}
const gpa_avg = []
var insightsArray = new Array()
var insightsArrayLength = 0

var disableMod = false;

// get the users settings from chrome storage, and load defaults if none have been specified
var apmodifierLoad = 1.33
var honmodifierLoad = 0.66
var bgcolorLoad = "#b7da9b"
var mdcolorLoad = "#39FF14"
var pagewaitLoad = 5000

chrome.storage.sync.get({
	outputColor: "#b7da9b",
	modalColor: "#b7da9b",
	loadWait: 5000,
	apMod: 1.33,
	honMod: .66
}, function(items) {
	// console.log(items)
	bgcolorLoad = items.outputColor;
	if (bgcolorLoad == undefined || (bgcolorLoad != "#5FDEE8" && bgcolorLoad != "#B175FF" && bgcolorLoad != "#E8745F" && bgcolorLoad != "#FFE169")) {
		bgcolorLoad = "#b7da9b";
	}

	mdcolorLoad = items.modalColor;
	if (mdcolorLoad == undefined) {
		mdcolorLoad = "#39FF14";
	}

	apmodifierLoad = items.apMod
	if(apmodifierLoad == undefined) {apmodifierLoad = "1.33"}

	honmodifierLoad = items.honMod
	if(honmodifierLoad == undefined) {honmodifierLoad = ".66"}

	pagewaitLoad = items.loadWait
	if(pagewaitLoad == undefined) {pagewaitLoad = 5000}
})

// Verify if the page is actually on myschoolapp. Chrome SHOULD do this, but this is a failsafe so we dont clog our debugging notifications with irrelevant junk
var loc = window.location.href
var boolLoc = loc.includes(".myschoolapp.com")

if(boolLoc) {
	// This is the portal
	setTimeout(function(){ grade(); }, pagewaitLoad);
}

// Let people know (in the console) that the injection is successful. This in no way says it will work, but the script has run
console.log("Myschoolapp GPA Calculator has been successfully injected")

// Allow a breif timeout (5 seconds) for the portal to load in - it usually takes a few seconds to build the page, then start the program by calling grade()
window.onhashchange = function() { 
     setTimeout(function(){ disableMod = true;grade(); }, pagewaitLoad);
}

// Our master function - absolutely horribly written but i dont really want to change it. If anyone wants to they are welcome to put it in a loop
function grade() {
	if(document.getElementById("overview")==null) {

		// We are on the progress page
		var rows = getElements()
		var elem1 = rows[0]
		var elem2 = rows[1]
		var elem3 = rows[2]
		var elem4 = rows[3]
		var elem5 = rows[4]
		var elem6 = rows[5]
		var elem7 = rows[6]
		var elem8 = rows[7]
		var elem9 = rows[8]
		var elem10 = rows[9]
		var elem11 = rows[10]
		var elem12 = rows[11]
		var elem13 = rows[12]
		var elem14 = rows[13]
		var elem15 = rows[14]
		var elem16 = rows[15]
		var elem17 = rows[16]
		var elem18 = rows[17]
		var elem19 = rows[18]
		var elem20 = rows[19]
		var elem21 = rows[20]
		var elem22 = rows[21]
		var elem23 = rows[22]

		if(calcGrade(elem1) == "nc") {} else {doStuffWith(elem1)}
		if(calcGrade(elem2) == "nc") {} else {doStuffWith(elem2)}
		if(calcGrade(elem3) == "nc") {} else {doStuffWith(elem3)}
		if(calcGrade(elem4) == "nc") {} else {doStuffWith(elem4)}
		if(calcGrade(elem5) == "nc") {} else {doStuffWith(elem5)}
		if(calcGrade(elem6) == "nc") {} else {doStuffWith(elem6)}
		if(calcGrade(elem7) == "nc") {} else {doStuffWith(elem7)}
		if(calcGrade(elem8) == "nc") {} else {doStuffWith(elem8)}
		if(calcGrade(elem9) == "nc") {} else {doStuffWith(elem9)}
		if(calcGrade(elem10) == "nc") {} else {doStuffWith(elem10)}
		if(calcGrade(elem11) == "nc") {} else {doStuffWith(elem11)}
		if(calcGrade(elem12) == "nc") {} else {doStuffWith(elem12)}
		if(calcGrade(elem13) == "nc") {} else {doStuffWith(elem13)}
		if(calcGrade(elem14) == "nc") {} else {doStuffWith(elem14)}
		if(calcGrade(elem15) == "nc") {} else {doStuffWith(elem15)}
		if(calcGrade(elem16) == "nc") {} else {doStuffWith(elem16)}
		if(calcGrade(elem17) == "nc") {} else {doStuffWith(elem17)}
		if(calcGrade(elem18) == "nc") {} else {doStuffWith(elem18)}
		if(calcGrade(elem19) == "nc") {} else {doStuffWith(elem19)}
		if(calcGrade(elem20) == "nc") {} else {doStuffWith(elem20)}
		if(calcGrade(elem21) == "nc") {} else {doStuffWith(elem21)}
		if(calcGrade(elem22) == "nc") {} else {doStuffWith(elem22)}
		if(calcGrade(elem23) == "nc") {} else {doStuffWith(elem23)}
		

		appendGrades(averageIze())
	} else {
		if(document.getElementById("currentGradeDisp")==null) {
			// We are on another page
			var overview = document.getElementById("overview")
			console.log(overview.getElementsByTagName("div")[0].getElementsByClassName("bb-page-heading")[0])
			var courseName = overview.getElementsByTagName("div")[0].getElementsByClassName("bb-page-heading")[0].childNodes[0]
			console.log(courseName)
			var grade = localStorage.getItem(courseName.nodeValue.trim().replace(/[^a-zA-Z0-9]/g,'_'))
			var parent = document.createElement("div")
			var x = document.createElement("span")
			x.className = 'label label-success'
			x.style.backgroundColor = bgcolorLoad
			x.innerHTML = "Current Grade: " + grade
			x.setAttribute("id","currentGradeDisp")
			overview.getElementsByTagName("div")[0].getElementsByClassName("bb-page-heading")[0].appendChild(x)
		}
	}
}

// An adittedly bad name - this function will add the calculated grade to the gpa_avg array to be averaged later on. The last is from a feature that I abandoned - the modal
function doStuffWith(elem) {
	createLoc(elem)
	gpa_avg.push(calcGrade(elem))
	if(!disableMod){populateModalTable(elem)}else{}
}

function getElements() {
	var classes = document.getElementsByClassName('bb-tile-content-section')[3]
	var rows = classes.getElementsByClassName("row");
	rows = Array.from(rows)
	rows.shift()
	return rows
}

function createLoc(elem) {
	var corseName = getClassName(elem).replace(/[^a-zA-Z0-9]/g,'_');
	console.log(corseName)
	var corseGrade = getClassGrade(elem)
	localStorage.setItem(corseName,corseGrade)
}

// And heres where all the magic happens. This element gets the corse name and sees if it includes anything that would indicate a higher level corse and gets the current grade.
function calcGrade(elem) {
	
	if(elem != null) {
		// Class name:
		var course = getClassName(elem)
		// adding the gpa boost if it is high level:
		var modifier = getClassWeight(elem)
		// Getting the current grade: ALSO BE AWARE THAT THE REST OF THIS FUNCTION COULD BE REPLACED BY getClassGrade() I JUST HAVENT DONE IT YET
		var currentGrade = elem.getElementsByClassName("showGrade")[0].innerHTML.toString()
		// Removing spaces and the "%":
		currentGrade = currentGrade.replace(/^\s+|\s+$/gm,'').replace(/%/g,'')
		// Make sure the grade is not empty:
		if(currentGrade.toString().includes("&nbsp;") == false) {
			// Setting the finalgrade to current grade if it is legit - I know I already replaced the spaces but it broke when i removed ".replace(/\s/g, '');"
			var finalGrade = currentGrade.toString().replace(/\s/g, '');
			finalGrade = finalGrade.substring(0, finalGrade.length - 1);
			// Finally get the GPA from the grade
			var gpa = gradeToGpa(finalGrade)
			// Aand add the modifier... then return it
			gpa = +gpa.toString() + +modifier.toString()
			return gpa
		} else {
			// Return "nc" if anything goes wrong ("no content")
			return "nc"
		}
	} else {
		return "nc"
	}
}

// Get the name of the class within the provided row element
function getClassName(elem) {
	
	if(elem != null) {
		var course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0].innerHTML.toString()
		return course
	} else {
		return "nc"
	}
}

function getClassLink(elem) {
	if(elem != null) {
		var course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0]
		// console.log(course)
		var path = getDomPath(course);
		// console.log(path)
		return path

	} else {
		return "nc"
	}
}

function getGradeDetail(elem) {
	if(elem != null) {
		var detail = elem.getElementsByClassName("col-md-2")[2].getElementsByTagName("a")[0]
		// console.log(detail)
		var path = getDomPath(detail);
		// console.log(path)
		return path

	} else {
		return "nc"
	}
}

// Determine class weight
function getClassWeight(elem) {
	var course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0].innerHTML.toString()
		if(course.toLowerCase().includes("ap") == true) {
			var modifier = apmodifierLoad
			return apmodifierLoad
		} else {
			if(course.toLowerCase().includes("hon") == true) {
				var modifier = honmodifierLoad
				return honmodifierLoad
			} else {
				var modifier = 0
				return 0.0
			}
		}
}

// Determine the grade the student currently has in the class.
function getClassGrade(elem) {
	if(elem != null) {
		var currentGrade = elem.getElementsByClassName("showGrade")[0].innerHTML.toString()
		currentGrade = currentGrade.replace(/^\s+|\s+$/gm,'').replace(/%/g,'')
		if(currentGrade.toString().includes("&nbsp;") == false) {
			var finalGrade = currentGrade.toString().replace(/\s/g, '');
			return finalGrade
		} else {
			return "nc"
		}
	} else {
		return "nc"
	}
}

function getDomPath(el) {
  if (!el) {
    return;
  }
  var stack = [];
  var isShadow = false;
  while (el.parentNode != null) {
    // console.log(el.nodeName);
    var sibCount = 0;
    var sibIndex = 0;
    // get sibling indexes
    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
      var sib = el.parentNode.childNodes[i];
      if ( sib.nodeName == el.nodeName ) {
        if ( sib === el ) {
          sibIndex = sibCount;
        }
        sibCount++;
      }
    }
    // if ( el.hasAttribute('id') && el.id != '' ) { no id shortcuts, ids are not unique in shadowDom
    //   stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
    // } else
    var nodeName = el.nodeName.toLowerCase();
    if (isShadow) {
      nodeName += "::shadow";
      isShadow = false;
    }
    if ( sibCount > 1 ) {
      stack.unshift(nodeName + ':nth-of-type(' + (sibIndex + 1) + ')');
    } else {
      stack.unshift(nodeName);
    }
    el = el.parentNode;
    if (el.nodeType === 11) { // for shadow dom, we
      isShadow = true;
      el = el.host;
    }
  }
  stack.splice(0,1); // removes the html element
  var ret = stack.join(' > ');
  ret.replace("&quot;","")
  return ret;
}

// Makes then fills in the table in the modal
function populateModalTable(elem) {
	var modalClassName = getClassName(elem) + "<a href='javascript:closeInsights();document.querySelector("+'"'+getClassLink(elem)+'"'+").click()'> Class</a>" + "| <a href='javascript:closeInsights();document.querySelector("+'"'+getGradeDetail(elem)+'"'+").click()'>Grade Detail</a>"
	var modalClassGrade = getClassGrade(elem)
	var modalClassGpa = gradeToGpa(modalClassGrade.replace('%','').toString())
	var modalClassWeight = getClassWeight(elem)

	var parent = document.getElementById('gpaOutTable')
	var row = document.createElement('tr')
	var thClass = document.createElement('td')
	thClass.innerHTML = modalClassName
	var thGrade = document.createElement('td')
	thGrade.innerHTML = modalClassGrade
	var thGpa = document.createElement('td')
	thGpa.innerHTML = modalClassGpa

	row.appendChild(thClass)
	row.appendChild(thGrade)
	row.appendChild(thGpa)


	parent.appendChild(row)

	document.getElementById('insightGpaOut').innerHTML = averageIze()

	// CONTINUE FROM HERE

	// There is sooooooo much more that can be done in here...

}

// Turns a grade from a percentage to a gpa
function gradeToGpa(pct){
	pct = Math.round(pct)
	return GPA_MAP[pct]
}

// Averages the array that is the gpas
function averageIze() {
	var total = 0
	for(var i = 0; i < gpa_avg.length; i++) {
		total += gpa_avg[i];
	}
	var finalAverage = total / gpa_avg.length;
	return finalAverage.toFixed(3)
}

// Creates and fills in the display element that shows the GPA. 
function appendGrades(gradesMaster) {

	document.getElementById("performanceCollapse").getElementsByTagName("div")[0].id = "gpaParent"

	if(document.getElementById("gpaDisplay")==null) {

		var z = document.createElement('a');
		z.innerHTML = ' GPA';
		z.id = "gpaDisplay"
		z.href = "javascript:openInsights()"
		z.className = 'accordion-toggle';
		var x = document.createElement("span")
		x.className = 'label label-success'
		x.style.backgroundColor = bgcolorLoad
		x.innerHTML = gradesMaster
		var br = document.createElement("br")
		var hr = document.createElement("hr")
		var y = document.getElementById("gpaParent")
		y.appendChild(x);
		y.appendChild(z);
		y.appendChild(br);
		y.appendChild(hr);
		document.getElementById("insightGpaOut").setAttribute('style','color:'+mdcolorLoad)
	}
	
}

// Creates the modal that will ultimately show the table from populateModalTable()
function createModalV2() {
	// console.log("creating Table")
	if(document.getElementById("modalParent")==null) {
		var modalParent = document.createElement('div')
		modalParent.setAttribute('style','position:fixed;width:100%;height:100%;z-index:9999;background-color:rgba(0,0,0,0.4);top:0;')
		modalParent.setAttribute('id','modalParent')
		var bbModal = document.createElement('div')
		bbModal.setAttribute('style','position:absolute;width:60%;padding:15px;margin-top:15%;margin-left:20%;background-color:white;box-shadow: 0 5px 15px rgba(0,0,0,0.5);')
		var close = document.createElement('button')
		close.setAttribute('type','button')
		close.setAttribute('onclick','closeInsights()')
		close.setAttribute('class','btn btn-default')
		close.innerHTML = "Close Insights"
		var gpaOutTitle = document.createElement('h1')
		gpaOutTitle.innerHTML = "Your GPA: "
		var gpaOut = document.createElement('span')
		gpaOut.innerHTML = "4.0"
		gpaOut.setAttribute('id','insightGpaOut')


		var table = document.createElement('table')                           // --------------table:19-------------
		table.setAttribute('id','gpaOutTable')                                // |  Class  |  Grade  |  GPA Score  |  tr 21
		var headerTr = document.createElement('tr')                           //   th 23      th 27     th 31
		
		var th = document.createElement('th')
		th.innerHTML = 'Class'
		headerTr.appendChild(th)

		th = document.createElement('th')
		th.innerHTML = "Grade"
		headerTr.appendChild(th)

		th = document.createElement('th')
		th.innerHTML = "GPA Score (unweighted)"
		headerTr.appendChild(th)

		// CONTINUE HERE: GRADE WEIGHT

		table.setAttribute('class','table table-striped table-condensed table-mobile-stacked')

		table.appendChild(headerTr)

		var style = document.createElement('style')
		// style.innerHTML = "table,th,td{border:1px solid black;border-collapse:collapse} th,td {width:30%}"

		style.innerHTML = "tr:nth-child(even) {background-color: #f2f2f2}"

		modalParent.appendChild(style)

		var br = document.createElement(br)

		gpaOutTitle.appendChild(gpaOut)
		bbModal.appendChild(gpaOutTitle)
		bbModal.appendChild(br)
		bbModal.appendChild(table)
		bbModal.appendChild(close)
		modalParent.appendChild(bbModal)
		document.body.appendChild(modalParent)
		// console.log(modalParent)
	}
}

// Injects the functions for modal controls into the page because im too lazy to figure out how to do it the right way -- kind of a reacuring thing
function createInsightFucntions() {
	var script = document.createElement('script')
	script.innerHTML = "function closeInsights(){document.getElementById('modalParent').style.display = 'none'} function openInsights() {document.getElementById('modalParent').style.display = 'block'}"
	document.head.appendChild(script)
}

// Insight (modal) controls for use by the extension
function closeInsights() {
	document.getElementById('modalParent').style.display = 'none'
}

function openInsights() {
	document.getElementById('modalParent').style.display = 'block'
}

//random functions to call to get the modal working.
createInsightFucntions()
createModalV2()
closeInsights()