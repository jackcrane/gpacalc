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
// *    | 2/12/20  | Jack | 1.5.5 | Bug fixes, making a info section on the options page               |    *
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

// letiable Instantiation
const GPA_MAP = {100:4.3,99:4.3,98:4.3,97:4.3,96:4.0,95:4.0,94:4.0,93:3.7,92:3.7,91:3.7,90:3.7,89:3.3,88:3.3,87:3.3,86:3.0,85:3.0,84:3.0,83:2.7,82:2.7,81:2.7,80:2.7,79:2.3,78:2.3,77:2.3,76:2.0,75:2.0,74:2.0,73:1.7,72:1.7,71:1.7,70:1.7,69:1.3,68:1.3,67:1.3,66:1.0,65:1.0,64:1.0,63:0.7,62:0.7,61:0.7,60:0.7,59:0,58:0,57:0,56:0,55:0,54:0,53:0,52:0,51:0,50:0,49:0,48:0,47:0,46:0,45:0,44:0,43:0,42:0,41:0,40:0,39:0,38:0,37:0,36:0,35:0,34:0,33:0,32:0,31:0,30:0,29:0,28:0,27:0,26:0,25:0,24:0,23:0,22:0,21:0,20:0,19:0,18:0,17:0,16:0,15:0,14:0,13:0,12:0,11:0,10:0,9:0,8:0,7:0,6:0,5:0,4:0,3:0,2:0,1:0,0:0}
const gpa_avg = []
let insightsArray = new Array()
let insightsArrayLength = 0

let disableMod = false;

// get the users settings from chrome storage, and load defaults if none have been specified
let apmodifierLoad = 1.33
let honmodifierLoad = 0.66
let bgcolorLoad = "#b7da9b"
let mdcolorLoad = "#39FF14"
let pagewaitLoad = 5000

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
if(window.location.href.includes(".myschoolapp.com")) {
	// This is the portal
	setTimeout(function(){ grade(); }, pagewaitLoad);
}

// Let people know (in the console) that the injection is successful. This in no way says it will work, but the script has run
console.log("Myschoolapp GPA Calculator has been successfully injected");

// Allow a breif timeout (5 seconds) for the portal to load in - it usually takes a few seconds to build the page, then start the program by calling grade()
window.onhashchange = function() {
     setTimeout(function(){ disableMod = true;grade(); }, pagewaitLoad);
}

// Our master function - absolutely horribly written but i dont really want to change it. If anyone wants to they are welcome to put it in a loop
function grade() {
	if(document.getElementById("overview")==null) {

		let rows = get.elements();
		rows.forEach(e => {
			operations.calcGrade(e) == "nc" ? "" : doStuffWith(e)
		})

		create.appendGrades(operations.averageIze())
	} else {
		if(document.getElementById("currentGradeDisp")==null) {
			// We are on another page
			let overview = document.getElementById("overview")
			console.log(overview.getElementsByTagName("div")[0].getElementsByClassName("bb-page-heading")[0])
			let courseName = overview.getElementsByTagName("div")[0].getElementsByClassName("bb-page-heading")[0].childNodes[0]
			console.log(courseName)
			let grade = localStorage.getItem(courseName.nodeValue.trim().replace(/[^a-zA-Z0-9]/g,'_'))
			let parent = document.createElement("div")
			let x = document.createElement("span")
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
	create.loc(elem)
	gpa_avg.push(operations.calcGrade(elem))
	if(!disableMod){create.modal.populateTable(elem)}else{}
}

const get = {
	elements:function() {
		let classes = document.getElementsByClassName('bb-tile-content-section')[3]
		let rows = classes.getElementsByClassName("row");
		rows = Array.from(rows)
		rows.shift()
		return rows
	},
	gradeDetail:function(elem) {
		if(elem != null) {
			let detail = elem.getElementsByClassName("col-md-2")[2].getElementsByTagName("a")[0]
			console.log(detail)
			let path = get.domPath(detail);
			path = path.join(' > ').replaceAll('"','').replaceAll("'",'')
			console.log(path)
			return path
		} else {
			if(course.toLowerCase().includes("i/s") || course.toLowerCase().includes("research") || course.toLowerCase().includes("leadership") == true) {
			return "nc";
		//excludes independent studies, research science, and leadership from grade calculation
			} else {
				return "nc";
			}
		}
	},
	domPath:function(el) {
		//im not even gonna try to understand most of this
		if (!el) {
	    return;
	  }
		var stack = [];
	  while ( el.parentNode != null ) {
	    console.log(el.nodeName);
	    var sibCount = 0;
	    var sibIndex = 0;
	    for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
	      var sib = el.parentNode.childNodes[i];
	      if ( sib.nodeName == el.nodeName ) {
	        if ( sib === el ) {
	          sibIndex = sibCount;
	        }
	        sibCount++;
	      }
	    }
	    if ( el.hasAttribute('id') && el.id != '' ) {
	      stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
	    } else if ( sibCount > 1 ) {
	      stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
	    } else {
	      stack.unshift(el.nodeName.toLowerCase());
	    }
	    el = el.parentNode;
	  }
	  return stack.slice(1); // removes the html element
	},
	class:{
		name:function(elem) {
			if(elem != null) {
				let course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0].innerHTML.toString()
				return course
			} else {
				return "nc"
			}
		},
		link:function(elem) {
			if(elem != null) {
				let course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0]
				// console.log(course)
				let path = get.domPath(course);
				// console.log(path)
				return path

			} else {
				return "nc"
			}
		},
		weight:function(elem) {
			let course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0].innerHTML.toString()
			if(course.toLowerCase().includes("ap") == true) {
				let modifier = apmodifierLoad
				return apmodifierLoad
			} else {
				if(course.toLowerCase().includes("hon") == true) {
					let modifier = honmodifierLoad
					return honmodifierLoad
				} else {
					let modifier = 0
					return 0.0
				}
			}
		},
		grade:function(elem) {
			if(elem != null) {
				let currentGrade = elem.getElementsByClassName("showGrade")[0].innerHTML.toString()
				currentGrade = currentGrade.replace(/^\s+|\s+$/gm,'').replace(/%/g,'')
				if(currentGrade.toString().includes("&nbsp;") == false) {
					let finalGrade = currentGrade.toString().replace(/\s/g, '');
					return finalGrade
				} else {
					return "nc"
				}
			} else {
				return "nc"
			}
		}
	},
};

const create = {
	loc:function(elem) {
		let corseName = get.class.name(elem).replace(/[^a-zA-Z0-9]/g,'_');
		console.log(corseName);
		let corseGrade = get.class.grade(elem)
		localStorage.setItem(corseName,corseGrade)
	},
	modal:{
		populateTable:function(elem) {
			let modalClassName = get.class.name(elem) + "<a href='javascript:closeInsights();document.querySelector("+'"'+get.class.link(elem)+'"'+").click()'> Class</a>" + "| <a href='javascript:closeInsights();document.querySelector("+'"'+get.gradeDetail(elem)+'"'+").click()'>Grade Detail</a>"
			let modalClassGrade = get.class.grade(elem)
			let modalClassGpa = operations.gradeToGpa(modalClassGrade.replace('%','').toString())
			let modalClassWeight = get.class.weight(elem)

			let parent = document.getElementById('gpaOutTable')
			let row = document.createElement('tr')
			let thClass = document.createElement('td')
			thClass.innerHTML = modalClassName
			let thGrade = document.createElement('td')
			thGrade.innerHTML = modalClassGrade
			let thGpa = document.createElement('td')
			thGpa.innerHTML = modalClassGpa

			row.appendChild(thClass)
			row.appendChild(thGrade)
			row.appendChild(thGpa)


			parent.appendChild(row)

			document.getElementById('insightGpaOut').innerHTML = operations.averageIze()

			// CONTINUE FROM HERE

			// There is sooooooo much more that can be done in here...
		},
		create:function() {
			if(document.getElementById("modalParent")==null) {
				let modalParent = document.createElement('div')
				modalParent.setAttribute('style','position:fixed;width:100%;height:100%;z-index:9999;background-color:rgba(0,0,0,0.4);top:0;')
				modalParent.setAttribute('id','modalParent')
				let bbModal = document.createElement('div')
				bbModal.setAttribute('style','position:absolute;width:60%;padding:15px;margin-top:15%;margin-left:20%;background-color:white;box-shadow: 0 5px 15px rgba(0,0,0,0.5);')
				let close = document.createElement('button')
				close.setAttribute('type','button')
				close.setAttribute('onclick','closeInsights()')
				close.setAttribute('class','btn btn-default')
				close.innerHTML = "Close Insights"
				let gpaOutTitle = document.createElement('h1')
				gpaOutTitle.innerHTML = "Your GPA: "
				let gpaOut = document.createElement('span')
				gpaOut.innerHTML = "There has been an error. Reload the page."
				gpaOut.setAttribute('id','insightGpaOut')


				let table = document.createElement('table')                           // --------------table:19-------------
				table.setAttribute('id','gpaOutTable')                                // |  Class  |  Grade  |  GPA Score  |  tr 21
				let headerTr = document.createElement('tr')                           //   th 23      th 27     th 31

				let th = document.createElement('th')
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

				let style = document.createElement('style')
				// style.innerHTML = "table,th,td{border:1px solid black;border-collapse:collapse} th,td {width:30%}"

				style.innerHTML = "tr:nth-child(even) {background-color: #f2f2f2}"

				modalParent.appendChild(style)

				let br = document.createElement("br")

				gpaOutTitle.appendChild(gpaOut)
				bbModal.appendChild(gpaOutTitle)
				bbModal.appendChild(br)
				bbModal.appendChild(table)
				bbModal.appendChild(close)
				modalParent.appendChild(bbModal)
				document.body.appendChild(modalParent)
				// console.log(modalParent)
			}
		},
		createInsightFunctions:function() {
			let script = document.createElement('script')
			script.innerHTML = "function closeInsights(){document.getElementById('modalParent').style.display = 'none'} function openInsights() {document.getElementById('modalParent').style.display = 'block'}"
			document.head.appendChild(script)
		},
		closeInsights:function() {
			document.getElementById('modalParent').style.display = 'none'
		},
		openInsights:function() {
			document.getElementById('modalParent').style.display = 'block'
		}
	},
	appendGrades:function(gradesMaster) {
		document.getElementById("performanceCollapse").getElementsByTagName("div")[0].id = "gpaParent"

		if(document.getElementById("gpaDisplay")==null) {

			let z = document.createElement('a');
			z.innerHTML = ' GPA (Click for details)';
			z.id = "gpaDisplay"
			z.href = "javascript:openInsights()"
			z.className = 'accordion-toggle';
			let x = document.createElement("span")
			x.className = 'label label-success'
			x.style.backgroundColor = bgcolorLoad
			x.innerHTML = gradesMaster
			let br = document.createElement("br")
			let hr = document.createElement("hr")
			let y = document.getElementById("gpaParent")
			y.appendChild(x);
			y.appendChild(z);
			y.appendChild(br);
			y.appendChild(hr);
			document.getElementById("insightGpaOut").setAttribute('style','color:'+mdcolorLoad)
		}
	}
}

const operations = {
	gradeToGpa:function(pct) {
		if(pct>100) {
			return 4.3;
		} else {
			pct = Math.round(pct)
			return GPA_MAP[pct]
		}
	},
	calcGrade:function(elem) {
		if(elem != null) {
			// Class name:
			let course = get.class.name(elem)
			// adding the gpa boost if it is high level:
			let modifier = get.class.weight(elem)
			// Getting the current grade: ALSO BE AWARE THAT THE REST OF THIS FUNCTION COULD BE REPLACED BY get.class.grade() I JUST HAVENT DONE IT YET
			let currentGrade = elem.getElementsByClassName("showGrade")[0].innerHTML.toString()
			// Removing spaces and the "%":
			currentGrade = currentGrade.replace(/^\s+|\s+$/gm,'').replace(/%/g,'')
			// Make sure the grade is not empty:
			if(currentGrade.toString().includes("&nbsp;") == false) {
				// Setting the finalgrade to current grade if it is legit - I know I already replaced the spaces but it broke when i removed ".replace(/\s/g, '');"
				let finalGrade = currentGrade.toString().replace(/\s/g, '');
				finalGrade = finalGrade.substring(0, finalGrade.length - 1);
				// Finally get the GPA from the grade
				let gpa = operations.gradeToGpa(finalGrade)
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
	},
	averageIze:function() {
		let total = 0
		for(let i = 0; i < gpa_avg.length; i++) {
			total += gpa_avg[i];
		}
		let finalAverage = total / gpa_avg.length;
		return finalAverage.toFixed(3)
	}
}

//random functions to call to get the modal working.
create.modal.createInsightFunctions()
create.modal.create()
create.modal.closeInsights()
