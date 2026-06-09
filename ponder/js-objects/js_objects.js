
const aCourse = {
    name: "KungFu",
    code: "KF001",
    sections: [
        {
            sectionNum: 1,
            roomNum: "Jade Palace",
            enrolled: 5,
            days: "MTWThFSSu",
            instructor: "Master Shifu"
        },
        {
            sectionNum: 3,
            roomNum: "Spirit World",
            enrolled: 1,
            days: "MTWThFSSu",
            instructor: "Master Oogway"
        }
    ],

    enrollStudent: function(sectionNum) {
        for (section of this.sections){
            if (section.sectionNum == sectionNum){
                section.enrolled++;
                break;
            }
        }
        renderSections(this.sections);
    }
};
            

            
function sectionTemplate(section) {
    return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td></tr>`
}

function renderSections(sections) {
const html = sections.map(sectionTemplate);
document.querySelector("#sections").innerHTML = html.join("");
}

renderSections(aCourse.sections);

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
});