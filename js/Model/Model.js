/**
 * Model is responsible of loading the data form a remote site. The jQuery's ajax()
 * method is used to send requests. 
 * 
 * The ajax() method returns the jQuery XMLHttpRequest (jqXHR) object, which 
 * is a superset of the browser's native XMLHttpRequest object. It contains, 
 * for example, responseText & responseJSON properties, as well as 
 * callback options such as jqXHR.done() & jqXHR.fail(). The ajax() method is 
 * commonly used as:
 *                      $.ajax({}).done(()=>{}).fail(()=>{});
 * 
 * Here, we implement only the fail() callback because we want to implement the 
 * done() callback in the controller. Hence, the Model.getData() returns the 
 * jqXHR object for the controller to implement the done() callback. 
 *  
 *  @see {@link https://api.jquery.com/jquery.ajax/|jQuery.ajax()} for further infomation
 */


/**
 * Project 2 - Using jQuery To Consume a Web Service
 * ISTE-340-800
 * Mislav Čuljak
 */
export class Model {

    /**
     *  Gets data and turns it into json
     * @param {parameter} endpoint 
     * @returns 
     */
    getData(endpoint) {
        let jqXHR = $.ajax({
            method: "GET",
            url: "proxy.php",
            cache: false, // default: true
            data: {path: endpoint},
            timeout: 10000, // waiting time
            dataType: "json" // the type of data that you're expecting back from the server.
        }).fail((jqXHR, textStatus, error) => {
            //TODO: Implement the code here OR in Controller, depending on your design and solution
            console.log('FAIL');
        });

        return jqXHR;
    }
}