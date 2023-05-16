/**
 * Project 2 - Using jQuery To Consume a Web Service
 * ISTE-340-800
 * Mislav Čuljak
 */

export class View {

    /** 
     * constructor of the view that calls html ids
    */
    constructor() {
        this.$newsSection = $('#section-news');
        this.$aboutSection = $('#section-about');
        this.$facultySection = $('#section-faculty');
        this.$undergraduateSection = $('#section-undergraduate');
        this.$graduateSection = $('#section-graduate');
        this.$coopTableSection = $('#section-coopTable');
        this.$employmentTableSection = $('#section-employmentTable');
    }

    /**
     * load gear
     * @param {parameter} data 
     */
    load(data) {

        let replace = `loading-${data.replaceAll('#', '')}`;

        $(data).append(`
           <div class='${replace}' style="position:absolute;>
              <img src='./assets/media/images/loading/gears.gif' alt="gear">
           </div>
        `);
    }


    /**
     * remove gear
     * @param {parameter} data 
     */
    remove(data) {
        let loadingClass = `loading-${data.replaceAll('#', '')}`;
        $(`.${loadingClass}`).remove();
    }


    /**
     * error in getting the data
     * @param {*} data 
     */
    error(data) {
        this.remove(data);
        $(data).html('');
        $(data).append(`<h1>Error.</h1>`);
    }


    /**
     * getting the new section with json and using accordian
     * @param {parameter} json 
     */
    newsSection(json) {
        this.$newsSection.html(''); //removes any previous content (like spinner)


        let $newsDiv = $('<div id="div-accordion"></div>');
        $.each(json.older, (index, value) => {
            let $newsItem = $(`<h2><b>${value.date}:</b> ${value.title}</h2><div><p>${value.description}</p></div>`);
            $newsDiv.append($newsItem);
        });
        $newsDiv.accordion({ collapsible: true, active: false, heightStyle: "content" });

        this.$newsSection.append($newsDiv);
    }

    /**
     * getting the about section from the RESTful web service
     * @param {parameter} json 
     */
    aboutSection(json) {
        this.$aboutSection.html(''); //removes any previous content (like spinner)

        $(this.$aboutSection).append(
            `
            <h1>${json.title}</h1>
            <p>${json.description}</p>
            <p id="aboutQuote"><span>"</span>${json.quote}<span>"</span></p>
            <p>${json.quoteAuthor}</p>
            `
        );
    }

    /**
     * getting the factualy section from the RESTful web service
     * @param {parameter} json 
     */
    facultySection(json) {
        this.$facultySection.html('');

        $.each(json.faculty, (index, value) => {

            value.tagline = value.tagline == null || value.tagline == "" ? "" : value.tagline;
            value.website = value.website == null || value.website == "" ? "" : value.website;
            value.phone = value.phone == null || value.phone == "" ? "" : value.phone;
            value.facebook = value.facebook == null || value.facebook == "" ? "" : value.facebook;
            value.office = value.office == null || value.office == "" ? "" : value.office;
            value.twitter = value.twitter == null || value.twitter == "" ? "" : value.twitter;

            let $facultyItem = $(`<div class="all"><h3>${value.username}:${value.name}</h3><p>${value.tagline}</p></h2><img src="${value.imagePath}"><p>${value.title}</p><p>${value.interestArea}</p>
            <p>${value.office}</p><p>${value.website}</p><p>${value.phone}</p>
            <p>${value.email}</p><p>${value.twitter}</p>
            <p>${value.facebook}</p></div>`);
            this.$facultySection.append($facultyItem);
        });

    }


    /**
     * getting the undergraduate section from the RESTful web service, as well as loading jqueary plugin tabs
     * @param {parameter} json 
     */
    undergraduateSection(json) {

        this.$undergraduateSection.html('');
        let $gradDiv = $('<div id="div-undergraduate-tabs"></div>');

        let $undergraduate = $(`<h3>Undergraduate</h3>`);
        this.$undergraduateSection.append($undergraduate);
        let $list = $("<ul></ul>");
        $gradDiv.append($list);
        $.each(json.undergraduate, (index, value) => {
            let $item = $(`<li><a href="#${value.degreeName}">${value.degreeName}</a></li>`);
            $list.append($item);
            let $tab = $(`<div id="${value.degreeName}">
            <h1>${value.title}</h1>
            <p>${value.description}</p>
            <p>Concentrations:</p>
            <p><b>${value.concentrations}</p>
            </div>`);
            $gradDiv.append($tab);
        });
        /**
         * tabs
         */
        $gradDiv.tabs({
            collapsible: true
        });
        this.$undergraduateSection.append($gradDiv);
    }

    /**
     * getting the graudate section from the RESTful web service
     * @param {parameter} json 
     */
    graduateSection(json) {
        this.$graduateSection.html('');

        let $gradDiv = $('<div id="div-undergraduate-tabs"></div>');
        let $graduate = $(`<h3>Graduate</h3>`);
        $gradDiv.append($graduate);
        $.each(json.graduate, (index, value) => {


            value.title = value.title == null || value.title == "" || value.title == "undefined" ? "/" : value.title;
            value.description = value.description == null || value.description == "" || value.description == "undefined" ? "/" : value.description;
            value.concentrations = value.concentrations == null || value.concentrations == "" || value.concentrations == "undefined" ? "/" : value.concentrations;
            value.availableCertificates = value.availableCertificates == null || value.availableCertificates == "" || value.availableCertificates == "undefined" ? "/" : value.availableCertificates;

            let $item = $(`<div id="${value.degreeName.replaceAll(" ", "")}"><h1>${value.title}</h1><p>${value.description}</p>
            <p>Concentrations:${value.concentrations}</p>
            <p>Available certificates:${value.availableCertificates}</p></div>`);
            $gradDiv.append($item);





        });

        this.$graduateSection.append($gradDiv);
    }

    /**
     * getting the coopTable from the RESTful web service + using the table plugin
     * @param {parameter} json 
     */
    coopTable(json) {
        this.$coopTableSection.html('');

        let $CoopTableDiv = $('<div id="div-accordion"></div>');

        let $coopTableTitle = $(`<h3>${json.coopTable.title}</h3>`);

        this.$coopTableSection.append($coopTableTitle);

        /**
         * 
         * table data*/
        let $coopTable = $(`
            <table id="coopTable" class="display">`
        );

        $coopTable.append(`
            <thead>
                <tr>
                    <th>Employer</th>
                    <th>Degree</th>
                    <th>City</th>
                    <th>Term</th>
                </tr>
            </thead>
        `);
        let $coopBody = $(`<tbody></tbody>`);


        $.each(json.coopTable.coopInformation, (index, item) => {

            let $coopTableBody = $(`
            <tr>
                <td>${item.employer}</td>
                <td>${item.degree}</td>
                <td>${item.city}</td>
                <td>${item.term}</td>
            </tr>`);

            $coopBody.append($coopTableBody);
        });

        $coopTable.append($coopBody);

        $CoopTableDiv.append($coopTable);

        this.$coopTableSection.append($CoopTableDiv);

        /**
         * Making it responsive */
        let table = new DataTable('#coopTable', {
            responsive: true
        });

    }

    /**
     * getting the employment table from the RESTful web service + using the table jquery plugin
     * @param {parameter} json 
     */
    employmentTable(json) {
        this.$employmentTableSection.html('');

        let $employmentDiv = $('<div id="div-accordion"></div>');

        let $employmentTitle = $(`<h3>${json.employmentTable.title}</h3>`);

        this.$employmentTableSection.append($employmentTitle)

        /**Creating a table */
        let $employmentTable = $(`
        <table id="employmentTable" class="display">`
        );

        $employmentTable.append(`
        <thead>
            <tr>
             <th>Employer</th>
             <th>Degree</th>
             <th>City</th>
             <th>Title</th>
             <th>StartDate</th>
            </tr>
        </thead>
        `);

        let $employmentBody = $(`<tbody></tbody>`);

        $.each(json.employmentTable.professionalEmploymentInformation, (index, value) => {
            let $employmentTableBody = $(`
            <tr>
                <td>${value.employer}</td>
                <td>${value.degree}</td>
                <td>${value.city}</td>
                <td>${value.title}</td>
                <td>${value.startDate}</td>
            </tr>`);

            $employmentBody.append($employmentTableBody);

        });
        $employmentTable.append($employmentBody);
        $employmentDiv.append($employmentTable);
        this.$employmentTableSection.append($employmentDiv);
        /**
         * Calling it responsive */
        let table = new DataTable('#employmentTable', {
            responsive: true
        });
    }

}
