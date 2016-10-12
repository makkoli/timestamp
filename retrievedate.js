var exports = module.exports = {};

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];

exports.getDate = function(date) {
    // Trim whitespace
    date = date.trim();
    // Regular expression tests for dates
    var naturalRE = /(Jan|January|Feb|February|Mar|March|Apr|April|May|June|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s?(\d{1,2})(\s|,\s)?(\d{4})/i;
    var unixRE = /-?\d+/;
    var dateObj = { "unix": null, "natural": null };   // date object to be returned
    
    // Test for natural timestamp
    if (naturalRE.test(date)) {
        var naturalTS = naturalRE.exec(date);
        // Use array from exec method to get the formatting right
        dateObj.natural = naturalTS[1] + ' ' + naturalTS[2] + ', ' + naturalTS[4];
        dateObj.unix = new Date(dateObj.natural).getTime() / 1000;
        return dateObj;
    }
    // Test for unix timestamp
    else if (unixRE.test(date)) {
        var unixTS = unixRE.exec(date)[0];
        dateObj.unix = unixTS;
        dateObj.natural = unixToNatural(unixTS);
        return dateObj;
    }
    // Neither date was found - return nulls
    else {
        return dateObj;
    }
};

// Convert a unix timestamp to a natural timestamp
// @unixTS: unix timestamp to be converted
function unixToNatural(unixTS) {
    var date = new Date(unixTS * 1000);
    
    return months[date.getMonth()] + ' ' + date.getDate()+ ', ' 
                + date.getFullYear();
}