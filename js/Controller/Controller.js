/**
 * Project 2 - Using jQuery To Consume a Web Service
 * ISTE-340-800
 * Mislav Čuljak
 */


export class Controller {
   /**
    * Constructor  that calls the model and view and calls the functions that will pull get the data from the model to the site
    * @param {Model} model 
    * @param {View} view 
    */
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.createAbout();
        this.createNews();
        this.createFaculty();
        this.createUndergraduate();
        this.createGraduate();
        this.createCoopTable();
        this.createEmploymentTable();

    }


    /** 
     * Create about calling the id of about and getting the json
    */
    createAbout(){
        let about = "#section-about";
      this.view.load(about);
      let data = this.model.getData("/about");

      data.fail((jqXHR, textStatus, error) => {
         this.view.error(about);
      }).done((json) => {
         this.view.aboutSection(json);
      });
    }

    /** 
     * Create about calling the id of news and getting the json
    */
    createNews() {

        let news = "#section-news";
        this.view.load(news);
        let newsData = this.model.getData("/news");
  
        newsData.fail((jqXHR, textStatus, error) => {
           this.view.error(timelineNews);
        }).done((json) => {
           this.view.newsSection(json);
        });
  
     }
  
     /** 
     * Create about calling the id of faculty and getting the json
    */
     createFaculty() {
  
        let factualy = "#section-faculty";
        this.view.load(factualy);
        let data = this.model.getData("/people/faculty");
  
        data.fail((jqXHR, textStatus, error) => {
           this.view.error(factualy);
        }).done((json) => {
           this.view.facultySection(json);
        });
  
     }
  
     /** 
     * Create about calling the id of undergraduate and getting the json
    */
     createUndergraduate() {
  
        let undergrade = "#section-undergraduate";
        this.view.load(undergrade);
        let data = this.model.getData("/degrees/undergraduate");
  
        data.fail((jqXHR, textStatus, error) => {
           this.view.error(undergrade);
        }).done((json) => {
           this.view.undergraduateSection(json);
        });
  
  
     }
  
     /** 
     * Create about calling the id of graduate and getting the json
    */
     createGraduate() {
  
        let graduate = "#section-graduate";
        this.view.load(graduate);
        let data = this.model.getData("/degrees/graduate");
  
        data.fail((jqXHR, textStatus, error) => {
           this.view.error(graduate);
        }).done((json) => {
           this.view.graduateSection(json);
        });
  
     }
  
     /** 
     * Create about calling the id of coopTable and getting the json
    */
     createCoopTable() {
  
        let table = "#section-coopTable";
        this.view.load(table);
        let data = this.model.getData("/employment/coopTable");
  
        data.fail((jqXHR, textStatus, error) => {
           this.view.error(table);
        }).done((json) => {
           this.view.coopTable(json);
        });
  
     }
  
     /** 
     * Create about calling the id of employmentTable and getting the json
    */
     createEmploymentTable() {
  
        let employmentTab = "#section-employmentTable";
        this.view.load(employmentTab);
        let data = this.model.getData("/employment/employmentTable");
  
        data.fail((jqXHR, textStatus, error) => {
           this.view.error(employmentTab);
        }).done((json) => {
           this.view.employmentTable(json);
        });
  
     }


}