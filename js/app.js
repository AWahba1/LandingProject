var sectionMap = new Map();
var sectionList = document.querySelectorAll("section");
var allSectionListItems = [];


// adding a new section dynamically at run time instead statitically inside html page
function addNewSection() {
    const newSectionNumber = sectionList.length + 1;

    var mainTag = document.querySelector("main");
    var newSection = document.createElement("section");
    var newDiv = document.createElement("div");
    var newH2 = document.createElement("h2");
    var newPara1 = document.createElement("p");
    var newPara2 = document.createElement("p");



    newSection.setAttribute("id", `section${newSectionNumber}`);
    newSection.setAttribute("data-nav", `Section ${newSectionNumber}`);
    newSection.setAttribute("class", "");

    newDiv.setAttribute("class", "landing__container");
    newH2.innerHTML = `Section ${newSectionNumber}`;
    newPara1.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
    newPara2.innerHTML = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";



    mainTag.appendChild(newSection);
    newSection.appendChild(newDiv);
    newDiv.appendChild(newH2);
    newDiv.appendChild(newPara1);
    newDiv.appendChild(newPara2);


    // `<section id="section${newSectionNumber}" data-nav="Section ${newSectionNumber}" class="">
    //   <div class="landing__container">
    //     <h2>Section ${newSectionNumber}</h2>
    //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

    //     <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    //   </div>
    // </section>`


    sectionList = document.querySelectorAll("section");

}




//fills sectionMap <Section Number, Section Element > for fast and easy retrievel of section object using the provided section number
function fillHashMap() {
    for (let section of sectionList) {
        sectionMap.set(Number(section.getAttribute('data-nav').slice(-1)), section);
    }
}



// Adds a corresponding list item for every section that's available in the page
function addingNavBar() {
    const unorderedList = document.getElementById("navbar__list");
    for (const [sectionNum, sectionElement] of sectionMap.entries()) {


        let newListItem = document.createElement("li");
        newListItem.innerHTML = sectionElement.getAttribute('data-nav');
        newListItem.setAttribute("onclick", `onClick(${sectionNum})`);
        newListItem.setAttribute("class", "menu__link");


        allSectionListItems.push(newListItem);

        unorderedList.appendChild(newListItem);

    }

}
//Upon clicking a section in the nav bar, the corresponding section becomes in the viewport given the requested section Number
// by scrolling smoothly to it
function onClick(sectionNum) {
    let sectionObject = sectionMap.get(sectionNum);
    sectionObject.scrollIntoView({
        behavior: "smooth"
    });
}

//adjust active section whenever a scrolling event happens
window.addEventListener("scroll", function () {
    //Used methodology in here:
    // https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/#:~:text=Use%20the%20getBoundingClientRect()%20method%20to%20get%20the%20size%20of,in%20the%20viewport%20or%20not.
    for (const [sectionNum, sectionElement] of sectionMap.entries()) {
        const rect = sectionElement.getBoundingClientRect();
        //active section is in my viewport
        if (rect.top >= -200 && rect.top <= 400) {
            sectionElement.setAttribute("class", "active");
            highlightActiveListItem(sectionNum);

        }
        // other sections are deactivated
        else {
            sectionElement.setAttribute("class", "");
        }

    }
});

// On Clicking Top button, this function is executed to smoothly scroll to the top of the page
function scrollToTopFunction() {
    //Reference:  https://stackoverflow.com/questions/15935318/smooth-scroll-to-top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



//Highlights the active section's list item in the navigational Bar
function highlightActiveListItem(sectionNum) {
    for (let i = 0; i < allSectionListItems.length; i++) {
        if (allSectionListItems[i].innerHTML.slice(-1) == sectionNum)
            allSectionListItems[i].style = "background: #008B8B;";
        else
            allSectionListItems[i].removeAttribute('style');

    }
}


//calling main functions
addNewSection();
addNewSection();
fillHashMap();
addingNavBar();