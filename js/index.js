//data to displays as a match day

let teams = [{
    logo: "images/Arsenal.png",
    teamName: "Arsenal",
},
{
    logo: "images/United.png",
    teamName: "Manchester United",
},
{
    logo: "images/city.png",
    teamName: "Manchester City",
},
{
    logo: "images/Liverpool.png",
    teamName: "Liverpool",
},
{
    logo: "images/westham.png",
    teamName: "West Ham",
},
{
    logo: "images/Chelsea.png",
    teamName: "Chelsea",
}
]

//array of weekdays an  months of the actual year
let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
],
    days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],

    weekDays = document.getElementsByClassName("week-day");

let matchday = document.getElementsByClassName("match");

const WEEK_CONTAINER = document.getElementById("week-container"),
    WEEK_RANGE = document.getElementById("week-range"),
    WEEK_MATCHES = document.getElementById("week-matches"),
    curDate = new Date(2022, 0, 30);

let baseDay;

let calculateWeekDays = (function () {

    //calculate actual wekk and its week days
    let baseDate = new Date(curDate.getFullYear(), 0, 1),
        dateDiff = Math.floor((curDate - baseDate) / 86400000),
        week = Math.ceil(((dateDiff + curDate.getDay() + 1) / 7));

    if (curDate.getDay() >= 0 && curDate.getDay() <= 2) week += 1

    baseDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), (((week - 1) * 7) - 5));
    let addDays = 6

    console.log(week)

    let i = 0
    for (i; i < 7; i++) {
        let dayNumber = baseDay.getDate() + i,
            dayName = days[baseDay.getDay() + i],
            secondPartMonth = baseDay.getMonth(),
            isLastDay = false

        //Validations for the last day of a month based on odds  and pairs index of the months
        function checker() {
            if (baseDay.getDate() + i >= 29 && baseDay.getMonth() % 2 != 0 && baseDay.getMonth() === 1) dayNumber = baseDay.getDate() + i - 28, isLastDay = true

            if (baseDay.getDate() + i >= 31 && baseDay.getMonth() % 2 == 0 && baseDay.getMonth() > 7) dayNumber = baseDay.getDate() + i - 30, isLastDay = true

            if (baseDay.getDate() + i >= 31 && baseDay.getMonth() % 2 != 0 && baseDay.getMonth() < 7) dayNumber = baseDay.getDate() + i - 30, isLastDay = true

            if (baseDay.getDate() + i >= 32 && baseDay.getMonth() % 2 == 0 && baseDay.getMonth() < 7) dayNumber = baseDay.getDate() + i - 31, isLastDay = true

            if (baseDay.getDate() + i >= 32 && baseDay.getMonth() % 2 != 0 && baseDay.getMonth() > 7) dayNumber = baseDay.getDate() + i - 31, isLastDay = true

            if (baseDay.getDate() + i >= 32 && baseDay.getMonth() === 7) dayNumber = baseDay.getDate() + i - 31, isLastDay = true

            return isLastDay
        }

        checker()

        if (checker()) secondPartMonth += 1
        //printing actual weekdays range
        WEEK_RANGE.innerHTML =
            `${(baseDay.getDate())} of ${months[baseDay.getMonth()]}, ${baseDay.getFullYear()} -
             ${dayNumber} of  ${months[secondPartMonth]}, ${baseDay.getFullYear()}`

        //printing  weekdays
        WEEK_CONTAINER.insertAdjacentHTML(
            "beforeend",
            `<div  onclick="selectWeekDay(this)" class="week-day unselected ${days[curDate.getDay()] == dayNumber ? "selected" : ''}">
            <div class="day-number">
            ${dayNumber}
            </div>
            <div class="day-name">
            ${dayName}
        </div>`
        )
    }
})()

let matches = [{
    teamOne: teams[0],
    teamTwo: teams[1],
    date: new Date(baseDay.getFullYear(), baseDay.getMonth(), baseDay.getDate() + Math.floor(Math.random() * ((7 - 1) + 1)), 16, 0)
},
{
    teamOne: teams[3],
    teamTwo: teams[2],
    date: new Date(baseDay.getFullYear(), baseDay.getMonth(), baseDay.getDate() + Math.floor(Math.random() * ((7 - 1) + 1)), 10, 0)
},

{
    teamOne: teams[4],
    teamTwo: teams[5],
    date: new Date(baseDay.getFullYear(), baseDay.getMonth(), baseDay.getDate() + Math.floor(Math.random() * ((7 - 1) + 1)), 9, 30)
},
]

//showing every match day
for (const key in matches) {
    const element = matches[key];
    WEEK_MATCHES.insertAdjacentHTML("beforeend", `<div data-day="${element.date.getDate()}" data-dayname="${days[element.date.getDay()]}" class="match">
    <div class="match-header">
        Hora: ${element.date.getHours()}:${element.date.getMinutes() == 0 ? "00" : element.date.getMinutes()}
    </div>
    <div class="match-body">
        <div class="team first-team">
            <div class="team-logo" ><img class="team-logo" src="${element.teamOne.logo}" alt="😥" class="logo"></div>
            <div class="team-name">${element.teamOne.teamName}</div>
        </div>

        <div class="versus"><span>VS</span></div>

        <div class="team second-team">
            <div  class="team-logo" ><img src="${element.teamTwo.logo}" alt="😥" class="logo"></div>
            <div class="team-name">${element.teamTwo.teamName}</div>
        </div>
    </div>
    </div>`)
}

//hiding every match day
function hideMatches(val) {
    for (let index = 0; index < matchday.length; index++) {
        const element = matchday[index];
        element.style.display = val
    }
}

//selecting matchday based om its day and weekday
function selectWeekDay(node) {
    for (let index = 0; index < weekDays.length; index++) {
        const element = weekDays[index];
        element.classList.add("unselected");
        element.classList.remove("selected");
    }

    node.classList.remove("unselected")
    node.classList.add("selected")

    hideMatches("none");

    for (let index = 0; index < matchday.length; index++) {
        const element = matchday[index];

        if (
            node.children[0].textContent.trim() == element.dataset.day.toString() &&
            node.children[1].textContent.trim() == element.dataset.dayname.toString()
        ) element.style.display = "block"
    }
}

selectWeekDay(weekDays[curDate.getDay()])
